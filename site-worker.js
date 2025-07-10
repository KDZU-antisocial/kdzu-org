// Cloudflare Worker to handle trailing slash redirects for kdzu.org
// This worker sits in front of the Astro-generated worker

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // Skip redirects for static assets and API routes
    const skipRedirects = [
      '/_astro/',
      '/favicon',
      '/fonts/',
      '/styles/',
      '/images/',
      '/api/',
      '.woff2',
      '.woff',
      '.ttf',
      '.otf',
      '.eot',
      '.png',
      '.jpg',
      '.jpeg',
      '.gif',
      '.webp',
      '.svg',
      '.mp3',
      '.wav',
      '.ogg',
      '.m4a',
      '.flac',
      '.mp4',
      '.webm',
      '.css',
      '.js',
      '.json',
      '.xml',
      '.txt',
      '.webmanifest',
      '.manifest'
    ];
    
    // Check if we should skip redirect for this path
    const shouldSkip = skipRedirects.some(skip => 
      path.startsWith(skip) || path.includes(skip)
    );
    
    if (shouldSkip) {
      // Pass through to the main site worker
      return env.ASTRO_SITE.fetch(request);
    }
    
    // Handle trailing slash redirects
    // If the path doesn't end with / and isn't the root, redirect to add trailing slash
    if (path !== '/' && !path.endsWith('/')) {
      const redirectUrl = new URL(request.url);
      redirectUrl.pathname = path + '/';
      
      return new Response(null, {
        status: 301,
        headers: {
          'Location': redirectUrl.toString(),
          'Cache-Control': 'public, max-age=31536000'
        }
      });
    }
    
    // If we get here, the URL already has a trailing slash or is the root
    // Pass through to the main site worker
    return env.ASTRO_SITE.fetch(request);
  }
}; 