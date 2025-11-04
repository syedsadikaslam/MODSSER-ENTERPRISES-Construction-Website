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
  <body style="font-family: Arial, sans-serif; background-color:#f5f7fa; margin:0; padding:0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f7fa;">
      <tr>
        <td align="center" style="padding:16px;">
          <table width="520" style="background:#ffffff; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="padding:12px 18px; background:linear-gradient(90deg,#0a4ea0,#1f7bd8); color:#fff; border-radius:6px 6px 0 0;">
                <h2 style="margin:0; font-size:16px;">Modsser Enterprises</h2>
                <p style="margin:0; font-size:10px;">Construction | Renovation | Infrastructure</p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:18px; font-size:12px; color:#333; line-height:1.5;">
                <h3 style="color:#0a2a51; font-size:14px; margin-top:0;">Building dreams with precision and trust</h3>
                <p style="margin:0 0 8px 0;">Hello <strong>\${name}</strong>,</p>
                <p style="margin:0 0 10px 0;">
                  Thank you for reaching out to <strong>Modsser Enterprises</strong> — your trusted partner in 
                  <strong>construction, renovation</strong>, and <strong>infrastructure</strong> development.
                  We appreciate your interest and look forward to learning more about your project.
                </p>

                <p style="margin:0 0 8px 0;">Our services include:</p>
                <ul style="margin:4px 0 10px 18px; padding:0;">
                  <li>Residential & commercial construction</li>
                  <li>Interior and exterior renovation</li>
                  <li>Industrial site development</li>
                  <li>Finishing & architectural design</li>
                </ul>

                <p style="margin:0 0 10px 0;">
                  Our approach combines <strong>quality materials</strong>, <strong>skilled workmanship</strong>, 
                  and a <strong>commitment to deadlines</strong> — ensuring long-lasting, elegant structures.
                </p>

                <p style="margin:0 0 12px 0;">
                  One of our experts will contact you soon to discuss your ideas in detail.
                  For quick assistance, feel free to reach out directly below:
                </p>

                <!-- Buttons -->
                <div style="margin-top:12px;">
                  <a href="tel:7254087502" 
                     style="display:inline-block; margin-right:6px; padding:8px 14px; background:#0a4ea0; color:#fff; border-radius:4px; text-decoration:none; font-size:11px;">
                     📞 Call Now
                  </a>
                  <a href="mailto:mdsadiktenth464@gmail.com" 
                     style="display:inline-block; padding:8px 14px; background:#1f7bd8; color:#fff; border-radius:4px; text-decoration:none; font-size:11px;">
                     ✉️ Email Us
                  </a>
                </div>

                <p style="margin-top:14px; color:#555; font-size:11px;">
                  We’re excited to help turn your vision into a structure you’ll be proud of. 
                  Thank you again for choosing Modsser Enterprises.
                </p>

                <!-- Footer -->
                <p style="margin-top:10px; font-size:10px; color:#777; border-top:1px solid #eee; padding-top:8px;">
                  Regards,<br/>
                  <strong>Modsser Enterprises Team</strong><br/>
                  Website: <a href="https://www.modsserenterprises.in/" style="color:#0a4ea0; text-decoration:none;">modsserenterprises.in</a><br/>
                  Email: <a href="mailto:mdsadiktenth464@gmail.com" style="color:#0a4ea0; text-decoration:none;">mdsadiktenth464@gmail.com</a><br/>
                  Phone: <a href="tel:7254087502" style="color:#0a4ea0; text-decoration:none;">+91 72540 87502</a>
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
