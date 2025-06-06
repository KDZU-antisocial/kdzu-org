import 'dotenv/config';
import chokidar from 'chokidar';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure AWS SDK for R2 using environment variables
const s3 = new AWS.S3({
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  region: 'auto'
});

// Directory to watch
const imagesDir = path.join(__dirname, '../public/images');

// Function to upload a file to R2
const uploadToR2 = (filePath) => {
  const fileName = path.basename(filePath);
  const fileStream = fs.createReadStream(filePath);

  const params = {
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
    Body: fileStream
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(`Error uploading ${fileName}:`, err);
    } else {
      console.log(`Successfully uploaded ${fileName} to ${data.Location}`);
    }
  });
};

// Watch the images directory for new files
chokidar.watch(imagesDir, { ignored: /(^|[\/\\])\../ }).on('add', (filePath) => {
  console.log(`New file detected: ${filePath}`);
  uploadToR2(filePath);
});

console.log(`Watching ${imagesDir} for new images...`);