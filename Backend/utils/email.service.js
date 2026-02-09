const brevo = require('@getbrevo/brevo');

const sendEmail = async (options) => {
    // Check if API Key exists
    if (!process.env.BREVO_API_KEY) {
        console.warn('⚠️ BREVO_API_KEY is not set. Email will not be sent.');
        return;
    }

    try {
        const apiInstance = new brevo.TransactionalEmailsApi();
        apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = options.subject;
        sendSmtpEmail.htmlContent = options.html || `<html><body><p>${options.message}</p></body></html>`;
        sendSmtpEmail.sender = {
            name: "Modsser Enterprises",
            email: process.env.FROM_EMAIL || "mdsadiksadik464@gmail.com"
        };
        sendSmtpEmail.to = [{ email: options.email }];

        // Optional: Reply To
        // sendSmtpEmail.replyTo = { email: "contact@modsserenterprises.in", name: "Support" };

        console.log(`📧 Sending email via Brevo to ${options.email}...`);
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('✅ Email sent successfully via Brevo');

    } catch (error) {
        console.error('❌ Failed to send email via Brevo:', error.body || error.message);
        // We throw the error so the controller knows it failed, 
        // OR we just log it if we don't want to block the flow.
        // warning: The booking controller catches this, so throwing is fine.
        throw new Error('Email sending failed');
    }
};

module.exports = sendEmail;
