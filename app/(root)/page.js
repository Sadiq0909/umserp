import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/About";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
export default function Home() {
  return (
    <div>
      <div
              className={cn(
  "absolute inset-0 border-b",
  "[background-size:60px_60px]",
  "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_2px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
  "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_2px)]",
  "h-[560px] sm:h-[500px] md:h-[600px] "
)}
>
            </div>
            <Hero/>
            {/* <div className="pt-40">Hiii</div> */}
            <About/>
            <Features/>
            <FAQ/>
    </div>
  );
}
