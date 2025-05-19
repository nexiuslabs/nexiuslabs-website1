import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, ArrowRight } from 'lucide-react';

export function FeatureCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      {/* ——— HEADER ——— */}
      <div className="bg-[#00CABA] px-6 py-5 text-white">
        <div className="flex items-center justify-between">
          <Monitor className="h-10 w-10 text-white/80" />
          <span className="text-2xl font-bold">1</span>
        </div>

        <h3 className="mt-4 text-2xl font-bold leading-snug">
          AI Solution Showcases & Product Demos
        </h3>
        <p className="mt-1 text-sm text-white/70">
          Ideal for: AI vendors, technology firms, startups, software providers
        </p>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <ul className="list-disc list-inside space-y-2 text-gray-800 mb-4">
          <li>Present your AI-powered solution to engaged business leaders</li>
          <li>Participate in lightning demo rounds with Q&A</li>
          <li>Offer exclusive event-only pilot programs or packages</li>
        </ul>
        <Link
          to="#"
          className="inline-flex items-center font-medium text-nexius-teal hover:text-nexius-teal/80"
        >
          Learn more
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}