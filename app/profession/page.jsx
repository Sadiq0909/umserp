"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProfessionPage() {
  const [profession, setProfession] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const professions = [
    "Data Scientist",
    "Software Engineer",
    "UI/UX Designer",
    "Cybersecurity Analyst",
    "Cloud Engineer",
    "AI/ML Engineer",
    "Blockchain Developer",
    "Mobile App Developer",
    "Full Stack Developer",
    "Game Developer",
    "Product Manager",
    "Business Analyst",
    "DevOps Engineer",
    "Systems Architect",
    "Database Administrator",
    "Network Engineer",
    "Digital Marketing Specialist",
    "SEO Specialist",
    "Content Strategist",
    "Financial Analyst",
    "Mechanical Engineer",
    "Civil Engineer",
    "Electrical Engineer",
    "Biotech Researcher",
  ];


  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/generateProfession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profession }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  const SkeletonLoader = () => (
    <div className="flex flex-col gap-8">
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg p-6">
        <CardHeader>
          <Skeleton className="h-10 w-3/4 mx-auto" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-4/6" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border border-gray-200 dark:border-gray-700 shadow-sm p-6">
            <CardHeader>
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="p-6">
            <CardHeader>
              <Skeleton className="h-6 w-1/3" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <CardHeader>
          <Skeleton className="h-7 w-2/5" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Profession Roadmap Generator
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-8 justify-center">
        <Select onValueChange={setProfession}>
          <SelectTrigger className="w-full sm:w-[300px]">
            <SelectValue placeholder="Select a profession" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto">
            {professions.map((p, i) => (
              <SelectItem key={i} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>

        </Select>

        <Button
          onClick={handleGenerate}
          disabled={loading || !profession}
          className="w-full sm:w-auto"
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>

      {loading && <SkeletonLoader />}
      {!loading && result && (
        <div className="flex flex-col gap-8">
          {/* Profession Overview */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition p-6">
            <CardHeader>
              <CardTitle className="text-5xl font-extrabold mb-4 text-center">
                {result.professionTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg">{result.aboutProfession.description}</p>

              <div>
                <h3 className="font-semibold text-2xl mb-3">Responsibilities</h3>
                <ul className="list-disc list-inside space-y-1">
                  {result.aboutProfession.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-2xl mb-4">Career Paths</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {result.aboutProfession.careerPath.map((role, i) => (
                    <Card
                      key={i}
                      className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition p-4"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg font-bold">
                          {role.level}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{role.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm p-4 mt-6">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    Industry Demand
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{result.aboutProfession.industryDemand}</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.roadmap.map((phase, i) => (
              <Card
                key={i}
                className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {phase.phase}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 font-medium text-gray-700 dark:text-gray-300">
                    Goal: {phase.goal}
                  </p>

                  <Accordion type="single" collapsible className="mb-2">
                    {phase.milestones.map((m, j) => (
                      <AccordionItem key={j} value={`milestone-${i}-${j}`}>
                        <AccordionTrigger>{m.title}</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside space-y-1 mt-2">
                            {m.details.map((d, k) => (
                              <li key={k}>{d}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                    Duration: {phase.duration}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technologies & Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm p-4 hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {result.technologies.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-gray-700 shadow-sm p-4 hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1">
                  {result.tools.map((tool, i) => (
                    <li key={i}>{tool}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-3xl font-bold">Learning Resources</p>
          {/* Learning Resources */}
          <Accordion type="multiple" className="space-y-2">
            {result.learningResources.onlineCourses && (
              <AccordionItem value="onlineCourses">
                <AccordionTrigger>Online Courses</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1">
                    {Object.entries(result.learningResources.onlineCourses).map(
                      ([platform, courses], i) => (
                        <li key={i}>
                          <span className="font-medium">{platform}:</span>{" "}
                          {courses}
                        </li>
                      )
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {result.learningResources.books && (
              <AccordionItem value="books">
                <AccordionTrigger>Books</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1">
                    {Object.entries(result.learningResources.books).map(
                      ([category, books], i) => (
                        <li key={i}>
                          <span className="font-medium">{category}:</span>{" "}
                          {books}
                        </li>
                      )
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {result.learningResources.blogsAndCommunities && (
              <AccordionItem value="blogsAndCommunities">
                <AccordionTrigger>Blogs & Communities</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1">
                    {Object.entries(result.learningResources.blogsAndCommunities).map(
                      ([type, items], i) => (
                        <li key={i}>
                          <span className="font-medium">{type}:</span> {items}
                        </li>
                      )
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {result.learningResources.datasetsAndProjects && (
              <AccordionItem value="datasetsAndProjects">
                <AccordionTrigger>Datasets & Projects</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1">
                    {Object.entries(
                      result.learningResources.datasetsAndProjects
                    ).map(([type, items], i) => (
                      <li key={i}>
                        <span className="font-medium">{type}:</span> {items}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          {/* Weekly Plan */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm p-4 hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                Week by Week Action Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{result.weeklyPlan.description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {result.weeklyPlan.schedule.map((weekStr, i) => (
                  <Card
                    key={i}
                    className="shadow-sm hover:shadow-md transition p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">
                        <span className="font-semibold">
                          {weekStr.split(":")[0]}:
                        </span>{" "}
                        {weekStr.split(":")[1]}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {result.closingStatement && (
            <p className="text-center text-lg mt-6">
              {result.closingStatement}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
