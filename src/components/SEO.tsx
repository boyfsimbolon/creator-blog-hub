
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOData } from '../types';

interface SEOProps extends SEOData {
  children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = 'https://via.placeholder.com/1200x630/6366f1/ffffff?text=Portfolio',
  url = 'https://boyfsimbolon.netlify.app',
  type = 'website',
  publishedTime,
  modifiedTime,
  children
}) => {
  const fullTitle = title.includes('|') ? title : `${title} | Portofolio & Blog`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Portofolio & Blog Pribadi" />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* instagram */}
      <meta name="instagram:card" content="summary_large_image" />
      <meta name="instagram:title" content={fullTitle} />
      <meta name="instagram:description" content={description} />
      <meta name="instagram:image" content={image} />
      <meta name="instagram:site" content="@boysmbln" />
      <meta name="instagram:creator" content="@boysmbln" />

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Boy Full Simbolon" />
      <meta name="theme-color" content="#6366f1" />

      {children}
    </Helmet>
  );
};

export default SEO;
