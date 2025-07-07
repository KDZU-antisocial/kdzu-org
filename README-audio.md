# Audio Component Documentation - KDZU

This document covers the AudioPlayer component implementation and usage for the KDZU website, including how to add audio files to your R2 bucket and embed them in content.

## 🎵 Overview

The KDZU site uses a custom AudioPlayer component (`AudioPlayer.astro`) that provides a flexible, responsive, and customizable way to embed audio files across all content types (pages, MDC posts, blog posts, events, etc.). Audio files are hosted in your R2 bucket and served via Cloudflare CDN.

**Recent Updates (January 2025):**
- ✅ Fixed browser autoplay muting issues for multiple audio players
- ✅ Improved dark mode styling and native controls visibility
- ✅ Added CORS headers configuration for static assets
- ✅ Enhanced debugging and error handling

## 📁 Files

### Core Component
- `src/components/AudioPlayer.astro` - Main audio player component with full customization options

### Configuration
- `astro.config.mjs` - Updated to make AudioPlayer available in MDX files
- `scripts/watch-and-upload.js` - Updated to handle audio file uploads to R2

### Examples & Documentation
- `src/pages/audio-examples.astro` - Live demo page showing all component features
- `src/content/mdc/audio-example.mdx` - Example MDX post demonstrating audio usage
- `README-audio.md` - This documentation file

## 🚀 Quick Start

### Basic Usage
```astro
---
import AudioPlayer from '../components/AudioPlayer.astro';
---

<AudioPlayer 
  src="https://static.kdzu.org/audio/track.mp3"
  title="Track Title"
  artist="Artist Name"
/>
```

### In MDX Posts
```mdx
<AudioPlayer 
  src="https://static.kdzu.org/audio/track.mp3"
  title="Track Title"
  artist="Artist Name"
/>
```

## 🎛️ Component Props

### Required
- `src` (string) - URL to the audio file (MP3 from R2 bucket)

### Player Appearance
- `width` (string) - Width of the player (default: "100%")
- `height` (string) - Height of the player (default: "auto")
- `theme` ('default' | 'minimal' | 'dark' | 'custom') - Player theme (default: "default")
- `showTitle` (boolean) - Show track title (default: true)
- `showArtist` (boolean) - Show artist name (default: true)
- `showDuration` (boolean) - Show duration (default: true)

### Player Behavior
- `autoplay` (boolean) - Autoplay audio (default: false)
- `preload` ('none' | 'metadata' | 'auto') - Preload behavior (default: "metadata")
- `loop` (boolean) - Loop audio (default: false)
- `muted` (boolean) - Mute audio (default: false)
- `controls` (boolean) - Show native controls (default: true)

### Audio Metadata
- `title` (string) - Track title
- `artist` (string) - Artist name
- `album` (string) - Album name
- `coverArt` (string) - Album cover image URL

### Styling
- `className` (string) - Additional CSS classes (optional)
- `style` (string) - Inline CSS styles (optional)

### Advanced Options
- `volume` (number) - Initial volume 0-1 (default: 1)
- `playbackRate` (number) - Playback speed 0.5-2 (default: 1)

## 📝 Usage Examples

### Basic Audio Player
```astro
<AudioPlayer 
  src="https://static.kdzu.org/audio/track.mp3"
  title="Sample Track"
  artist="KDZU"
  album="Demo Album"
/>
```

### Audio Player with Cover Art
```astro
<AudioPlayer 
  src="https://static.kdzu.org/audio/track.mp3"
  title="Arroyo Seco Vibes"
  artist="KDZU Collective"
  album="Antenna Obscura Sessions"
  coverArt="https://static.kdzu.org/images/album-cover.jpg"
/>
```

### Minimal Theme
```astro
<AudioPlayer 
  src="https://static.kdzu.org/audio/track.mp3"
  theme="minimal"
  controls={false}
/>
```

### Custom Controls
```astro
<AudioPlayer 
  src="https://static.kdzu.org/audio/track.mp3"
  controls={false}
  title="Custom Controls Demo"
  artist="KDZU"
  volume={0.8}
/>
```

### Autoplay (Muted)
```astro
<AudioPlayer 
  src="https://static.kdzu.org/audio/track.mp3"
  autoplay={true}
  muted={true}
  loop={true}
  title="Autoplay Demo"
  artist="KDZU"
/>
```

### Dark Theme
```astro
<AudioPlayer 
  src="https://static.kdzu.org/audio/track.mp3"
  theme="dark"
  title="Night Session"
  artist="KDZU"
/>
```

## 🎨 Theme Options

### Default Theme
- Full-featured player with metadata display
- Cover art support
- Complete control interface
- Optimized for light and dark modes

### Minimal Theme
- Clean, simple interface
- Hides metadata display
- Focus on audio controls only

### Dark Theme
- Dark background and controls
- Light text and icons
- Perfect for dark mode sites
- Enhanced native controls visibility

### Custom Theme
- Use your own CSS classes
- Full styling control
- Integrate with your design system

## 📱 Responsive Design

The component automatically:
- Adapts to mobile screens
- Uses touch-friendly controls
- Maintains proper aspect ratios
- Optimizes layout for different screen sizes

### Mobile Optimizations
- Larger touch targets
- Simplified controls layout
- Optimized volume slider
- Responsive cover art sizing

## ♿ Accessibility

### Built-in Features
- Screen reader support
- Keyboard navigation
- Proper ARIA labels
- Focus management
- High contrast support

### Best Practices
```astro
<AudioPlayer 
  src="https://static.kdzu.org/audio/track.mp3"
  title="Descriptive track title for screen readers"
  artist="Artist name"
/>
```

## 🎵 Adding Audio Files to Your Site

### Step 1: Prepare Your Audio Files
1. **Format**: Use MP3, WAV, OGG, M4A, or FLAC
2. **Quality**: 128-320 kbps for MP3, higher for other formats
3. **Size**: Keep files under 50MB for optimal loading
4. **Naming**: Use descriptive filenames (e.g., `arroyo-seco-vibes.mp3`)

### Step 2: Upload to R2 Bucket
1. **Place files** in `public/audio/` folder
2. **Run your build script**: `npm run build`
3. **Watch script automatically uploads** files to R2
4. **Files become available** at `https://static.kdzu.org/audio/filename.mp3`

### Step 3: Use in Content
```mdx
<AudioPlayer 
  src="https://static.kdzu.org/audio/arroyo-seco-vibes.mp3"
  title="Arroyo Seco Vibes"
  artist="KDZU Collective"
  album="Antenna Obscura Sessions"
/>
```

## 🔧 File Organization

### Recommended Structure
```
public/
├── audio/
│   ├── music/
│   │   ├── track1.mp3
│   │   └── track2.mp3
│   ├── podcasts/
│   │   ├── episode1.mp3
│   │   └── episode2.mp3
│   └── ambient/
│       └── nature-sounds.wav
├── images/
│   └── album-covers/
│       ├── album1.jpg
│       └── album2.jpg
└── ...
```

### URL Patterns
- **Audio files**: `https://static.kdzu.org/audio/filename.mp3`
- **Cover art**: `https://static.kdzu.org/images/album-covers/cover.jpg`

## 🚀 Performance Optimization

### Best Practices
- **Compress audio files** before uploading
- **Use appropriate formats** (MP3 for music, WAV for high quality)
- **Set preload="metadata"** for faster initial load
- **Use cover art** to improve visual appeal
- **Consider autoplay** only for background music

### File Size Guidelines
- **Podcast episodes**: 5-50MB (30-60 minutes)
- **Music tracks**: 2-10MB (3-5 minutes)
- **Sound effects**: <1MB (short clips)

## 🔄 Integration Points

### Where to Use
- **MDC Posts**: Direct component usage in MDX
- **Blog Posts**: Direct component usage in MDX
- **Regular Pages**: Import and use component
- **Events Pages**: Embed audio in event descriptions
- **Any Content**: Available site-wide

### Content Collections
The component works with all Astro content collections:
- `src/content/mdc/` - MDC posts
- `src/content/blog/` - Blog posts
- Any other content collections

## 🛠️ Troubleshooting

### Common Issues

#### Audio Not Playing
- **Browser Autoplay Policy**: Modern browsers mute audio elements by default. The component automatically unmutes audio elements to resolve this.
- **Multiple Players**: If you have multiple audio players on a page, ensure they're not conflicting. Each player is automatically unmuted.
- **File URL**: Check file URL is correct and accessible
- **File Format**: Verify file format is supported by the browser
- **CORS Issues**: Ensure your R2 bucket has proper CORS headers configured

#### Upload Issues
- Check watch-and-upload script is running
- Verify R2 credentials in environment variables
- Check file permissions in public/audio folder
- Monitor upload logs for errors

#### Styling Issues
- **Dark Mode**: The component automatically adapts to dark mode themes
- **Native Controls**: Enhanced visibility with blue border and dark background
- **CSS Conflicts**: Check CSS specificity and className usage
- **Responsive Design**: Test on different screen sizes

#### Performance Issues
- Compress audio files before uploading
- Use appropriate preload settings
- Consider lazy loading for multiple players
- Monitor file sizes and loading times

### CORS Configuration

#### For Static Assets (Fonts, Favicons, etc.)
If you encounter CORS errors with static assets from `static.kdzu.org`, you can configure CORS headers in your Cloudflare R2 bucket:

1. **Via Cloudflare Dashboard**:
   - Go to R2 Object Storage
   - Select your bucket
   - Go to Settings > CORS
   - Add CORS policy for your domain

2. **Via Cloudflare Worker** (Recommended):
   - Create a Worker route for `static.kdzu.org`
   - Add CORS headers to responses
   - Proxy requests to R2 bucket

Example Worker CORS configuration:
```javascript
// Add to your Cloudflare Worker
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  const newResponse = new Response(response.body, response)
  
  // Add CORS headers
  newResponse.headers.set('Access-Control-Allow-Origin', '*')
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
  newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  
  return newResponse
}
```

### Debug Mode
The component includes built-in debugging for common issues:
```astro
<AudioPlayer 
  src="https://static.kdzu.org/audio/track.mp3"
  className="debug-audio"
/>
```

Check browser console for detailed debugging information about:
- Audio loading status
- Autoplay policy compliance
- Muting/unmuting operations
- Player initialization

## 📚 Resources

### Audio Format Guidelines
- **MP3**: Best for music, podcasts (128-320 kbps)
- **WAV**: Best for high quality, sound effects
- **OGG**: Good compression, open format
- **M4A**: Apple devices, good compression
- **FLAC**: Lossless, large file sizes

### R2 Storage
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [R2 API Reference](https://developers.cloudflare.com/r2/api/)

### Astro Documentation
- [Astro Components](https://docs.astro.build/en/core-concepts/astro-components/)
- [MDX Integration](https://docs.astro.build/en/guides/mdx/)

### Demo Pages
- `/audio-examples` - Live examples of all features
- `/mdc/audio-example` - Example MDX post with audio

## 🔄 Updates & Maintenance

### Recent Fixes (January 2025)
- **Autoplay Muting**: Fixed browser autoplay policy issues that muted audio elements
- **Dark Mode Styling**: Improved visibility of native controls in dark themes
- **CORS Headers**: Added configuration guidance for static asset CORS issues
- **Debug Logging**: Enhanced debugging capabilities for troubleshooting

### Component Updates
- Monitor browser audio API changes
- Update component for new features
- Test across different browsers
- Validate accessibility features

### Performance Monitoring
- Monitor audio loading times
- Check for broken audio links
- Validate responsive behavior
- Test on various devices

### File Management
- Regularly clean up unused audio files
- Monitor R2 storage usage
- Backup important audio content
- Update metadata as needed

---

**Last Updated**: January 2025  
**Component Version**: 1.1  
**Astro Version**: 5.9.0  
**Supported Formats**: MP3, WAV, OGG, M4A, FLAC  
**Recent Fixes**: Autoplay muting, dark mode styling, CORS configuration 