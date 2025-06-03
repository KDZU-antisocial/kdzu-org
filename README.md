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

Use `npm run dev` to start Astro and Serve

- Astro runs on http://localhost:4321
- Serve runs on http://localhost:4000

Check the scripts section of `package.json` to learn more about how this works


## Deploying with a Github Action

This repo is deployed to Cloudflare when `dev` is merged into the `main` branch. The default branch is set to `dev`.

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

### Local Assets are served with a “serve” server

The `dist/_astro` local folder is served for assets.

```npx serve dist/_astro -l 4000```

### Static Asset Handling

Assets such as images are stored in a [Cloudflare R2](https://www.cloudflare.com/developer-platform/products/r2/) bucket. This means that assets need to be uploaded to this bucket.

### Upload all static assets to kdzu-static R2 bucket recursively

1. Test your wrangler login

`npx wrangler login`

2. Run a find and use wrangler to put the files in the R2 Bucket.

```
find dist/_astro -type f | while read file; do
  npx wrangler r2 object put kdzu-static/"_astro/${file#dist/_astro/}" --file "$file" --remote
done
```

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

Note: I don't have local sudo access so I have to use npx to run these. See installation for more details on that.

| Command                                 | Action                                             |
| :-------------------------------------- | :------------------------------------------------- |
| `npx wrangler dev --env dev`            | Starts local dev server at `http://localhost:8787` |
| `npx wrangler deploy --env production`  | Deploy to CloudFlare production                    |

## ☁️ Cloudflare Settings

### Cloudflare Rules

- Redirect from HTTP to HTTPS
- Redirect from WWW to Root

### Cloudflare Workers
- kdzu-org-worker-production
  - route `kdzu.org/*`, `www.kdzu.org/*`
  - DNS A record created manually for `192.0.2.1` Proxied
  - DNS CNAME `www` record created manually pointing to `kdzu.org`

- kdzu-static-worker-production
  - route `static.kdzu.org/*`
  - bindings R2 Bucket 
   - name ASSETS 
   - value kdzu-static
  - DNS for this is setup through R2


## 🎬 Installing Astro, Serve, and Cloudflare Wrangler

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

not simply: `wrangler foo` 🙅🏼‍♂️