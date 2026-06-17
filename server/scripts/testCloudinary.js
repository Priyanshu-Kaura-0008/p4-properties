import dotenv from 'dotenv';
import cloudinary from '../config/cloudinary.js';

dotenv.config();

const testCloudinaryConnection = async () => {
  try {
    await cloudinary.api.ping();
    console.log('Cloudinary connected successfully');
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
};

await testCloudinaryConnection();
