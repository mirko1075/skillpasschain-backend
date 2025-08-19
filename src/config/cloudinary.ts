// src/config/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure_distribution: process.env.CLOUDINARY_SECURE_DISTRIBUTION,
  upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
});

export default cloudinary;
