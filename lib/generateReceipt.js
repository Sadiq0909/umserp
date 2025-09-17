import PDFDocument from "pdfkit/js/pdfkit.standalone.js"


export async function generateReceipt(student, payment) {
  // fetch the font as a buffer from public folder
  const fontRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/fonts/OpenSans-Regular.ttf`);
  const fontArrayBuffer = await fontRes.arrayBuffer();
  const fontBuffer = Buffer.from(fontArrayBuffer);

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, autoFirstPage: false });
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      doc.addPage();
      doc.font(fontBuffer); // <-- embed font from buffer

      doc.fontSize(20).text("University Admission Receipt", { align: "center" });
      doc.moveDown();
      doc.fontSize(12).text(`Name: ${student.First_Name} ${student.Last_Name}`);
      doc.text(`Department: ${student.Department}`);
      doc.text(`Admission Date: ${student.Admission_Date}`);
      doc.text(`Payment ID: ${payment.razorpay_payment_id}`);
      doc.text(`Order ID: ${payment.razorpay_order_id}`);
      doc.text(`Amount Paid: ₹${payment.amount / 100}`);

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
