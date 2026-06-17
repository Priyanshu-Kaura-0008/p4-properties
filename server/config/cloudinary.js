import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const requiredCredentials = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
];

const missingCredentials = requiredCredentials.filter((key) => !process.env[key]);

if (missingCredentials.length > 0) {
  throw new Error(
    `Missing Cloudinary environment variable${missingCredentials.length > 1 ? 's' : ''}: ${missingCredentials.join(', ')}`
  );
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
