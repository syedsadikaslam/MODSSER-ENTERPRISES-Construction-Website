require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes.js'); // ✅ Router import

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mdsadiksadik464_db_user:2LsFzlYVFM3EdrNq@cluster0.sdat6m9.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0";

// ✅ Middleware
app.use(cors({
  origin: ['https://www.modsserenterprises.in'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
})); 
app.use(express.json());

// ✅ Database Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('✅ Backend + Email system running successfully!');
});

// ✅ Routes
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


