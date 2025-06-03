## 🚀 Development

### Local Assets are served with a “serve” server

dist/_astro local folder is served for assets.
```npx serve dist/_astro -l 4000```

Serve can be installed with
```npm install --save-dev serve```

Install “serve” with 
npm install --save-dev serve

### Static Assets

Assets such as images are stored in a Cloudflare R2 bucket. This means that assets need to be uploaded to this bucket.

#### How to upload all files to kdzu-static R2 bucket recursively

1. Test your wrangler login

`npx wrangler login`

2. Run a find and use wrangler to put the files in the R2 Bucket.

```
find dist/_astro -type f | while read file; do
  npx wrangler r2 object put kdzu-static/"_astro/${file#dist/_astro/}" --file "$file" --remote
done
```



## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                                 | Action                                             |
| :-------------------------------------- | :------------------------------------------------- |
| `npm install`                           | Installs dependencies                              |
| `npm run dev`                           | Starts local dev server at `http://localhost:4321` |
| `npm run build`                         | Build your production site to `./dist/`            |
| `npm run preview`                       | Preview your build locally, before deploying       |
| `npm run astro ...`                     | Run CLI commands like `astro add`, `astro check`   |
| `npm run astro -- --help`               | Get help using the Astro CLI                       |

## 🤠 Wrangler Commands

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
  - DNS A record created manually for 192.0.2.1 Proxied
  - DNS CNAME www record created manually pointing to kdzu.org

- kdzu-static-worker-production
  - route `static.kdzu.org/*`
  - bindings R2 Bucket 
   - name ASSETS 
   - value kdzu-static
  - DNS setup through R2


## 🎬 Installation

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

