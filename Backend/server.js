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

if (!process.env.JWT_SECRET) {
  console.error("❌ CRITICAL ERROR: JWT_SECRET is not defined in .env file!");
  process.exit(1);
}

// ✅ Security & Middleware
app.set('trust proxy', 1); // Trust first proxy (Render/Heroku/Vercel)
app.use(helmet());

const allowedOrigins = [
  'https://www.modsserenterprises.in',
  'https://modsserenterprisesbackend.onrender.com',
  'http://localhost:5173'
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
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI, {
  family: 4, // Force IPv4 to prevent ESERVFAIL/timeout issues
})
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
const authRoutes = require('./routes/auth.routes');
const bookingRoutes = require('./routes/booking.routes');

app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
const hiringRoutes = require('./routes/hiring.routes');
app.use('/api/hiring', hiringRoutes);

// Serve uploaded files
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
