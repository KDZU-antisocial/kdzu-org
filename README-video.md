# Video Component Documentation - KDZU

This document covers the Vimeo video component implementation and usage for the KDZU website.

## 🎥 Overview

The KDZU site uses a custom Vimeo video component (`VimeoVideo.astro`) that provides a flexible, responsive, and customizable way to embed videos across all content types (pages, MDC posts, blog posts, events, etc.).

## 📁 Files

### Core Component
- `src/components/VimeoVideo.astro` - Main video component with full customization options

### Configuration
- `astro.config.mjs` - Updated to make VimeoVideo available in MDX files

### Examples & Documentation
- `src/pages/video-examples.astro` - Live demo page showing all component features
- `src/content/mdc/video-example.mdx` - Example MDX post demonstrating video usage
- `README-video.md` - This documentation file

## 🚀 Quick Start

### Basic Usage
```astro
---
import VimeoVideo from '../components/VimeoVideo.astro';
---

<VimeoVideo videoId="148751763" />
```

### In MDX Posts
```mdx
<VimeoVideo videoId="148751763" />
```

## 🎛️ Component Props

### Required
- `videoId` (string) - The Vimeo video ID (number from the URL)

### Player Appearance
- `width` (string) - Width of the video (default: "100%")
- `height` (string) - Height of the video (default: "auto")
- `aspectRatio` ('16:9' | '4:3' | '1:1' | '21:9') - Video aspect ratio (default: "16:9")
- `responsive` (boolean) - Enable responsive wrapper (default: true)

### Player Behavior
- `autoplay` (boolean) - Autoplay video (default: false)
- `muted` (boolean) - Mute video (default: false)
- `loop` (boolean) - Loop video (default: false)
- `controls` (boolean) - Show player controls (default: true)
- `pip` (boolean) - Enable Picture in Picture (default: true)

### Player Customization
- `color` (string) - Hex color for player controls (default: "#00adef")
- `title` (boolean) - Show video title (default: false)
- `byline` (boolean) - Show uploader name (default: false)
- `portrait` (boolean) - Show uploader portrait (default: false)

### Advanced Options
- `startTime` (number) - Start time in seconds (default: 0)
- `endTime` (number) - End time in seconds (optional)
- `quality` ('auto' | '240p' | '360p' | '540p' | '720p' | '1080p' | '2k' | '4k') - Video quality (default: "auto")

### Accessibility
- `title` (string) - Title for screen readers (optional)
- `description` (string) - Description for screen readers (optional)

### Styling
- `className` (string) - Additional CSS classes (optional)
- `style` (string) - Inline CSS styles (optional)

## 📝 Usage Examples

### Basic Video
```astro
<VimeoVideo videoId="148751763" />
```

### Custom Styled Video
```astro
<VimeoVideo 
  videoId="148751763"
  color="#ff6b6b"
  title={false}
  byline={false}
  portrait={false}
/>
```

### Autoplay Video (Muted)
```astro
<VimeoVideo 
  videoId="148751763"
  autoplay={true}
  muted={true}
  loop={true}
/>
```

### Custom Aspect Ratio
```astro
<VimeoVideo 
  videoId="148751763"
  aspectRatio="4:3"
/>
```

### Video with Start Time
```astro
<VimeoVideo 
  videoId="148751763"
  startTime={30}
/>
```

### Minimal Controls
```astro
<VimeoVideo 
  videoId="148751763"
  controls={false}
  pip={false}
  title={false}
  byline={false}
  portrait={false}
/>
```

### Custom Styling
```astro
<VimeoVideo 
  videoId="148751763"
  className="custom-video-style"
  style="border: 3px solid #333; border-radius: 12px;"
/>
```

## 🎨 Styling Features

### Built-in Styles
- Responsive wrapper with proper aspect ratios
- Rounded corners (8px border-radius)
- Subtle shadows with dark mode support
- 2rem vertical margins for spacing

### Custom Styling
You can override or extend styles using:
- `className` prop for CSS classes
- `style` prop for inline styles
- CSS targeting `.vimeo-video-container`

### Dark Mode Support
The component automatically adjusts shadows for dark mode using `prefers-color-scheme: dark`.

## 📱 Responsive Design

The component automatically:
- Maintains aspect ratio on all devices
- Uses responsive iframe wrapper
- Handles mobile touch interactions
- Optimizes for different screen sizes

### Aspect Ratio Calculations
- 16:9 = 56.25% padding-bottom
- 4:3 = 75% padding-bottom
- 1:1 = 100% padding-bottom
- 21:9 = 42.86% padding-bottom

## 🔧 Getting Vimeo Video IDs

1. Upload your video to Vimeo
2. Copy the video URL (e.g., `https://vimeo.com/148751763`)
3. Extract the number: `148751763`
4. Use it in the component: `<VimeoVideo videoId="148751763" />`

### Finding Video ID from URL
- `https://vimeo.com/148751763` → `148751763`
- `https://vimeo.com/channels/staffpicks/148751763` → `148751763`
- `https://player.vimeo.com/video/148751763` → `148751763`

## 🌐 Browser Compatibility

### Supported Features
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Picture in Picture (where supported)
- Fullscreen mode
- Autoplay (with muted requirement)

### Autoplay Restrictions
Modern browsers require videos to be muted for autoplay:
```astro
<VimeoVideo 
  videoId="148751763"
  autoplay={true}
  muted={true}  <!-- Required for autoplay -->
/>
```

## ♿ Accessibility

### Built-in Features
- Proper `title` and `aria-label` attributes
- Screen reader support
- Keyboard navigation
- Focus management

### Best Practices
```astro
<VimeoVideo 
  videoId="148751763"
  title="Description of video content for screen readers"
  description="Detailed description of video content"
/>
```

## 🚀 Performance

### Optimization Features
- Lazy loading support (framework ready)
- Intersection Observer for performance
- Minimal JavaScript footprint
- Efficient iframe loading

### Best Practices
- Use appropriate quality settings
- Consider start/end times for long videos
- Use responsive design for mobile optimization

## 🔄 Integration Points

### Where to Use
- **MDC Posts**: Direct component usage in MDX
- **Blog Posts**: Direct component usage in MDX
- **Regular Pages**: Import and use component
- **Events Pages**: Embed videos in event descriptions
- **Any Content**: Available site-wide

### Content Collections
The component works with all Astro content collections:
- `src/content/mdc/` - MDC posts
- `src/content/blog/` - Blog posts
- Any other content collections

## 🛠️ Troubleshooting

### Common Issues

#### Video Not Loading
- Check video ID is correct
- Verify video is public or unlisted
- Check browser console for errors

#### Autoplay Not Working
- Ensure `muted={true}` is set
- Check browser autoplay policies
- Test in different browsers

#### Styling Issues
- Check CSS specificity
- Verify className and style props
- Inspect element for conflicts

#### Responsive Issues
- Ensure `responsive={true}` (default)
- Check aspect ratio settings
- Test on different screen sizes

### Debug Mode
Add console logging to debug issues:
```astro
<VimeoVideo 
  videoId="148751763"
  className="debug-video"
/>
```

## 📚 Resources

### Vimeo Documentation
- [Vimeo Player Parameters](https://developer.vimeo.com/player/sdk/embed)
- [Vimeo API Documentation](https://developer.vimeo.com/api)

### Astro Documentation
- [Astro Components](https://docs.astro.build/en/core-concepts/astro-components/)
- [MDX Integration](https://docs.astro.build/en/guides/mdx/)

### Demo Pages
- `/video-examples` - Live examples of all features
- `/mdc/video-example` - Example MDX post with videos

## 🔄 Updates & Maintenance

### Component Updates
- Monitor Vimeo API changes
- Update component for new features
- Test across different browsers
- Validate accessibility features

### Performance Monitoring
- Monitor video loading times
- Check for broken video links
- Validate responsive behavior
- Test on various devices

---

**Last Updated**: January 2025  
**Component Version**: 1.0  
**Astro Version**: 5.9.0  
**Vimeo API**: Latest 