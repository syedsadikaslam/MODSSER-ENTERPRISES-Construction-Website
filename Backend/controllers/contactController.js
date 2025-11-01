const Contact = require('../models/contactModel.js');
const nodemailer = require('nodemailer');

// ✅ Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ✅ Controller Function
exports.saveContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 💾 Save to DB
    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();

    // 📧 Email Template
    const htmlTemplate = `
      <!doctype html>
      <html>
        <body style="font-family: Arial, sans-serif; background-color:#f4f6f8; margin:0; padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f6f8;">
            <tr>
              <td align="center" style="padding:20px;">
                <table width="600" style="background:#ffffff; border-radius:8px; overflow:hidden;">
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
                        Modsser Enterprises provides end-to-end construction services — residential, commercial,
                        industrial and specialized renovations. We deliver projects with experience, quality, and reliability.
                      </p>
                      <a href="mailto:modasser.enterprises@gmail.com" 
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

    // 📤 Send Email to user
    await transporter.sendMail({
      from: `"Modsser Enterprises" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject: "Let's Build Your Vision — Premier Construction Services from Modsser Enterprises",
      html: htmlTemplate,
    });

    // (Optional) 📤 Send admin notification
    await transporter.sendMail({
      from: `"Modsser Enterprises" <${process.env.SMTP_MAIL}>`,
      to: process.env.SMTP_MAIL,
      subject: `New Contact Inquiry from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Subject: ${subject}
        Message: ${message}
      `,
    });

    console.log(`📨 Email sent to ${email}`);
    res.status(200).json({ message: 'Form submitted successfully & email sent!' });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Failed to save or send email.' });
  }
};
