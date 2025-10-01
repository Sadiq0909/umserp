import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
    try {
        const { profession } = await req.json();
        if (!profession) {
            return NextResponse.json({ error: "Profession is required" }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // ✅ try pro, fallback to flash
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

 const prompt = `
Generate a JSON response for the profession: ${profession} in the **exact format below**. Make it detailed, structured, and ready to directly feed into the ProfessionPage component:

{
  "professionTitle": "<PROFESSION_TITLE>",
  "aboutProfession": {
    "description": "A clear and engaging overview of this profession.",
    "responsibilities": [
      "List 5-7 key responsibilities in bullet points."
    ],
    "careerPath": [
      { "level": "Entry/Junior Role", "description": "Brief explanation of the role and responsibilities." },
      { "level": "Mid-level Role", "description": "Brief explanation of the role and responsibilities." },
      { "level": "Senior Role", "description": "Brief explanation of the role and responsibilities." },
      { "level": "Lead/Manager/Principal", "description": "Brief explanation of the role and responsibilities." }
    ],
    "industryDemand": "Explain current demand, relevance, and future trends for this profession."
  },
  "roadmap": [
    {
      "phase": "Phase 1: Foundations",
      "duration": "X months",
      "goal": "Main learning outcome",
      "milestones": [
        { "title": "Topic 1", "details": ["Detailed bullet points for topic 1"] },
        { "title": "Topic 2", "details": ["Detailed bullet points for topic 2"] }
      ]
    },
    {
      "phase": "Phase 2: Core Skills",
      "duration": "X months",
      "goal": "Main learning outcome",
      "milestones": [
        { "title": "Topic 1", "details": ["Detailed bullet points for topic 1"] }
      ]
    }
    // Add additional phases as needed
  ],
  "weeklyPlan": {
    "title": "Sample 12-Week Kickstart Schedule",
    "description": "Briefly explain the purpose of this 12-week plan.",
    "schedule": [
      "Week 1: Topic & brief details",
      "Week 2: Topic & brief details",
      "Week 3: Topic & brief details"
      // Continue for all 12 weeks
    ]
  },
  "technologies": ["List key technologies used in this profession"],
  "tools": ["List key tools used in this profession"],
  "learningResources": {
    "onlineCourses": { "Platform": "List top relevant courses" },
    "books": { "Category/Topic": "List recommended books" },
    "blogsAndCommunities": { "Type": "Links or popular blogs/communities" },
    "datasetsAndProjects": { "Type": "Relevant datasets/projects for practice" }
  },
  "closingStatement": "A motivational and encouraging note for learners pursuing this profession."
}
Please **always output valid JSON only**.
`;


        const result = await model.generateContent(prompt);

        const rawText = result.response.text();

        // Remove ```json or ``` fences
        const cleanedText = rawText
            .replace(/^```json\s*/i, "")
            .replace(/^```\s*/i, "")
            .replace(/```$/, "");
        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch (e) {
            return NextResponse.json({ error: "Failed to parse JSON", raw: text }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error generating profession:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
