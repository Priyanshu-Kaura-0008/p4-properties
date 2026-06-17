import { Helmet } from 'react-helmet-async';
import { absoluteUrl, defaultSeo, realEstateAgentSchema } from '../utils/seo';

export default function SEO({
  title = defaultSeo.title,
  description = defaultSeo.description,
  keywords = defaultSeo.keywords,
  image = defaultSeo.image,
  canonical = '/',
  type = 'website',
  structuredData = [],
}) {
  const canonicalUrl = absoluteUrl(canonical);
  const imageUrl = absoluteUrl(image);
  const schemas = [realEstateAgentSchema, ...structuredData].filter(Boolean);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="P4 Properties" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
