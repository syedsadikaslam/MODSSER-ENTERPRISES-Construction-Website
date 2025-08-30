// server.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());

// Frontend files ko serve karein
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.post("/save", (req, res) => {
  console.log("👀 Incoming body:", req.body); 

  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ success: false, message: "Please fill all fields!" });
  }

  const mdData = `
## New Form Submission
- **Name:** ${name}
- **Email:** ${email}
- **Phone:** ${phone}
- **Subject:** ${subject}
- **Message:** ${message}

---
`;

  fs.appendFile(path.join(__dirname, "formData.md"), mdData, (err) => {
    if (err) {
      console.error("Error saving form data:", err);
      return res.status(500).json({ success: false, message: "Failed to save data." });
    }
    res.json({ success: true, message: "Form submitted successfully!" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});