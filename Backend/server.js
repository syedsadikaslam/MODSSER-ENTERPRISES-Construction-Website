require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Middleware Setup
app.use(cors({
  origin: ['https://www.modsserenterprises.in'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(MONGO_URI)
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

// ✅ Nodemailer Transporter (Configured for Brevo)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // use TLS for port 587
  auth: {
    user: process.env.SMTP_USER,      // Brevo login (example: 9aa53e001@smtp-brevo.com)
    pass: process.env.SMTP_PASSWORD,  // Brevo SMTP key
  },
});

// ✅ Verify SMTP Connection
transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ SMTP Connection Error:', error);
  } else {
    console.log('✅ SMTP Server is ready to send emails');
  }
});

// ✅ Health Route
app.get('/', (req, res) => {
  res.send('✅ Backend + MongoDB + Brevo Email Working Fine!');
});

// ✅ Contact Form Route
app.post('/save', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 💾 Save to DB
    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();

    // 📧 HTML Email Template
    const htmlTemplate = `
      <html>
        <body style="font-family: Arial, sans-serif; background-color:#f4f6f8; margin:0; padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;">
            <tr>
              <td align="center" style="padding:20px;">
                <table width="600" style="background:#ffffff; border-radius:8px;">
                  <tr>
                    <td style="padding:18px 24px; background:linear-gradient(90deg,#1f7bd8,#0a4ea0); color:#fff;">
                      <h2 style="margin:0;">Modsser Enterprises</h2>
                      <p style="margin:0; font-size:12px;">Construction | Renovation | Infrastructure</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px;">
                      <h3 style="color:#0a2a51;">Let’s build your vision — reliable construction solutions</h3>
                      <p>Hello <strong>${name}</strong>,</p>
                      <p>
                        Thank you for contacting Modsser Enterprises! We provide end-to-end construction services — 
                        residential, commercial, industrial, and specialized renovations. 
                        Our team will get back to you shortly.
                      </p>
                      <a href="mailto:mdsadiksadik464@gmail.com" 
                         style="display:inline-block; padding:10px 18px; background:#0a4ea0; color:#fff; border-radius:6px; text-decoration:none;">
                        Schedule a call
                      </a>
                      <p style="margin-top:24px; font-size:12px; color:#555;">
                        You are receiving this email from Modsser Enterprises.<br/>
                        Website: <a href="https://www.modsserenterprises.in/" style="color:#0a4ea0;">modsserenterprises.in</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // 📤 Send Email
    await transporter.sendMail({
      from: `"Modsser Enterprises" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Thank you for contacting Modsser Enterprises',
      html: htmlTemplate,
    });

    console.log(`📨 Email sent to ${email}`);
    res.status(200).json({ message: 'Form submitted successfully & email sent!' });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Failed to save or send email.' });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
