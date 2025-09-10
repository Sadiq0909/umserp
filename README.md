# 🎓 University Management System (ERP-lite)

An **ERP-based Integrated Student Management System** for colleges/universities.  
This project provides a **low-cost, scalable solution** for managing admissions, fees, hostel allocations, and exams using **Node.js, Express, MongoDB, and Next.js**.  

---

## 📌 Problem Statement

Many institutions maintain admissions, fee collection, hostel, and examination records in separate ledgers. This causes:
- Students standing in multiple queues 🏢
- Staff re-entering identical data ✍️
- No real-time overview for administrators 📊

**Goal**: Build a unified, lightweight ERP system that:
- Streamlines **admission intake**
- Automates **fee receipts**
- Tracks **hostel allocation**
- Records **exam results**
- Provides **real-time dashboards**

---

## 🏗️ Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

**Frontend**
- Next.js (React Framework)
- Tailwind CSS (UI)
- Axios (API Calls)

---

## 📂 Project Structure

```bash
umserp/
│── .next/                  # Next.js build output
│── node_modules/           # Dependencies
│── public/                 # Static assets
│── src/
│   ├── app/                # App Router (frontend + API routes)
│   │   ├── api/            # API routes
│   │   │   └── auth/
│   │   │       └── route.js
│   │   ├── dashboard/
│   │   │   └── page.jsx    # Protected page
│   │   └── page.jsx        # Home page with Login/Register form
│   │
│   ├── controllers/        # API Controllers
│   │
│   ├── models/             # Database models
│   │
│   ├── database/           # Database connection
│   │   └── connect.js
│   │
│   ├── utils/              # Utility functions
│   ├── components/         # Reusable UI components
│   └── providers/          # Context providers
│
│── jsconfig.json           # Path aliases
│── tailwind.config.js      # Tailwind config
│── postcss.config.js
│── next.config.js          # Next.js config
│── package.json
│── README.md


```

## ⚡ Getting Started

### 1️⃣ Install dependencies
```bash
npm install

---

```
## Database model
<img src="/docs/dataModelDiagram.png" alt="Logo" height="1000"/>
