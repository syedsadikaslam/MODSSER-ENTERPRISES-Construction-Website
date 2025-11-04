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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Modsser Enterprises</title>
  </head>
  <body style="margin:0; padding:0; background:#f5f7fa; font-family:'Helvetica Neue', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f7fa; padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.1);">

            <!-- Header -->
            <tr>
              <td align="center" style="background:linear-gradient(90deg,#0056d8,#0a4ea0); padding:28px 20px; color:#ffffff;">
                <h1 style="margin:0; font-size:26px; font-weight:700;">Modsser Enterprises</h1>
                <p style="margin:4px 0 0; font-size:13px; opacity:0.9;">Construction • Renovation • Infrastructure</p>
              </td>
            </tr>

            <!-- Hero -->
            <tr>
              <td align="center" style="padding:30px 20px 10px;">
                <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/96/000000/construction-worker.png" width="80" height="80" alt="Construction" style="margin-bottom:10px;" />
                <h2 style="color:#0a2a51; margin:0; font-size:22px;">Let’s Build Your Vision — Reliable Construction Solutions</h2>
              </td>
            </tr>

            <!-- Main Body -->
            <tr>
              <td style="padding:20px 32px 30px;">
                <p style="font-size:15px; color:#333333; line-height:1.6; margin:0 0 16px;">
                  Hello <strong>${name}</strong>,
                </p>

                <p style="font-size:15px; color:#333333; line-height:1.6; margin-bottom:18px;">
                  Thank you for contacting <strong>Modsser Enterprises</strong>! We truly appreciate your interest in our construction and renovation services. Our dedicated team is already reviewing your inquiry, and one of our project consultants will reach out to you shortly.
                </p>

                <h3 style="color:#0a2a51; font-size:18px; margin:30px 0 10px;">🏗️ What We Offer</h3>
                <ul style="padding-left:18px; color:#333; font-size:15px; line-height:1.8; margin:0;">
                  <li>Residential construction and remodeling</li>
                  <li>Commercial and industrial infrastructure projects</li>
                  <li>Interior & exterior renovation and design</li>
                  <li>Roads, drainage, and public infrastructure development</li>
                  <li>Custom design, estimation, and material management</li>
                </ul>

                <h3 style="color:#0a2a51; font-size:18px; margin:30px 0 10px;">💡 Why Choose Modsser Enterprises?</h3>
                <p style="font-size:15px; color:#333333; line-height:1.8;">
                  We take pride in delivering high-quality, cost-effective, and time-bound construction services. Our experienced engineers, architects, and workers use the latest materials and technologies to ensure every project meets the highest standards.
                </p>
                <ul style="padding-left:18px; color:#333; font-size:15px; line-height:1.8;">
                  <li>✅ Experienced and certified professionals</li>
                  <li>✅ Transparent pricing and detailed quotations</li>
                  <li>✅ On-time project completion</li>
                  <li>✅ Full customer satisfaction guarantee</li>
                  <li>✅ Eco-friendly and sustainable construction practices</li>
                </ul>

                <h3 style="color:#0a2a51; font-size:18px; margin:30px 0 10px;">📅 Next Steps</h3>
                <p style="font-size:15px; color:#333333; line-height:1.8;">
                  Our team will contact you within 24 hours to discuss your project goals and schedule a convenient time for a detailed consultation.  
                  In the meantime, feel free to reach out to us directly using the options below.
                </p>

                <!-- CTA Buttons -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                  <tr>
                    <td align="center" style="padding-top:12px;">
                      <a href="tel:+917254087502"
                        style="display:inline-block; background:#0a4ea0; color:#ffffff; padding:12px 28px; border-radius:8px; font-size:15px; text-decoration:none; font-weight:600; box-shadow:0 3px 8px rgba(10,78,160,0.25);">
                        📞 Call Us Now
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-top:10px;">
                      <a href="mailto:mdsadiktenth464@gmail.com"
                        style="display:inline-block; background:#e8f0fe; color:#0a4ea0; padding:10px 26px; border-radius:8px; font-size:15px; text-decoration:none; font-weight:600;">
                        ✉️ Send an Email
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Divider -->
                <hr style="border:none; border-top:1px solid #e0e0e0; margin:40px 0;">

                <!-- About Company -->
                <h3 style="color:#0a2a51; font-size:18px; margin-bottom:10px;">🏢 About Modsser Enterprises</h3>
                <p style="font-size:15px; color:#333333; line-height:1.8;">
                  Modsser Enterprises is one of the most trusted names in construction and infrastructure development.  
                  We handle projects of all scales — from small residential units to large industrial complexes — delivering quality, trust, and long-term value.  
                  Our motto: <em>“Build strong, build beautiful, build with confidence.”</em>
                </p>

                <!-- Footer -->
                <p style="margin-top:32px; font-size:12px; color:#666666; text-align:center; line-height:1.5;">
                  You’re receiving this email from <strong>Modsser Enterprises</strong>.<br>
                  Visit us at <a href="https://www.modsserenterprises.in/" style="color:#0a4ea0; text-decoration:none;">modsserenterprises.in</a><br>
                  Call: <a href="tel:+917254087502" style="color:#0a4ea0; text-decoration:none;">+91 72540 87502</a><br>
                  Email: <a href="mailto:mdsadiktenth464@gmail.com" style="color:#0a4ea0; text-decoration:none;">mdsadiktenth464@gmail.com</a>
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
    apiKey.apiKey = process.env.BREVO_API_KEY;

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
    res.status(200).json({ message: '✉️ Thank you for contacting Modasser Enterprises! Your inquiry has been received successfully — our team will respond shortly.' });

  } catch (error) {
    console.error('❌ Error sending email:', error.response?.text || error.message);
    res.status(500).json({ message: 'Failed to save or send email.' });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
