const mongoose = require("mongoose");

const DB_URL = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/banking";

// ✅ Fixed for Mongoose >= 7
mongoose.connect(DB_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = mongoose;
