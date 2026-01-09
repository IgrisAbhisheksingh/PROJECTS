const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../model/user.model");

// Upload folder
const uploadDir = path.join(__dirname, "../public/bankimages");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage }).single("photo");

const router = require("express").Router();

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    
    try {
      const { fullname, email, mobile, password, address } = req.body;
      const photoPath = req.file ? `bankimages/${req.file.filename}` : "";

      // Check email
      if (await User.findOne({ email })) {
        return res.status(400).json({ message: "Already exists !" });
      }

      const user = await User.create({ fullname, email, mobile, password, address, photo: photoPath });
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
});

module.exports = router;
