import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  try {
    // Get all content collections
    const tracks = await getCollection('tracks');
    const allEvents = await getCollection('events');
    const allMdcPosts = await getCollection('mdc');
    const allStaticsignalPosts = await getCollection('staticsignal');
    const allAllIsNotLostPosts = await getCollection('allIsNotLost');

    // Filter out posts that start with underscore (private/draft posts)
    const events = allEvents.filter(event => !event.slug.startsWith('_'));
    const mdcPosts = allMdcPosts.filter(post => !post.slug.startsWith('_'));
    const staticsignalPosts = allStaticsignalPosts.filter(post => !post.slug.startsWith('_'));
    const allIsNotLostPosts = allAllIsNotLostPosts.filter(post => !post.slug.startsWith('_'));

    // Static pages with custom priorities and frequencies
    const staticPages = [
      { url: 'https://kdzu.org/', priority: 1.0, changefreq: 'daily' },
      { url: 'https://kdzu.org/about/', priority: 0.9, changefreq: 'monthly' },
      { url: 'https://kdzu.org/events/', priority: 0.9, changefreq: 'weekly' },
      { url: 'https://kdzu.org/tracks-we-love/', priority: 0.9, changefreq: 'weekly' },
      { url: 'https://kdzu.org/mdc/', priority: 0.9, changefreq: 'weekly' },
      { url: 'https://kdzu.org/static/', priority: 0.9, changefreq: 'weekly' },
      { url: 'https://kdzu.org/all-is-not-lost/', priority: 0.9, changefreq: 'weekly' },
      { url: 'https://kdzu.org/basslines/', priority: 0.9, changefreq: 'weekly' },
      { url: 'https://kdzu.org/links/', priority: 0.8, changefreq: 'monthly' },
      { url: 'https://kdzu.org/privacy-policy/', priority: 0.5, changefreq: 'yearly' }
    ];

    // Tracks URLs
    const trackUrls = tracks.map(track => ({
      url: `https://kdzu.org/tracks-we-love/${track.slug}/`,
      lastmod: track.data.pubDate,
      priority: 0.7,
      changefreq: 'monthly'
    }));

    // Events URLs - individual event pages
    const eventUrls = events.map(event => ({
      url: `https://kdzu.org/events/${event.slug}/`,
      lastmod: event.data.pubDate,
      priority: 0.7,
      changefreq: 'monthly'
    }));

    // MDC posts URLs
    const mdcUrls = mdcPosts.map(post => ({
      url: `https://kdzu.org/mdc/${post.slug}/`,
      lastmod: post.data.pubDate,
      priority: 0.7,
      changefreq: 'monthly'
    }));

    // Staticsignal posts URLs
    const staticsignalUrls = staticsignalPosts.map(post => ({
      url: `https://kdzu.org/static/${post.slug}/`,
      lastmod: post.data.pubDate,
      priority: 0.7,
      changefreq: 'monthly'
    }));

    // All Is Not Lost posts URLs
    const allIsNotLostUrls = allIsNotLostPosts.map(post => ({
      url: `https://kdzu.org/all-is-not-lost/${post.slug}/`,
      lastmod: post.data.pubDate,
      priority: 0.7,
      changefreq: 'monthly'
    }));

    // Combine all URLs
    const allUrls = [...staticPages, ...trackUrls, ...eventUrls, ...mdcUrls, ...staticsignalUrls, ...allIsNotLostUrls];

    // Format date to YYYY-MM-DD
    function formatDate(date: Date): string {
      return date.toISOString().split('T')[0];
    }

    // Get current date for pages without lastmod
    const today = formatDate(new Date());

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(({ url, lastmod, priority, changefreq }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod ? formatDate(lastmod) : today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}; 