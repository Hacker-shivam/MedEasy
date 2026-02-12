🩺 MedEasy – Smart Healthcare Platform

MedEasy is a full-stack healthcare web application that simplifies medical service booking, doctor discovery, and secure online payments. It provides a modern, scalable solution for patients, doctors, and admins using industry-grade tools and APIs.

🚀 Key Features
👤 Authentication & Authorization

Secure authentication using Clerk

Role-based access (Patient / Doctor / Admin)

Protected routes on both frontend & backend

🩻 Healthcare Services

Browse medical services & doctors

Book appointments online

View appointment history & status

Cancel or reschedule appointments

💳 Payments

Secure online payments using Stripe

Payment confirmation & appointment linking

Webhook-ready architecture

🖼 Media Management

Image uploads via Cloudinary

Doctor profiles & service images

Optimized image delivery

🛠 Admin Controls

Add / manage services

Manage doctors & appointments

View platform analytics (optional)

🧰 Tech Stack
Frontend

React.js

React Router DOM

Axios

Tailwind CSS

Clerk React SDK

Backend

Node.js

Express.js

MongoDB & Mongoose

Clerk Express Middleware

Stripe SDK

Cloudinary SDK

🔐 Authentication Flow (Clerk)

Frontend authentication handled by Clerk

JWT tokens passed via Authorization headers

Backend verifies users using Clerk middleware

Seamless session handling without manual JWT logic

📁 Project Structure
MedEasy/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── App.jsx
│   └── package.json
│
├── .gitignore
└── README.md

⚙️ Environment Variables
Backend (backend/.env)
PORT=4000
MONGO_URI=your_mongodb_uri

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

CLERK_SECRET_KEY=your_clerk_secret
CLERK_PUBLISHABLE_KEY=your_clerk_publishable

Frontend (frontend/.env)
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:4000

🛠 Installation & Setup
Clone the repository
git clone https://github.com/Hacker-shivam/MedEasy.git
cd MedEasy

Backend Setup
cd backend
npm install
npm run dev


Server runs on:

http://localhost:4000

Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

💳 Stripe Payment Flow

User books an appointment

Stripe Checkout session is created

User completes payment

Backend confirms payment

Appointment status updates to Confirmed

🖼 Cloudinary Usage

Service images

Doctor profile photos

Automatic image optimization

Secure public IDs stored in DB

🔮 Future Enhancements

📹 Video consultation

📊 Advanced admin analytics

🔔 Email & SMS notifications

🤖 AI-based doctor recommendations

📱 Mobile-first PWA support

👨‍💻 Author

Shivam (Hacker-shivam)
📌 Full-Stack Developer | MERN | APIs | Cloud
🔗 GitHub: https://github.com/Hacker-shivam
