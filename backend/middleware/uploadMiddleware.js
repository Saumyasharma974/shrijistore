// middleware/multerMiddleware.js
import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Example: 1698752102313.jpg
  }
});

// Create upload middleware
const upload = multer({ storage });

export default upload;
