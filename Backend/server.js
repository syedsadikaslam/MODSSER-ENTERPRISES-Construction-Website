require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://mdsadiksadik464_db_user:2LsFzlYVFM3EdrNq@cluster0.sdat6m9.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0";


// ✅ Middleware
app.use(cors({
  origin: ['https://www.modsserenterprises.in'], // Your frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

// ✅ Schema & Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// ✅ Nodemailer Transporter (Gmail)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST  ,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('✅ Backend + MongoDB + Email working!');
});

// ✅ Contact Form Route
app.post('/save', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();

    // Email content
    const mailOptions = {
      from: `"Modsser Enterprises" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: `Let's Build Together — ${subject}`,
      html: `
       <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(90deg,#1f7bd8,#0a4ea0); color: white; padding: 16px 24px;">
      <h2 style="margin: 0;">Modsser Enterprises</h2>
      <p style="margin: 0; font-size: 12px;">Construction | Renovation | Infrastructure</p>
    </div>

    <!-- Body -->
    <div style="padding: 24px;">
      <p>Hello <strong>${name}</strong>,</p>

      <p>Thank you for reaching out to <strong>Modsser Enterprises</strong>. We’ve received your inquiry and appreciate your interest in our services.</p>

      <p><b>Subject:</b> ${subject}</p>
      <p><b>Message:</b> ${message}</p>

      <p style="margin-top: 16px;">
        Modsser Enterprises provides end-to-end construction services — residential, commercial, industrial, and specialized renovations.
        We deliver projects with experience, quality, and reliability.
      </p>

      <p style="margin-top: 16px;">We’ll get back to you soon. For urgent assistance, you can contact us directly:</p>

      <a href="tel:7254087502"
         style="display:inline-block; margin-top:8px; padding:10px 18px; background:#0a4ea0; color:#fff; border-radius:6px; text-decoration:none; font-weight:bold;">
         📞 Schedule a Call
      </a>

      <br/><br/>
      <p>Best Regards,<br/><strong>Modsser Enterprises Team</strong></p>

      <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;" />

      <p style="font-size: 12px; color: #666;">
        Website: 
        <a href="https://www.modsserenterprises.in/" style="color:#0a4ea0; text-decoration:none;">
          modsserenterprises.in
        </a>
      </p>
    </div>
  </div>
</div>

      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`📨 Email sent to ${email}`);

    res.status(200).json({ message: 'Form submitted successfully & email sent!' });
  } catch (error) {
    console.error('❌ Detailed Error:', error);
    res.status(500).json({ message: error.message || 'Failed to save or send email.' });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
