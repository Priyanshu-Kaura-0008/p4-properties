import { writeFile } from 'node:fs/promises';

const siteUrl = (process.env.P4_SITE_URL || process.env.VITE_SITE_URL || 'https://p4properties.in').replace(/\/$/, '');
const apiBaseUrl = (process.env.P4_API_BASE_URL || 'https://p4-properties.onrender.com/api').replace(/\/$/, '');

const staticRoutes = [
  ['/', '1.0'],
  ['/properties', '0.9'],
  ['/properties/chandigarh', '0.9'],
  ['/properties/mohali', '0.9'],
  ['/properties/panchkula', '0.9'],
  ['/properties/new-chandigarh', '0.9'],
  ['/about', '0.8'],
  ['/services', '0.8'],
  ['/contact', '0.8'],
  ['/site-visit', '0.8'],
  ['/blogs', '0.8'],
  ['/locations/chandigarh', '0.8'],
  ['/locations/mohali', '0.8'],
  ['/locations/panchkula', '0.8'],
  ['/locations/kharar', '0.7'],
  ['/locations/kurali', '0.7'],
  ['/locations/panchkula-extension', '0.8'],
  ['/locations/new-chandigarh', '0.8'],
  ['/locations/rajpura', '0.7'],
];

const fetchItems = async (path) => {
  const response = await fetch(`${apiBaseUrl}${path}`);
  if (!response.ok) return [];
  const payload = await response.json();
  return payload.data || [];
};

const urlNode = ([path, priority]) =>
  `  <url><loc>${siteUrl}${path}</loc><priority>${priority}</priority></url>`;

const main = async () => {
  const [properties, blogs] = await Promise.all([
    fetchItems('/properties?limit=100'),
    fetchItems('/blogs?limit=100'),
  ]);

  const dynamicRoutes = [
    ...properties.filter((property) => property.slug).map((property) => [`/properties/${property.slug}`, '0.8']),
    ...blogs.filter((blog) => blog.slug).map((blog) => [`/blogs/${blog.slug}`, '0.7']),
  ];

  const routes = [...staticRoutes, ...dynamicRoutes];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map(urlNode)
    .join('\n')}\n</urlset>\n`;

  await writeFile('public/sitemap.xml', xml, 'utf8');
  console.log(`Generated sitemap.xml with ${routes.length} URLs.`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
