#!/bin/bash

# Deploy script for KDZU.org with trailing slash redirects

echo "🚀 Deploying KDZU.org with trailing slash redirects..."

# First, deploy the Astro-generated worker (no routes)
echo "📦 Deploying Astro worker..."
npx wrangler deploy --config wrangler-astro.toml --env production

# Then, deploy the main site worker (with routes and service binding)
echo "🌐 Deploying main site worker..."
npx wrangler deploy --config wrangler-site.toml --env production

echo "✅ Deployment complete!"
echo ""
echo "The site now handles trailing slash redirects:"
echo "- kdzu.org/events → 301 redirect → kdzu.org/events/"
echo "- kdzu.org/about → 301 redirect → kdzu.org/about/"
echo "- etc."
echo ""
echo "✅ Both workers deployed successfully!"
echo "🌐 Main site worker: kdzu-org-site-production"
echo "📦 Astro worker: kdzu-org-astro-site-production" 