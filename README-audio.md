# Audio Component Documentation - KDZU

This document covers the AudioPlayer component implementation and usage for the KDZU website, including how to add audio files to your R2 bucket and embed them in content.

## 🎵 Overview

The KDZU site uses a custom AudioPlayer component (`AudioPlayer.astro`) that provides a flexible, responsive, and customizable way to embed audio files across all content types (pages, MDC posts, blog posts, events, etc.). Audio files are hosted in your R2 bucket and served via Cloudflare CDN.

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

### Minimal Theme
- Clean, simple interface
- Hides metadata display
- Focus on audio controls only

### Dark Theme
- Dark background and controls
- Light text and icons
- Perfect for dark mode sites

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
- Check file URL is correct
- Verify file exists in R2 bucket
- Check browser console for errors
- Ensure file format is supported

#### Upload Issues
- Check watch-and-upload script is running
- Verify R2 credentials in environment variables
- Check file permissions in public/audio folder
- Monitor upload logs for errors

#### Styling Issues
- Check CSS specificity
- Verify className and style props
- Inspect element for conflicts
- Test on different screen sizes

#### Performance Issues
- Compress audio files
- Use appropriate preload settings
- Consider lazy loading for multiple players
- Monitor file sizes

### Debug Mode
Add console logging to debug issues:
```astro
<AudioPlayer 
  src="https://static.kdzu.org/audio/track.mp3"
  className="debug-audio"
/>
```

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
**Component Version**: 1.0  
**Astro Version**: 5.9.0  
**Supported Formats**: MP3, WAV, OGG, M4A, FLAC 