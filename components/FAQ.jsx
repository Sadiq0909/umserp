"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      q: "Is this system free to use?",
      a: "Yes, ERP-lite is an open-source project. Institutions can use and customize it without licensing costs.",
    },
    {
      q: "Can it scale for large universities?",
      a: "Absolutely. It is built on Node.js and MongoDB, designed to scale with thousands of students and staff.",
    },
    {
      q: "Is student data secure?",
      a: "Yes. The system uses JWT authentication, bcrypt password hashing, and secure database practices.",
    },
    {
      q: "Does it support mobile devices?",
      a: "Yes. The frontend is built with Next.js and Tailwind CSS, making it fully responsive across devices.",
    },
  ];

  return (
    <section className="py-24 ">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-zinc-300 to-zinc-900 dark:from-zinc-600 dark:to-white">
          Frequently Asked Questions
        </h2>
        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 text-center">
          Got questions? We’ve got answers.
        </p>

        <div className="mt-12 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <Accordion type="single" collapsible className="divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="flex justify-between items-center px-6 py-5 text-lg font-semibold text-gray-800 dark:text-white">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-0 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
