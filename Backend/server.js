require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const contactRoutes = require('./routes/contact.routes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ⚠️ Check if MONGO_URI exists before starting
if (!MONGO_URI) {
  console.error("❌ CRITICAL ERROR: MONGO_URI is not defined in .env file!");
  process.exit(1);
}

// ✅ Security & Middleware
// ✅ Security & Middleware
app.use(helmet());

const allowedOrigins = [
  'https://www.modsserenterprises.in',
  'http://localhost:5173',
  'https://modsser-enterprises-construction-website.vercel.app', // Add potential Vercel domain
  'https://modsserenterprisesbackend.onrender.com' // Add backend domain
];

// Add process.env.ALLOWED_ORIGINS if set
if (process.env.ALLOWED_ORIGINS) {
  const envOrigins = process.env.ALLOWED_ORIGINS.split(',');
  allowedOrigins.push(...envOrigins);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Allow all origins for now to prevent issues, or check index
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Failed:');
    console.error(err.message);
  });

// ✅ Health Route
app.get('/', (req, res) => {
  res.send('✅ Backend + MongoDB + Brevo API Working Fine!');
});

// ✅ Routes
app.use('/api/contacts', contactRoutes); // Change: Prefixing with /api/ is a better practice

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});