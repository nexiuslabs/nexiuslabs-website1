import React from 'react';
import { ArrowRight, CheckCircle2, Database, Shield } from 'lucide-react';

export function SolutionCrmTouchpoints() {
  return (
    <div className="min-h-screen bg-nexius-dark-bg text-white">
      <section className="py-20 bg-nexius-dark-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-nexius-teal font-semibold tracking-wide">Solution</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold mt-3 tracking-tight">
            CRM Touchpoints Auto-Recording
          </h1>
          <p className="mt-6 text-lg text-nexius-dark-text-muted leading-relaxed max-w-3xl">
            Stop losing relationship context. We built an agentic CRM touchpoint recorder that captures interactions across channels and turns them into
            structured, searchable CRM memory.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-nexius-teal/10 text-nexius-teal">
              No lost context
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/5 text-white/80">
              Multi-channel
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/5 text-white/80">
              Auto-timestamps + notes
            </span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
              <h2 className="text-xl font-semibold">The problem</h2>
              <p className="mt-3 text-nexius-dark-text-muted">
                Follow-ups fail because the context lives in people’s heads, chat threads, and inboxes. Pipeline hygiene becomes a weekly scramble.
              </p>
            </div>
            <div className="p-6 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
              <h2 className="text-xl font-semibold">The fix</h2>
              <p className="mt-3 text-nexius-dark-text-muted">
                Every meaningful interaction becomes a CRM touchpoint automatically—captured with timestamps, channel, and a clean summary.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-display font-bold tracking-tight mt-14">What gets recorded</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[
              'Inbound + outbound emails (thread-safe summaries)',
              'WhatsApp / chat interactions (where appropriate)',
              'LinkedIn outreach touchpoints (by signal)',
              'Clicks / positive signals (via webhook capture)',
              'Meeting notes + next steps',
              'Lifecycle stage changes (when triggered)',
            ].map((item) => (
              <div key={item} className="flex gap-3 p-4 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
                <CheckCircle2 className="h-5 w-5 text-nexius-teal mt-0.5" />
                <p className="text-nexius-dark-text">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-black/20 rounded-xl border border-nexius-dark-border">
            <div className="flex gap-3 items-start">
              <Database className="h-5 w-5 text-nexius-teal mt-1" />
              <div>
                <h3 className="font-semibold">Designed for "operators"</h3>
                <p className="mt-2 text-nexius-dark-text-muted">
                  The goal is not more CRM fields. The goal is reliable memory: what happened, when it happened, and what the next best action is.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 bg-black/20 rounded-xl border border-nexius-dark-border">
            <div className="flex gap-3 items-start">
              <Shield className="h-5 w-5 text-nexius-teal mt-1" />
              <div>
                <h3 className="font-semibold">Privacy + safety guardrails</h3>
                <p className="mt-2 text-nexius-dark-text-muted">
                  Touchpoint capture is configured by policy (what we log, what we don’t). We prioritize consent, minimal retention, and auditability.
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
            Implemented for <span className="text-white font-semibold">Ouch Pte Ltd</span>.
          </p>

          <div className="mt-6 p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
            <p className="text-lg text-white leading-relaxed">
              “We used to rely on manual updates and memory. Now our touchpoints are captured consistently, so follow-ups are smoother and we don’t lose context
              when the pace picks up.”
            </p>
            <p className="mt-4 text-nexius-dark-text-muted">
              — Hui Fang Lee, Founder (Ouch Pte Ltd)
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/featured/crm-playbook"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-nexius-teal text-nexius-navy font-semibold hover:bg-nexius-teal/90 transition-colors"
            >
              View the playbook <ArrowRight className="ml-2 h-4 w-4" />
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
