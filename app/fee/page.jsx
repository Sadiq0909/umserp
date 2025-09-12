"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function FeeStructure() {
  const feeData = [
    {
      department: "Computer Science",
      tuition: "₹80,000",
      exam: "₹5,000",
      total: "₹1,25,000",
    },
    {
      department: "Electrical Engineering",
      tuition: "₹75,000",
      exam: "₹5,000",
      total: "₹1,15,000",
    },
    {
      department: "Mechanical Engineering",
      tuition: "₹78,000",
      exam: "₹5,000",
      total: "₹1,21,000",
    },
    {
      department: "Civil Engineering",
      tuition: "₹70,000",
      exam: "₹5,000",
      total: "₹1,10,000",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-300 to-zinc-900 dark:from-zinc-500 dark:to-white">
          Fee Structure
        </h2>
        <p className="text-center text-lg text-zinc-600 dark:text-zinc-400 mb-12">
          Department-wise breakdown of tuition, hostel, and exam fees.
        </p>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-100 dark:bg-zinc-800/60">
                <TableHead className="px-6 py-4 text-lg font-semibold">
                  Department
                </TableHead>
                <TableHead className="px-6 py-4 text-lg font-semibold">
                  Tuition
                </TableHead>
                <TableHead className="px-6 py-4 text-lg font-semibold">
                  Hostel
                </TableHead>
                <TableHead className="px-6 py-4 text-lg font-semibold">
                  Exam
                </TableHead>
                <TableHead className="px-6 py-4 text-right text-lg font-semibold">
                  Total
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeData.map((fee, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition"
                >
                  <TableCell className="px-6 py-4 font-medium text-base">
                    {fee.department}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-base">
                    {fee.tuition}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-base">
                    ₹25,000
                  </TableCell>
                  <TableCell className="px-6 py-4 text-base">
                    {fee.exam}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right font-bold text-xl text-black dark:text-white">
                    {fee.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <p className="text-center text-lg text-zinc-600 dark:text-zinc-400 my-12">
          Updated for Academic Year 2025
        </p>
      </div>
    </section>
  );
}

