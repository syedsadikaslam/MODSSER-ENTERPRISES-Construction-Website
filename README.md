# MODSSER ENTERPRISES - Construction Website

A modern and comprehensive construction business website featuring a React-based frontend and a Node.js/Express backend.

## 🚀 Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop.
- **Project Showcase**: Detailed gallery of construction projects.
- **Admin Dashboard**: Secure management of inquiries and content.
- **SEO Optimized**: Built-in SEO components and sitemap generation.
- **Google OAuth**: Secure login for administrators.
- **Dark Mode**: Premium dark theme across the application.
- **Smooth Animations**: Powered by Framer Motion.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **State/Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: Lucide-React, React Icons
- **Auth**: @react-oauth/google

### Backend
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT, Google Auth Library
- **Security**: Helmet, Express Rate Limit, BcryptJS
- **Email Service**: Brevo (Sendinblue) via Nodemailer

## 📁 Project Structure

```text
MODSSER-ENTERPRISES-Construction-Website/
├── Backend/          # Node.js + Express API
│   ├── controllers/  # Request handlers
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API endpoints
│   └── server.js     # Entry point
└── Frontend/         # React + Vite Application
    ├── public/       # Static assets
    ├── src/          # Source code
    │   ├── components/
    │   └── pages/
    └── vite.config.js
```

## ⚙️ Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure your environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `BREVO_API_KEY`
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📜 Available Scripts

### Frontend
- `npm run dev`: Starts Vite dev server.
- `npm run build`: Builds for production.
- `npm run sitemap`: Generates `sitemap.xml`.

### Backend
- `npm start`: Starts production server.
- `npm run dev`: Starts server with Nodemon.

## 📄 License
ISC
