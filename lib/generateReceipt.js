import puppeteer from "puppeteer";

export async function generateReceipt(student, payment) {
  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Receipt</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

    body {
      font-family: 'Inter', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
    }

    .receipt-container {
      max-width: 650px;
      margin: 50px auto;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .receipt-header {
      background: linear-gradient(90deg, #3b82f6, #6366f1);
      color: white;
      text-align: center;
      padding: 30px 20px;
      font-size: 1.8rem;
      font-weight: 700;
    }

    .receipt-content {
      padding: 30px 40px;
    }

    .info p {
      font-size: 16px;
      line-height: 1.6;
      margin: 10px 0;
    }

    .info .label {
      font-weight: 600;
      color: #3b82f6;
    }

    .amount {
      font-size: 18px;
      font-weight: 700;
      color: #16a34a;
      text-align: right;
      margin-top: 25px;
    }

    .footer {
      text-align: center;
      font-size: 13px;
      color: #6b7280;
      margin-top: 35px;
      padding-bottom: 20px;
    }

    /* Optional: subtle dividing line */
    .divider {
      height: 1px;
      background: #e5e7eb;
      margin: 20px 0;
      border: none;
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="receipt-header">
      University Admission Receipt
    </div>
    <div class="receipt-content">
      <div class="info">
        <p><span class="label">Name:</span> ${student.First_Name} ${student.Last_Name}</p>
        <p><span class="label">Email:</span> ${student.Email}</p>
        <p><span class="label">Phone:</span> ${student.Phone}</p>
        <p><span class="label">Department:</span> ${student.Department}</p>
        <p><span class="label">Admission Date:</span> ${student.Admission_Date}</p>
        <p><span class="label">Payment ID:</span> ${payment.razorpay_payment_id}</p>
        <p><span class="label">Order ID:</span> ${payment.razorpay_order_id}</p>
      </div>
      <hr class="divider" />
      <div class="amount">
        Amount Paid: ₹${payment.amount / 100}
      </div>
      <div class="footer">
        This is a computer-generated receipt and does not require a signature.
      </div>
    </div>
  </div>
</body>
</html>

  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
  });

  await browser.close();
  return pdfBuffer;
}
