import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Set up Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "YOUR_CLOUD_NAME",
  api_key: process.env.CLOUDINARY_API_KEY || "YOUR_API_KEY",
  api_secret: process.env.CLOUDINARY_API_SECRET || "YOUR_API_SECRET",
});

// ✅ Log current config (without exposing secret)
console.log("Cloudinary config loaded:", {
  cloud_name: cloudinary.config().cloud_name,
  api_key: cloudinary.config().api_key,
  // Do NOT log api_secret
});

export default cloudinary;
