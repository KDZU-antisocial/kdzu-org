// Cloudflare Worker to proxy R2 bucket with proper CORS headers and MIME types

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return handleCORS(request)
    }
    return handleRequest(request, env)
  }
}

async function handleRequest(request, env) {
  const url = new URL(request.url)
  const path = url.pathname
  
  // Only handle static assets - pass through everything else
  const staticExtensions = [
    '.woff2', '.woff', '.ttf', '.otf', '.eot', // fonts
    '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', // images
    '.mp3', '.wav', '.ogg', '.m4a', '.flac', // audio
    '.mp4', '.webm', // video
    '.css', '.js', '.json', '.xml', '.txt', // other static files
    '.webmanifest', '.manifest' // web app manifests
  ]
  
  const extension = path.substring(path.lastIndexOf('.')).toLowerCase()
  
  // If it's not a static asset, pass through to the main site
  if (!staticExtensions.includes(extension)) {
    // For now, return a simple message - you can modify this to proxy to your main site
    return new Response('This Worker only serves static assets. Please visit the main site.', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain'
      }
    })
  }
  
  // Define MIME types for different file extensions
  const mimeTypes = {
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.eot': 'application/vnd.ms-fontobject',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
    '.m4a': 'audio/mp4',
    '.flac': 'audio/flac',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.htm': 'text/html',
    '.webmanifest': 'application/manifest+json',
    '.manifest': 'application/manifest+json'
  }
  
  // Get MIME type
  const contentType = mimeTypes[extension] || 'application/octet-stream'
  
  // Remove leading slash for R2 object key
  const objectKey = path.startsWith('/') ? path.substring(1) : path
  
  try {
    // Get object from R2 bucket using binding
    const object = await env.KDZU_STATIC.get(objectKey)
    
    if (!object) {
      return new Response('File not found', { status: 404 })
    }
    
    // Get object metadata
    const metadata = object.httpMetadata || {}
    
    // Create response with proper headers
    const response = new Response(object.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': object.size.toString(),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'ETag': object.etag || `"${Date.now()}"`,
        'Vary': 'Origin',
        'Last-Modified': object.uploaded.toUTCString()
      }
    })
    
    return response
    
  } catch (error) {
    console.error('Error fetching from R2:', error)
    return new Response(`Error: ${error.message}`, { status: 500 })
  }
}

function handleCORS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Max-Age': '86400'
    }
  })
} 