const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Absolute path to upload folder
const uploadDir = path.join(__dirname, "../public/bankimages");

// Ensure the folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // save files in public/bankimages/
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // unique filename
  },
});

const upload = multer({ storage }).single("photo"); // must match frontend FormData

const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    console.log("File uploaded:", req.file); // Debug: log file

    return res.status(200).json({
      message: "File uploaded successfully",
      filePath: `bankimages/${req.file.filename}`, // accessible via /bankimages/<file>
    });
  });
};

module.exports = { uploadFile };
