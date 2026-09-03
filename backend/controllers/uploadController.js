// Note: Real Cloudinary setup:
// const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// @desc  Upload file to Cloudinary
// @route POST /api/upload
// @access Admin
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const host = req.get("host") || "localhost:5000";
    const protocol = req.protocol || "http";
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    res.json({
      success: true,
      url: fileUrl,
      public_id: req.file.filename,
    });
  } catch (error) {
    console.error("uploadFile:", error);
    res.status(500).json({ message: "Server error during file upload" });
  }
};

module.exports = { uploadFile };
