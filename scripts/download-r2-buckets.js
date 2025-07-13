import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const s3Client = new S3Client({
  endpoint: 'https://38b2250cde779e4a92c63d139be80a9c.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
  region: 'auto',
  forcePathStyle: true,
});

async function listAllObjects(bucketName) {
  console.log(`📋 Listing objects in ${bucketName}...`);
  const objects = [];
  let continuationToken = undefined;
  let pageCount = 0;
  
  do {
    pageCount++;
    console.log(`  📄 Fetching page ${pageCount}...`);
    
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      ContinuationToken: continuationToken,
    });
    
    try {
      const response = await s3Client.send(command);
      if (response.Contents) {
        objects.push(...response.Contents);
        console.log(`  ✅ Page ${pageCount}: Found ${response.Contents.length} objects`);
      }
      continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
    } catch (error) {
      console.error(`❌ Error listing objects in ${bucketName}:`, error);
      break;
    }
  } while (continuationToken);
  
  console.log(`📊 Total objects found in ${bucketName}: ${objects.length}`);
  return objects;
}

async function downloadObject(bucketName, objectKey, outputDir, current, total) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });
  
  try {
    const response = await s3Client.send(command);
    const filePath = path.join(outputDir, objectKey);
    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Convert the readable stream to a buffer
    const chunks = [];
    for await (const chunk of response.Body) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    
    fs.writeFileSync(filePath, buffer);
    console.log(`  ✅ [${current}/${total}] Downloaded: ${objectKey} (${(buffer.length / 1024).toFixed(1)} KB)`);
  } catch (error) {
    console.error(`❌ Error downloading ${objectKey}:`, error);
  }
}

async function downloadBucket(bucketName, outputDir) {
  console.log(`\n🚀 Starting download of bucket: ${bucketName}`);
  console.log(`📁 Output directory: ${outputDir}`);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📂 Created output directory: ${outputDir}`);
  }
  
  const objects = await listAllObjects(bucketName);
  
  if (objects.length === 0) {
    console.log(`⚠️  No objects found in ${bucketName}`);
    return;
  }
  
  console.log(`\n📥 Downloading ${objects.length} objects from ${bucketName}...`);
  console.log(`⏱️  This may take a while depending on file sizes...\n`);
  
  for (let i = 0; i < objects.length; i++) {
    const object = objects[i];
    await downloadObject(bucketName, object.Key, outputDir, i + 1, objects.length);
    
    // Show progress every 10 files
    if ((i + 1) % 10 === 0) {
      const progress = ((i + 1) / objects.length * 100).toFixed(1);
      console.log(`📈 Progress: ${i + 1}/${objects.length} (${progress}%)`);
    }
  }
  
  console.log(`\n🎉 Completed download of ${bucketName}!`);
}

async function main() {
  console.log('🔐 Checking credentials...');
  
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    console.error('❌ Error: R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY must be set in your .env file.');
    process.exit(1);
  }
  
  console.log('✅ Credentials found in .env file');
  console.log('🌐 Connecting to Cloudflare R2...\n');
  
  try {
    await downloadBucket('kdzu-org', path.join(__dirname, '../r2-kdzu-org'));
    await downloadBucket('kdzu-static', path.join(__dirname, '../r2-kdzu-static'));
    console.log('\n🎊 All downloads completed successfully!');
    console.log('📂 Check the r2-kdzu-org/ and r2-kdzu-static/ directories for your files.');
  } catch (error) {
    console.error('❌ Error during download process:', error);
    process.exit(1);
  }
}

main(); 