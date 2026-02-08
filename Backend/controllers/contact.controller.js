const brevo = require('@getbrevo/brevo');
const Contact = require('../models/contact.model');

exports.saveContact = async (req, res) => {
  try {
    console.log('➡️ Received contact request:', req.body);
    const { name, email, phone, subject, message } = req.body;

    // Validate fields (Basic check, though Model handles strict validation)
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 💾 Save to MongoDB
    console.log('💾 Saving to MongoDB...');
    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();
    console.log('✅ Saved to MongoDB');

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
                <p style="margin:0 0 8px 0;">Hello <strong> ${name} </strong>,</p>
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
                  Email: <a href="mailto:modasser.enterprises@gmail.com" style="color:#0a4ea0; text-decoration:none;">modasser.enterprises@gmail.com</a><br/>
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

    // 📧 Configure API Key and Send Email
    try {
      const apiInstance = new brevo.TransactionalEmailsApi();
      let apiKey = process.env.BREVO_API_KEY;
      const senderEmail = process.env.FROM_EMAIL || "no-reply@modsserenterprises.in";

      if (apiKey) {
        apiKey = apiKey.trim(); // 🟢 TRIM WHITESPACE
        apiInstance.authentications['apiKey'].apiKey = apiKey;

        console.log('🔍 Debug: Usage of Brevo Key');
        console.log(`   - Length: ${apiKey.length}`);
        console.log(`   - Prefix: ${apiKey.substring(0, 10)}...`);
        console.log(`   - Sender: ${senderEmail}`);
      } else {
        console.warn('⚠️ BREVO_API_KEY is not set in environment variables.');
      }

      // 📧 Create email object
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.to = [{ email: email, name: name }];
      sendSmtpEmail.sender = { name: "Modsser Enterprises", email: senderEmail };
      sendSmtpEmail.subject = "Thank you for contacting Modsser Enterprises";
      sendSmtpEmail.htmlContent = htmlTemplate;

      // Send via Brevo
      console.log('📧 Sending email via Brevo...');
      await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('✅ Email sent via Brevo');
      console.log(`📨 Email sent successfully to ${email}`);

    } catch (emailError) {
      console.error('⚠️ Failed to send email via Brevo.');
      console.error(`   - Message: ${emailError.message}`);
      console.error(`   - Status: ${emailError.response ? emailError.response.status : 'Unknown'}`);
      if (emailError.response && emailError.response.body) {
        console.error('   - Body:', JSON.stringify(emailError.response.body));
      } else if (emailError.response && emailError.response.data) {
        console.error('   - Data:', JSON.stringify(emailError.response.data));
      }
      // Continue execution to return success for the contact save, as the data is safe in DB
    }


    res.status(200).json({ message: '✉️ Thank you for contacting Modasser Enterprises! Your inquiry has been received successfully — our team will respond shortly.' });

  } catch (error) {
    console.error('❌ Error in contact controller:', error);
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Failed to save or send email.' });
  }
};
