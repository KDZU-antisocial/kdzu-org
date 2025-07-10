#!/bin/bash

# Upload favicon files to R2 bucket
echo "Uploading favicon files to R2 bucket..."

# Upload favicon files from public/favicon/
echo "Uploading favicon files..."
npx wrangler r2 object put kdzu-static/favicon/favicon.ico --file public/favicon/favicon.ico --remote
npx wrangler r2 object put kdzu-static/favicon/favicon-16x16.png --file public/favicon/favicon-16x16.png --remote
npx wrangler r2 object put kdzu-static/favicon/favicon-32x32.png --file public/favicon/favicon-32x32.png --remote
npx wrangler r2 object put kdzu-static/favicon/apple-touch-icon.png --file public/favicon/apple-touch-icon.png --remote
npx wrangler r2 object put kdzu-static/favicon/android-chrome-192x192.png --file public/favicon/android-chrome-192x192.png --remote
npx wrangler r2 object put kdzu-static/favicon/android-chrome-512x512.png --file public/favicon/android-chrome-512x512.png --remote
npx wrangler r2 object put kdzu-static/favicon/site.webmanifest --file public/favicon/site.webmanifest --remote

# Upload favicon.svg from public root
echo "Uploading favicon.svg..."
npx wrangler r2 object put kdzu-static/favicon/favicon.svg --file public/favicon.svg --remote

echo "✅ Favicon files uploaded successfully!"
echo "You can now test: https://static.kdzu.org/favicon/favicon.ico" 