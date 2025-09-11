export default function About() {
  return (
    <section className="py-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 pt-40  md:pt-55 lg:pt-60 ">
      

      {/* Right: Text */}
      <div>
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-zinc-300 to-zinc-900 dark:from-zinc-600 dark:to-white py-2">
          About ERP System
        </h2>
        <p className="mt-8 text-xl sm:text-2xl text-zinc-400 leading-relaxed">
          The University Management System is designed to solve the
          daily challenges faced by institutions. From admissions to fee
          collection, hostel allocation, and examinations — all processes are
          unified in a single, low-cost, and scalable solution.
        </p>
      </div>

      {/* Left: Image */}
      <div className="flex justify-center">
        <img
          src="/about.svg" 
          alt="About University Management System"
          className="rounded-2xl shadow-lg w-full max-w-md"
        />
      </div>
    </section>
  );
}
