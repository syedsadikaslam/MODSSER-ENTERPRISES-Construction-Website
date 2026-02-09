const express = require('express');
const router = express.Router();
const hiringController = require('../controllers/hiring.controller');
const multer = require('multer');
const path = require('path');

// Configure Multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/resumes';
        // Create directory if it doesn't exist (using fs is better here but let's assume directory creation is handled or we use fs locally)
        const fs = require('fs');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf" || file.mimetype === "application/msword" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            cb(null, true);
        } else {
            cb(new Error("Only .pdf, .doc and .docx format allowed!"));
        }
    }
});

// Routes
router.post('/apply', upload.single('resume'), hiringController.applyForJob);
router.get('/applications', hiringController.getApplications); // Protect this route in future
router.patch('/applications/:id/status', hiringController.updateStatus);

module.exports = router;
