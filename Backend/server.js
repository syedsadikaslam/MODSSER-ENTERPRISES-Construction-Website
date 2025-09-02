require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mdsadiksadik464_db_user:2LsFzlYVFM3EdrNq@cluster0.sdat6m9.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0";

// ✅ Middleware
app.use(cors({
  origin: ['https://www.modsserenterprises.in/'], // Your Vercel frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ✅ Define Schema & Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// ✅ Health Check Route
app.get('/', (req, res) => {
  res.send('✅ Backend is running successfully!');
});

// ✅ Save Contact Route
app.post('/save', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('❌ Error saving data:', error);
    res.status(500).json({ message: 'Failed to save.' });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
