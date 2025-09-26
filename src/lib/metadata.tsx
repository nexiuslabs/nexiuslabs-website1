import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface MetaTags {
  title: string;
  description: string;
  image?: string;
  url?: string;
  keywords?: string[];
  type?: string;
}

export const defaultMeta: MetaTags = {
  title: 'NEXIUS Labs | AI-Powered Executive Intelligence Platform',
  description:
    'Nexius Labs specializes in AI-powered business automation, process optimization, and no-code solutions to help businesses scale efficiently.',
  image:
    'https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/nexius_logo_no_text_transparent_bg.png',
  url: 'https://nexiuslabs.com/',
  keywords: [
    'AI automation',
    'business process automation',
    'executive intelligence platform',
    'AI consulting services',
    'workflow automation',
    'NEXIUS Labs'
  ],
  type: 'website'
};

export const metaByRoute: Record<string, MetaTags> = {
  '/': defaultMeta,
  '/aboutus': {
    ...defaultMeta,
    title: 'About Us | NEXIUS Labs',
    description:
      'Discover the Nexius Labs team, our mission, and how we help companies deploy AI automation with confidence.',
    url: 'https://nexiuslabs.com/aboutus',
    keywords: [
      'NEXIUS Labs team',
      'AI experts',
      'AI automation consultants',
      'Singapore AI company'
    ]
  },
  '/case-studies': {
    ...defaultMeta,
    title: 'Case Studies | NEXIUS Labs',
    description:
      'Explore real-world AI and automation case studies showing how Nexius Labs improves efficiency and scales operations.',
    url: 'https://nexiuslabs.com/case-studies',
    keywords: [
      'AI case studies',
      'automation success stories',
      'digital transformation examples',
      'NEXIUS Labs results'
    ]
  },
  '/blog': {
    ...defaultMeta,
    title: 'Blog | NEXIUS Labs',
    description:
      'Read the latest insights on AI automation, process optimization, and executive intelligence from the Nexius Labs team.',
    url: 'https://nexiuslabs.com/blog',
    keywords: [
      'AI automation insights',
      'business automation blog',
      'digital transformation tips',
      'NEXIUS Labs news'
    ]
  },
  '/events': {
    ...defaultMeta,
    title: 'Events | NEXIUS Labs',
    description:
      'Join upcoming Nexius Labs workshops, webinars, and events focused on AI adoption and intelligent automation strategies.',
    url: 'https://nexiuslabs.com/events',
    keywords: [
      'AI events',
      'automation workshops',
      'business webinars',
      'NEXIUS Labs community'
    ]
  },
  '/agent': {
    ...defaultMeta,
    title: 'AI Agent Automation Solutions | NEXIUS Labs',
    description:
      'See how the Nexius Labs AI Agent automates operations, coordinates teams, and streamlines business workflows.',
    url: 'https://nexiuslabs.com/agent',
    keywords: [
      'AI agent',
      'autonomous business agent',
      'operations automation',
      'AI workflow assistant'
    ]
  },
  '/ai-ignite': {
    ...defaultMeta,
    title: 'AI Ignite Community | NEXIUS Labs',
    description:
      'Connect with the Nexius Labs AI Ignite community to learn, collaborate, and build automation solutions together.',
    url: 'https://nexiuslabs.com/ai-ignite',
    keywords: [
      'AI community',
      'automation community',
      'AI ignite',
      'NEXIUS Labs academy'
    ]
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
  const canonicalUrl = meta.url || window.location.href;
  const mergedKeywords = meta.keywords ?? defaultMeta.keywords;
  const ogType = meta.type || defaultMeta.type || 'website';
  const tags: { name?: string; property?: string; content: string }[] = [
    { name: 'description', content: meta.description },
    { name: 'robots', content: 'index, follow' },
    ...(mergedKeywords?.length
      ? [{ name: 'keywords', content: mergedKeywords.join(', ') }]
      : []),
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:image', content: meta.image || defaultMeta.image! },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:type', content: ogType },
    { property: 'og:site_name', content: 'NEXIUS Labs' },
    { property: 'og:locale', content: 'en_US' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: meta.image || defaultMeta.image! },
    { name: 'twitter:url', content: canonicalUrl },
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

  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);
}

export function updateStructuredData(id: string, data: Record<string, unknown> | Record<string, unknown>[] | null) {
  const existingScript = document.getElementById(id) as HTMLScriptElement | null;

  if (!data) {
    if (existingScript) {
      existingScript.remove();
    }
    return;
  }

  const script = existingScript ?? document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(data);

  if (!existingScript) {
    document.head.appendChild(script);
  }
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NEXIUS Labs',
  url: defaultMeta.url,
  logo: defaultMeta.image,
  description: defaultMeta.description,
  sameAs: ['https://www.linkedin.com/company/nexiuslabs'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hello@nexiuslabs.com',
      areaServed: 'Global',
      availableLanguage: ['English']
    }
  ]
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'NEXIUS Labs',
  url: defaultMeta.url,
  description: defaultMeta.description,
  inLanguage: 'en',
  publisher: {
    '@type': 'Organization',
    name: 'NEXIUS Labs',
    url: defaultMeta.url
  }
};

export function MetadataManager() {
  const location = useLocation();

  useEffect(() => {
    const meta = metaByRoute[location.pathname] || defaultMeta;
    updateMetaTags(meta);
    updateStructuredData('site-structured-data', [organizationSchema, websiteSchema]);
  }, [location.pathname]);

  return null;
}

