import React from 'react';
import { ArrowRight, CheckCircle2, Workflow } from 'lucide-react';

export function SolutionIcpEngine() {
  return (
    <div className="min-h-screen bg-nexius-dark-bg text-white">
      <section className="py-20 bg-nexius-dark-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-nexius-teal font-semibold tracking-wide">Solution</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mt-3 tracking-tight">
            ICP → Leads → Warm → Nurture (End-to-End)
          </h1>
          <p className="mt-6 text-lg text-nexius-dark-text-muted leading-relaxed max-w-3xl">
            We build a practical growth engine: define the ICP precisely, generate lead lists, enrich with context, execute warming, then nurture only
            when signals are positive.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-nexius-teal/10 text-nexius-teal">
              10 qualified prospects/day
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/5 text-white/80">
              Non-spam approach
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/5 text-white/80">
              Positive-signal routing
            </span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold tracking-tight">The engine (step-by-step)</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[
              'ICP definition: roles, firmographics, triggers, and exclusions',
              'Lead sourcing: build targeted lists (not massive scraping)',
              'Enrichment: email + LinkedIn + context fields',
              'Warming: credible visibility before outreach',
              'Nurture: value drops + CTAs based on intent signals',
              'Routing: clicks/replies → CRM + next best action',
            ].map((item) => (
              <div key={item} className="flex gap-3 p-4 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
                <CheckCircle2 className="h-5 w-5 text-nexius-teal mt-0.5" />
                <p className="text-nexius-dark-text">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-black/20 rounded-xl border border-nexius-dark-border">
            <div className="flex gap-3 items-start">
              <Workflow className="h-5 w-5 text-nexius-teal mt-1" />
              <div>
                <h3 className="font-semibold">The key rule</h3>
                <p className="mt-2 text-nexius-dark-text-muted">
                  We only escalate to “sales” when the prospect shows intent (click/reply/join/book). Until then, the system warms and nurtures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-nexius-dark-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold tracking-tight">Client reference</h2>
          <p className="mt-3 text-nexius-dark-text-muted">
            Implemented for <span className="text-white font-semibold">Tze Sian Yeo</span> (Independent Financial Advisor).
          </p>

          <div className="mt-6 p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
            <p className="text-lg text-white leading-relaxed">
              “The biggest difference is consistency. The system keeps the pipeline warm every day, and I only step in when someone signals interest.
              It’s a much cleaner way to grow without burning my network.”
            </p>
            <p className="mt-4 text-nexius-dark-text-muted">
              — Tze Sian Yeo (Independent Financial Advisor)
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/downloads/linkedin-growth-playbook-combined.pdf"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-nexius-teal text-nexius-navy font-semibold hover:bg-nexius-teal/90 transition-colors"
            >
              Download the playbook <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/book-assessment"
              className="inline-flex items-center px-6 py-3 rounded-xl border border-nexius-dark-border text-white hover:border-nexius-teal/60 transition-colors"
            >
              Book a consult
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
