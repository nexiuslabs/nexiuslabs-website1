import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

const BOOKING_URL = 'https://outlook.office.com/bookwithme/user/1a3b3c1b65044d24b6cddcc6b42c8ecb%40nexiuslabs.com';

export function BookAssessment() {
  return (
    <div className="min-h-screen bg-nexius-dark-bg pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-nexius-teal font-semibold mb-3">Book a Call</p>
        <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">
          Book a 15-Minute AI Automation Assessment
        </h1>
        <p className="text-nexius-dark-text-muted mb-8 max-w-2xl mx-auto">
          In one focused call, we’ll identify your highest-ROI workflow, your 30/60/90-day implementation path, and where agentic ERP/CRM creates immediate leverage.
        </p>

        <img src="/images/booking-preview.svg" alt="Book AI assessment" className="rounded-xl border border-nexius-dark-border mb-8" />

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-nexius-teal text-white px-8 py-4 rounded-lg hover:bg-nexius-teal/90 transition-colors font-semibold"
        >
          <Calendar className="h-5 w-5 mr-2" />
          Open Booking Calendar
          <ArrowRight className="h-5 w-5 ml-2" />
        </a>
      </div>
    </div>
  );
}
