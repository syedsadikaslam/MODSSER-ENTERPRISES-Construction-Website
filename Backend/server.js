require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const brevo = require('@getbrevo/brevo'); // ✅ Official Brevo SDK

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Middleware
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

// ✅ Health Route
app.get('/', (req, res) => {
  res.send('✅ Backend + MongoDB + Brevo API Working Fine!');
});

// ✅ Contact Form Route
app.post('/save', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 💾 Save to MongoDB
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
                      <a href="mailto:mdsadiktenth464@gmail.com" 
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

    // ✅ Configure Brevo API
    const apiInstance = new brevo.TransactionalEmailsApi();
    const apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY; // ✅ Correct key setup

    // ✅ Create email object
    const sendSmtpEmail = {
      to: [{ email: email, name: name }],
      sender: { name: "Modsser Enterprises", email: process.env.FROM_EMAIL },
      subject: "Thank you for contacting Modsser Enterprises",
      htmlContent: htmlTemplate,
    };

    // ✅ Send Email via Brevo API
    await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log(`📨 Email sent successfully to ${email}`);
    res.status(200).json({ message: 'Form submitted successfully & email sent!' });

  } catch (error) {
    console.error('❌ Error sending email:', error.response?.text || error.message);
    res.status(500).json({ message: 'Failed to save or send email.' });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
