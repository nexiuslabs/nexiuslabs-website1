import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsOfService() {
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
          <h1 className="text-4xl font-display font-bold text-white">Terms of Service</h1>
          <p className="text-white/80 mt-2">Last Updated: 18 Feb 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none text-nexius-dark-text">
          <p>
            These Terms of Service ("Terms") govern your use of the Nexius Labs website (the "Site"). By accessing or
            using the Site, you agree to be bound by these Terms.
          </p>

          <h2>1. Use of the Site</h2>
          <p>
            You agree to use the Site only for lawful purposes and in a way that does not infringe the rights of, restrict
            or inhibit anyone else’s use and enjoyment of the Site.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            All content on this Site, including text, graphics, logos, and software, is owned by or licensed to Nexius
            Labs unless otherwise stated.
          </p>

          <h2>3. Disclaimers</h2>
          <p>
            The Site is provided on an “as is” and “as available” basis. We do not warrant that the Site will be
            uninterrupted, error-free, or free of harmful components.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Nexius Labs shall not be liable for any indirect, incidental, special
            or consequential damages arising from your use of the Site.
          </p>

          <h2>5. Links to Third Parties</h2>
          <p>
            The Site may contain links to third-party websites. We are not responsible for the content or practices of
            third-party websites.
          </p>

          <h2>6. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. The latest version will be posted on this page with an updated
            “Last Updated” date.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions about these Terms? Email{' '}
            <a href="mailto:melverick@nexiuslabs.com">melverick@nexiuslabs.com</a>.
          </p>

          <p className="text-sm text-gray-500">Last updated on 18 Feb 2026.</p>
        </div>
      </div>
    </div>
  );
}
