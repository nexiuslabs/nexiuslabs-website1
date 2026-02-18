import React from 'react';
import { ArrowRight, CheckCircle2, Shield } from 'lucide-react';

export function SolutionDaisyAccounting() {
  return (
    <div className="min-h-screen bg-nexius-dark-bg text-white">
      <section className="py-20 bg-nexius-dark-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-nexius-teal font-semibold tracking-wide">Solution</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mt-3 tracking-tight">
            90% Hands-Off Accounting with AI Agents
          </h1>
          <p className="mt-6 text-lg text-nexius-dark-text-muted leading-relaxed max-w-3xl">
            DAISY Accounting uses agentic automation to handle the heavy lifting in bookkeeping and accounting—so the team can
            scale capacity, improve turnaround time, and deliver a better client experience.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-nexius-teal/10 text-nexius-teal">
              Up to ~90% hands-off
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/5 text-white/80">
              Human-in-the-loop controls
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/5 text-white/80">
              Audit trail + approvals
            </span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
            <h2 className="text-xl font-semibold">The outcome</h2>
            <p className="mt-3 text-nexius-dark-text-muted">
              A reliable accounting workflow where AI agents do 90% of the repetitive work, and humans review only exceptions.
            </p>
          </div>
          <div className="p-6 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
            <h2 className="text-xl font-semibold">Why it matters</h2>
            <p className="mt-3 text-nexius-dark-text-muted">
              More capacity without proportional headcount—better client experience, better retention, and more bandwidth to win new clients.
            </p>
          </div>
          <div className="p-6 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
            <h2 className="text-xl font-semibold">How it stays safe</h2>
            <p className="mt-3 text-nexius-dark-text-muted">
              Controlled agent boundaries, approval gates, and end-to-end logging so the team can trust the system.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-nexius-dark-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold tracking-tight">What the AI agents handle</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[
              'Capture and classify source documents (invoices, receipts, statements)',
              'Extract and normalize data fields consistently',
              'Categorize transactions based on policy + history',
              'Reconciliation assistance and exception surfacing',
              'Month-end preparation packs with summaries',
              'Human review only for exceptions / low-confidence items',
            ].map((item) => (
              <div key={item} className="flex gap-3 p-4 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
                <CheckCircle2 className="h-5 w-5 text-nexius-teal mt-0.5" />
                <p className="text-nexius-dark-text">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-black/20 rounded-xl border border-nexius-dark-border">
            <div className="flex gap-3 items-start">
              <Shield className="h-5 w-5 text-nexius-teal mt-1" />
              <div>
                <h3 className="font-semibold">Controls & governance</h3>
                <p className="mt-2 text-nexius-dark-text-muted">
                  We design the workflow so agents operate within strict boundaries (what they can read, write, and approve). The result is speed with
                  a clear audit trail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold tracking-tight">Testimonial (draft)</h2>
          <div className="mt-6 p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
            <p className="text-lg text-white leading-relaxed">
              “We went from being constrained by manual bookkeeping throughput to a workflow where AI handles the repetitive work end-to-end.
              Our team now focuses on review, client communication, and growth.”
            </p>
            <p className="mt-4 text-nexius-dark-text-muted">
              — Kate Yap (DAISY Accounting)
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/book-assessment"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-nexius-teal text-nexius-navy font-semibold hover:bg-nexius-teal/90 transition-colors"
            >
              Book a consult <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 rounded-xl border border-nexius-dark-border text-white hover:border-nexius-teal/60 transition-colors"
            >
              Back to homepage
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
