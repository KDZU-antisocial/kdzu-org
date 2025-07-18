## 🚀 Development

This site runs
- Astro 5
- Serve (for local static file serving)
- Cloudflare Workers
- Cloudflare DNS
- Cloudflare R2 for static files
- Cloudflare Rules

Installation steps are at the bottom of this document.

### Running dev

Use `npm run dev` to start Astro at http://localhost:4321

Check the scripts section of `package.json` to learn more about how this works

## Deploying with a Github Action

This repo is deployed to Cloudflare when `dev` is merged into the `main` branch. The default branch is set to `dev`.

### Manual Deployment

For manual deployments, use the provided deployment script:

```bash
./deploy-site.sh
```

This script deploys both workers in the correct order:
1. Deploys the Astro worker (`kdzu-org-astro-site-production`)
2. Deploys the main site worker (`kdzu-org-site-production`) with service binding

### Trailing Slash Redirect Solution

The site uses a two-worker architecture to handle trailing slash redirects:

- **Problem**: Google indexed URLs without trailing slashes (e.g., `kdzu.org/events`) but Astro expects trailing slashes (`kdzu.org/events/`)
- **Solution**: Main worker redirects non-trailing slash URLs with 301 status codes
- **Benefits**: 
  - Fixes Cloudflare Error 1101 for old indexed URLs
  - Helps Google update its index
  - Maintains SEO with proper redirects
  - No breaking changes to existing functionality

### Running Astro 5 as an SSR  + Cloudflare Adapter Structure

See `astro.config.mjs` for my config. When you build an Astro project with:

- output: 'server' (SSR mode)
- @astrojs/cloudflare adapter

The build output structure is:

```
dist/
├── _worker.js/
│   ├── index.js          ← Main worker entry point
│   ├── pages/            ← Server-side page modules
│   │   ├── index.astro.mjs
│   │   └── ...
│   └── chunks/           ← Shared code chunks
└── _astro/               ← Static assets (if any)
```

#### 🚨 Astro SSR Wackiness
Astro is doing a very weird thing I couldn't successfully debug. My image src paths are being malformed as <span style="color:red">`/https:/`</span> instead of `https://`. This seems to be a known Astro bug with asset URL generation in SSR builds when using a custom `build.assets` configuration.

#### My 🩹 Fix
I have a `/scripts/fix-asset-urls.js` file that is called after astro.build in my `package.json`.

### Static Asset Handling

Assets such as images are stored in a [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) bucket. This means that assets need to be uploaded to this bucket.

### R2 Bucket Local Copies

The following directories contain local copies of R2 bucket contents and are gitignored:

- **`r2-kdzu-org/`**: Local copy of the `kdzu-org` R2 bucket
  - Contains 47 objects (~19.9 KB)
  - Includes `.git` repository files and configuration
  - Used for development and backup purposes

- **`r2-kdzu-static/`**: Local copy of the `kdzu-static` R2 bucket  
  - Contains 390 objects (~36.3 MB)
  - Includes built Astro site files, images, fonts, and static assets
  - Contains the complete production site build

These directories can be recreated using the download script:
```bash
node scripts/download-r2-buckets.js
```

### Download Script Details

The `scripts/download-r2-buckets.js` script:

- **Connects to Cloudflare R2** using AWS SDK v3 with R2 compatibility
- **Lists all objects** in both `kdzu-org` and `kdzu-static` buckets
- **Downloads each file** while maintaining the original directory structure
- **Shows progress** with file counts, sizes, and completion percentages
- **Handles pagination** for buckets with many objects
- **Creates directories** automatically as needed
- **Provides detailed logging** with emojis and status indicators

**Requirements**: You'll need R2 credentials in your `.env` file:
```
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
```

**Example output**:
```
🔐 Checking credentials...
✅ Credentials found in .env file
🌐 Connecting to Cloudflare R2...

🚀 Starting download of bucket: kdzu-org
📁 Output directory: /path/to/r2-kdzu-org
📋 Listing objects in kdzu-org...
  📄 Fetching page 1...
  ✅ Page 1: Found 47 objects
📊 Total objects found in kdzu-org: 47

📥 Downloading 47 objects from kdzu-org...
⏱️  This may take a while depending on file sizes...

  ✅ [1/47] Downloaded: .git/logs/refs/heads/main (1.9 KB)
  ✅ [2/47] Downloaded: .git/logs/refs/remotes/origin/HEAD (0.5 KB)
  ...
📈 Progress: 10/47 (21.3%)
  ...
🎉 Completed download of kdzu-org!
```

### Upload all static assets to kdzu-static R2 bucket recursively

1. Test your wrangler login

`npx wrangler login`

2. Run a find and use wrangler to put the files in the R2 Bucket.

```
find dist/_astro -type f | while read file; do
  npx wrangler r2 object put kdzu-static/"_astro/${file#dist/_astro/}" --file "$file" --remote
done
```

## 📁 Worker Configuration Files

- **`wrangler-site.toml`**: Main site worker configuration (handles routes and redirects)
- **`wrangler-astro.toml`**: Astro worker configuration (handles site logic)
- **`wrangler.toml`**: Static assets worker configuration (serves R2 files)
- **`site-worker.js`**: Main site worker code (trailing slash redirects)
- **`static-proxy-worker.js`**: Static assets worker code (R2 proxy)

## 🧞 Useful npm Commands

All commands are run from the root of the project, from a terminal:

| Command                                 | Action                                                     |
| :-------------------------------------- | :--------------------------------------------------------- |
| `npm install`                           | Installs dependencies                                      |
| `npm run dev`                           | Starts local Astro at `:4321` and local assets at `:4000`  |
| `npm run build`                         | Build your production site to `./dist/`                    |
| `npm run preview`                       | Preview your build locally, before deploying               |
| `npm run astro ...`                     | Run CLI commands like `astro add`, `astro check`           |
| `npm run astro -- --help`               | Get help using the Astro CLI                               |

## 🤠 Useful Wrangler Commands

Note: I don't have local sudo access so I have to use npx to run these. See installation for more details on that. Also I don't use these very often as I use `npm run dev` to build my dev, and Github Actions to build my production.

| Command                                 | Action                                             |
| :-------------------------------------- | :------------------------------------------------- |
| `npx wrangler dev --env dev`            | Starts local dev server at `http://localhost:8787` |
| `npx wrangler deploy --env production`  | Deploy to CloudFlare production                    |

## ☁️ Cloudflare Settings

### Cloudflare Rules

- Redirect from HTTP to HTTPS
- Redirect from WWW to Root

### Cloudflare Workers

#### Main Site Workers
- **kdzu-org-site-production**
  - Routes: `kdzu.org/*`, `www.kdzu.org/*`
  - Purpose: Handles trailing slash redirects and request routing
  - Functions:
    - Redirects non-trailing slash URLs (e.g., `kdzu.org/events` → `kdzu.org/events/`)
    - Passes valid requests to the Astro worker
    - Skips redirects for static assets
  - Service binding: `ASTRO_SITE` → `kdzu-org-astro-site-production`

- **kdzu-org-astro-site-production**
  - Routes: None (only called by main site worker)
  - Purpose: Handles actual site logic and content rendering
  - Functions:
    - Renders Astro pages (homepage, events, tracks, etc.)
    - Processes MDX, markdown, and dynamic content
    - Provides all website functionality

#### Static Assets Worker
- **kdzu-org-worker-production**
  - Routes: `static.kdzu.org/*`
  - Purpose: Serves static assets from R2 bucket
  - Bindings: R2 Bucket `KDZU_STATIC` → `kdzu-static`
  - DNS: Setup through R2

#### DNS Configuration
- DNS A record created manually for `192.0.2.1` Proxied
- DNS CNAME `www` record created manually pointing to `kdzu.org`


## 🎬 Installing Astro, and Cloudflare Wrangler

### Make sure Node is installed and up to date

```node -v```

returned v20.12.2. Lookin good!

### Install Node 22

```nvm install 22```

returned "Now using node v22.16.0 (npm v10.9.2)." Lookin good!

### Install the latest Astro

This will run your through the setup questionairre.

```npm create astro@latest```

🚨NOTE: I ran this command from the terminal at my `~/Documents/GitHub/kdzu-org` folder, so i just used a `.` in response to "Where should we create your new project?"

### Install wrangler
I installed wrangler “locally” as I don’t have to sudo access on my Mac 😵‍💫.

`npm install --save-dev wrangler`

Note! This means wrangler commands will need to start with `npx`.

Example: `npx wrangler foo`

not simply: `wrangler foo` 🙅🏼‍♂️# Updated Thu Jul 10 16:44:41 PDT 2025
