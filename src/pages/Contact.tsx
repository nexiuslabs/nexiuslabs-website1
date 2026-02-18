import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react';

export function Contact() {
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
          <h1 className="text-4xl font-display font-bold text-white">Contact</h1>
          <p className="text-white/80 mt-2">Get in touch — we respond fast.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-nexius-dark-surface border border-nexius-dark-border rounded-2xl p-8">
          <div className="space-y-6 text-nexius-dark-text">
            <p className="text-lg">
              Want to automate RevOps/CRM, finance operations, or back-office workflows with AI agents? Start with a quick
              assessment.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-nexius-dark-bg border border-nexius-dark-border hover:border-nexius-teal transition-colors"
                href="mailto:melverick@nexiuslabs.com"
              >
                <Mail className="h-5 w-5 text-nexius-teal" />
                <span>melverick@nexiuslabs.com</span>
              </a>

              <a
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-nexius-dark-bg border border-nexius-dark-border hover:border-nexius-teal transition-colors"
                href="tel:+6589002130"
              >
                <Phone className="h-5 w-5 text-nexius-teal" />
                <span>+65 8900 2130</span>
              </a>

              <Link
                className="sm:col-span-2 flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-nexius-teal text-white hover:bg-nexius-teal/90 transition-colors font-display font-semibold"
                to="/book-assessment"
              >
                <Calendar className="h-5 w-5" />
                Book a 15-min assessment
              </Link>
            </div>

            <p className="text-sm text-nexius-dark-text-muted">
              Prefer email? Share your current process + what you want automated. We’ll reply with a short plan and an
              estimated time-to-value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
