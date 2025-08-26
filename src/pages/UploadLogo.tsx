import React, { useState } from 'react';
import { ImageUpload } from '../components/ImageUpload';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function UploadLogo() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'melverick' | 'darryl'>('melverick');
  const location = useLocation();
  const canonicalUrl = `https://nexiuslabs.com${location.pathname}`;

  const handleUploadComplete = (imageUrl: string) => {
    setLogoUrl(imageUrl);
  };

  return (
    <>
      <Helmet>
        <title>Upload Co-founder Photos | NEXIUS Labs</title>
        <meta
          name="description"
          content="Upload co-founder photos for NEXIUS Labs."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Upload Co-founder Photos | NEXIUS Labs" />
        <meta property="og:description" content="Upload co-founder photos for NEXIUS Labs." />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Upload Co-founder Photos | NEXIUS Labs" />
        <meta name="twitter:description" content="Upload co-founder photos for NEXIUS Labs." />
      </Helmet>
      <div className="min-h-screen bg-nexius-dark-bg py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-nexius-dark-surface rounded-lg shadow-sm p-8 border border-nexius-dark-border">
            <h1 className="text-2xl font-display font-bold text-white mb-6">
              Upload Co-founder Photos
            </h1>
            
            <div className="space-y-6">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setUploadType('melverick')}
                  className={`px-4 py-2 rounded-lg ${
                    uploadType === 'melverick'
                      ? 'bg-nexius-teal text-white'
                      : 'bg-nexius-dark-card text-nexius-dark-text hover:bg-nexius-dark-border'
                  } transition-colors`}
                >
                  Melverick's Photo
                </button>
                <button
                  onClick={() => setUploadType('darryl')}
                  className={`px-4 py-2 rounded-lg ${
                    uploadType === 'darryl'
                      ? 'bg-nexius-teal text-white'
                      : 'bg-nexius-dark-card text-nexius-dark-text hover:bg-nexius-dark-border'
                  } transition-colors`}
                >
                  Darryl's Photo
                </button>
              </div>

              <ImageUpload onUploadComplete={handleUploadComplete} />
              
              {logoUrl && (
                <div className="mt-6">
                 <h2 className="text-lg font-semibold mb-2 text-nexius-dark-text">Preview:</h2>
                 <div className="p-4 bg-nexius-dark-card rounded-lg">
                    <img
                      src={logoUrl}
                      alt={uploadType === 'melverick' ? 'Melverick Ng' : 'Darryl Wong'}
                      className="h-32 w-32 object-cover rounded-full"
                      crossOrigin="anonymous"
                    />
                  </div>
                 <p className="mt-2 text-sm text-nexius-dark-text-muted">
                    Photo uploaded successfully! You can now use this URL in your application:
                  </p>
                 <code className="mt-2 block p-2 bg-nexius-dark-card rounded text-sm font-mono break-all text-nexius-teal">
                    {logoUrl}
                  </code>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}