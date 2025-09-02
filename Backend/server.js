require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://mdsadiksadik464_db_user:2LsFzlYVFM3EdrNq@cluster0.sdat6m9.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0";

// ✅ Middleware
app.use(cors({
  origin: ["https://modsserenterprisesweb.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST"],
}));
app.use(express.json());

// ✅ Serve Frontend (optional, agar backend sirf API ke liye hai to remove kar sakte ho)
app.use(express.static(path.join(__dirname, "..", "frontend")));

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// ✅ Schema & Model
const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const FormData = mongoose.model("FormData", formSchema);

// ✅ Route: Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

// ✅ Route: Save Form Data
app.post("/save", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields!" });
    }

    const newEntry = new FormData({ name, email, phone, subject, message });
    await newEntry.save();

    console.log("✅ New form submission:", newEntry);
    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving data:", error);
    res.status(500).json({ success: false, message: "Failed to save data." });
  }
});

// ✅ Fetch all form submissions
app.get("/submissions", async (req, res) => {
  try {
    const data = await FormData.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch data." });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
