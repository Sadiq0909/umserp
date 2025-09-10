import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <div>
      <Header/>
      <div
              className={cn(
                "absolute inset-0",
                "[background-size:60px_60px]",
                "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_2px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_2px)]",
              )}
            />
            <Hero/>
    </div>
  );
}
