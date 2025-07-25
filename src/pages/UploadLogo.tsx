```typescript
import React, { useState } from 'react';
import { ImageUpload } from '../components/ImageUpload';

export function UploadLogo() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'melverick' | 'darryl'>('melverick');

  const handleUploadComplete = (imageUrl: string) => {
    setLogoUrl(imageUrl);
  };

  return (
    <div className="min-h-screen bg-background py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-surface rounded-lg shadow-sm p-8">
            <h1 className="text-2xl font-display font-bold text-text mb-6">
              Upload Co-founder Photos
            </h1>
            
            <div className="space-y-6">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setUploadType('melverick')}
                  className={`px-4 py-2 rounded-lg ${
                    uploadType === 'melverick'
                      ? 'bg-primary text-white'
                      : 'bg-surface text-text hover:bg-surface'
                  } transition-colors`}
                >
                  Melverick's Photo
                </button>
                <button
                  onClick={() => setUploadType('darryl')}
                  className={`px-4 py-2 rounded-lg ${
                    uploadType === 'darryl'
                      ? 'bg-primary text-white'
                      : 'bg-surface text-text hover:bg-surface'
                  } transition-colors`}
                >
                  Darryl's Photo
                </button>
              </div>

              <ImageUpload onUploadComplete={handleUploadComplete} />
              
              {logoUrl && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2 text-text">Preview:</h2>
                  <div className="p-4 bg-background rounded-lg">
                    <img
                      src={logoUrl}
                      alt={uploadType === 'melverick' ? 'Melverick Ng' : 'Darryl Wong'}
                      className="h-32 w-32 object-cover rounded-full"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    Photo uploaded successfully! You can now use this URL in your application:
                  </p>
                  <code className="mt-2 block p-2 bg-background rounded text-sm font-mono break-all text-text">
                    {logoUrl}
                  </code>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```