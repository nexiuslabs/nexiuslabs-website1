import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function CookiePolicy() {
  return (
    <div className="min-h-screen bg-nexius-dark-bg">
      {/* Header */}
      <div className="bg-nexius-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-display font-bold text-white">Cookie Policy</h1>
          <p className="text-white/80 mt-2">Last Updated: 18 Feb 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none text-nexius-dark-text">
          <p>
            This Cookie Policy explains how Nexius Labs uses cookies and similar technologies on our website.
          </p>

          <h2>1. What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help websites remember
            information about your visit.
          </p>

          <h2>2. How we use cookies</h2>
          <ul>
            <li><strong>Essential:</strong> required for basic site functionality.</li>
            <li><strong>Analytics:</strong> helps us understand usage and improve the experience.</li>
            <li><strong>Preference:</strong> remembers your settings and choices.</li>
          </ul>

          <h2>3. Managing cookies</h2>
          <p>
            You can control and delete cookies through your browser settings. Disabling cookies may affect site
            functionality.
          </p>

          <h2>4. Contact</h2>
          <p>
            Questions about cookies? Email{' '}
            <a href="mailto:melverick@nexiuslabs.com">melverick@nexiuslabs.com</a>.
          </p>

          <p className="text-sm text-gray-500">Last updated on 18 Feb 2026.</p>
        </div>
      </div>
    </div>
  );
}
