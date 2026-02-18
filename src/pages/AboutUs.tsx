import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function AboutUs() {
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
          <h1 className="text-4xl font-display font-bold text-white">About Nexius Labs</h1>
          <p className="text-white/80 mt-2">AI Business Automation for SMEs — built to ship, not slide decks.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none text-nexius-dark-text">
          <p>
            <strong>Nexius Labs Pte Ltd</strong> helps small businesses and SMEs in Singapore automate revenue operations,
            finance, and core workflows using practical AI — including agentic ERP &amp; CRM systems.
          </p>

          <h2>What we do</h2>
          <ul>
            <li>Design and deploy AI workflow automation across sales, ops, support, and finance</li>
            <li>Build agentic ERP/CRM capabilities that integrate into your existing tools</li>
            <li>Deliver training, workshops, and implementation sprints that produce working outcomes</li>
          </ul>

          <h2>How we work</h2>
          <ul>
            <li><strong>Outcome-first:</strong> define a measurable business result (time saved, SLA, cashflow visibility).</li>
            <li><strong>System-first:</strong> we map the process and data flow before adding AI.</li>
            <li><strong>Safety-first:</strong> human-in-the-loop controls, audit trails, and staged rollout.</li>
          </ul>

          <h2>Contact</h2>
          <p>
            If you want to explore automation opportunities in your business, start with a short assessment.
          </p>
          <p>
            <Link to="/book-assessment">Book a 15-min assessment</Link> or email{' '}
            <a href="mailto:melverick@nexiuslabs.com">melverick@nexiuslabs.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
