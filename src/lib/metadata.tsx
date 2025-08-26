import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface MetaTags {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const defaultMeta: MetaTags = {
  title: 'NEXIUS Labs | AI-Powered Executive Intelligence Platform',
  description:
    'Nexius Labs specializes in AI-powered business automation, process optimization, and no-code solutions to help businesses scale efficiently.',
  image:
    'https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/nexius_logo_no_text_transparent_bg.png',
  url: 'https://nexiuslabs.com/',
};

export const metaByRoute: Record<string, MetaTags> = {
  '/': defaultMeta,
  '/aboutus': {
    ...defaultMeta,
    title: 'About Us | NEXIUS Labs',
    url: 'https://nexiuslabs.com/aboutus',
  },
  '/case-studies': {
    ...defaultMeta,
    title: 'Case Studies | NEXIUS Labs',
    url: 'https://nexiuslabs.com/case-studies',
  },
  '/blog': {
    ...defaultMeta,
    title: 'Blog | NEXIUS Labs',
    url: 'https://nexiuslabs.com/blog',
  },
  '/events': {
    ...defaultMeta,
    title: 'Events | NEXIUS Labs',
    url: 'https://nexiuslabs.com/events',
  },
  '/privacy': {
    ...defaultMeta,
    title: 'Privacy Policy | NEXIUS Labs',
    url: 'https://nexiuslabs.com/privacy',
  },
  '/terms': {
    ...defaultMeta,
    title: 'Terms of Service | NEXIUS Labs',
    url: 'https://nexiuslabs.com/terms',
  },
};

export function updateMetaTags(meta: MetaTags) {
  document.title = meta.title;
  const tags: { name?: string; property?: string; content: string }[] = [
    { name: 'description', content: meta.description },
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:image', content: meta.image || defaultMeta.image! },
    { property: 'og:url', content: meta.url || window.location.href },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: meta.image || defaultMeta.image! },
    { name: 'twitter:url', content: meta.url || window.location.href },
  ];

  tags.forEach(({ name, property, content }) => {
    let element: HTMLMetaElement | null = null;
    if (name) {
      element = document.querySelector(`meta[name="${name}"]`);
    } else if (property) {
      element = document.querySelector(`meta[property="${property}"]`);
    }
    if (!element) {
      element = document.createElement('meta');
      if (name) {
        element.setAttribute('name', name);
      } else if (property) {
        element.setAttribute('property', property);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  });
}

export function MetadataManager() {
  const location = useLocation();

  useEffect(() => {
    const meta = metaByRoute[location.pathname] || defaultMeta;
    updateMetaTags(meta);
  }, [location.pathname]);

  return null;
}

