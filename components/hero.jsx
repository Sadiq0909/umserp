// frontend/src/components/Hero.jsx
"use client";
import Link from "next/link";
import { SparklesText } from "./magicui/sparkles-text";
import { TypingAnimation } from "./magicui/typing-animation";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="relative pt-20 lg:pt-30 sm:pt-25">
      <div className="max-w-7xl mx-auto text-center px-6 space-y-8">
        <SparklesText className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 bg-clip-text ">
  ERP-based Student Management System
</SparklesText>



        <TypingAnimation className="text-md font-medium sm:text-xl mb-8 text-gray-600 dark:text-gray-300" duration={"30"} startOnView={true}>
          A lightweight, secure, and affordable platform for managing admissions,
          fees, hostel allocations, and exams — all in one place.
        </TypingAnimation>

        <div className="flex gap-4 flex-wrap justify-center">
          <Button variant={"outline"} className="bg-white dark:bg-black hover:bg-gray-200 transition border-2">
            Get Started
          </Button>
          <Button >
            Learn More
          </Button>
        </div>

        <p className="text-sm text-zinc-500">
          Designed for institutions. Powered by simplicity. Trusted by everyone.
        </p>
      </div>
    </section>
  );
}
