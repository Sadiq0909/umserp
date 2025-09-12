import Link from "next/link";

export default function Features() {
  const features = [
    {
      title: "🎓 Admissions",
      link : "/admission",
      desc: "Streamline the student intake process with digital applications and records.",
    },
    {
      title: "💰 Fees",
      link:"/fee" ,
      desc: "Automate fee collection, generate receipts, and track pending payments.",
    },
    {
      title: "🏠 Hostel",
      link:"/hostel" ,
      desc: "Manage hostel allocations, room assignments, and availability in real-time.",
    },
    {
      title: "📊 Examinations",
      link:"exam" , 
      desc: "Record exam results, publish reports, and analyze student performance.",
    }
  ];

  return (
    <section className="py-24 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-5xl sm:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-zinc-300 to-zinc-900 dark:from-zinc-600 dark:to-white">
          Core Features
        </h2>
        <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Our ERP-lite system brings everything into one place — making
          university management efficient, transparent, and student-friendly.
        </p>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {features.map((f, i) => (
            <Link href={f.link}       key={i}>
            <div

      className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
    >
      <h3 className="text-2xl font-bold text-zinc-800 dark:text-white">
        {f.title}
      </h3>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
        {f.desc}
      </p>
    </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
