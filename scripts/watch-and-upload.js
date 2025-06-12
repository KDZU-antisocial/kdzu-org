import 'dotenv/config';
import chokidar from 'chokidar';
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Log environment variables (without sensitive data)
console.log('R2 Account ID:', process.env.R2_ACCOUNT_ID);
console.log('R2 Access Key ID exists:', !!process.env.R2_ACCESS_KEY_ID);
console.log('R2 Secret Access Key exists:', !!process.env.R2_SECRET_ACCESS_KEY);

// Configure AWS SDK for R2 using environment variables
const s3 = new AWS.S3({
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  region: 'auto'
});

// Function to list all buckets
async function listBuckets() {
  try {
    const data = await s3.listBuckets().promise();
    console.log('\nAvailable buckets:');
    data.Buckets.forEach(bucket => {
      console.log(`- ${bucket.Name} (Created: ${bucket.CreationDate})`);
    });
  } catch (error) {
    console.error('Error listing buckets:', error);
  }
}

// List buckets on startup
listBuckets();

// Define the paths to watch
const pathsToWatch = [
  'public/images',
  'public/tracks',
  'public/styles',
  'public/scripts',
  'public/favicon',
  'dist'  // Add dist directory to watch for generated files
];

// Initialize watcher
const watcher = chokidar.watch(pathsToWatch, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
});

// Function to handle file changes
const handleFileChange = async (filepath) => {
  console.log(`\nProcessing file: ${filepath}`);
  
  try {
    // Get the relative path from public directory or dist directory
    const relativePath = filepath.startsWith('dist/') 
      ? filepath.replace('dist/', '')
      : path.relative('public', filepath);
    console.log('Relative path:', relativePath);
    
    // Check if file exists
    if (!fs.existsSync(filepath)) {
      console.error(`File does not exist: ${filepath}`);
      return;
    }

    // Get file stats
    const stats = fs.statSync(filepath);
    console.log('File size:', stats.size, 'bytes');
    
    // Read the file
    const fileContent = fs.readFileSync(filepath);
    console.log('File read successfully');
    
    // Upload to R2
    const params = {
      Bucket: 'kdzu-static',
      Key: relativePath,
      Body: fileContent,
      ContentType: getContentType(filepath),
      ACL: 'public-read'
    };

    console.log('Uploading with params:', {
      Bucket: params.Bucket,
      Key: params.Key,
      ContentType: params.ContentType,
      ACL: params.ACL
    });

    const result = await s3.upload(params).promise();
    console.log('Upload successful:', result.Location);
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      requestId: error.requestId,
      cfId: error.cfId,
      statusCode: error.statusCode
    });
    if (error.code === 'NoSuchBucket') {
      console.error('Bucket does not exist. Please check your R2 bucket name and credentials.');
    }
  }
};

// Helper function to determine content type
function getContentType(filepath) {
  const ext = path.extname(filepath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.html': 'text/html',
    '.txt': 'text/plain',
    '.xml': 'application/xml'  // Add XML content type
  };
  return contentTypes[ext] || 'application/octet-stream';
}

// Add event listeners
watcher
  .on('add', handleFileChange)
  .on('change', handleFileChange)
  .on('unlink', (filepath) => {
    console.log(`File ${filepath} has been removed`);
    // Optionally handle file deletion from R2 here
  });

console.log('Watching for changes in:', pathsToWatch.join(', '));