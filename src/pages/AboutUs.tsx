import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Workflow,
  Shield,
  LineChart,
  Users,
  Rocket,
  Calendar,
} from 'lucide-react';

const principles = [
  {
    title: 'Ship real workflow automation',
    desc: 'We build systems that run inside your business day-to-day — not prototypes that die after a demo.',
    icon: Rocket,
  },
  {
    title: 'Systems-first, then AI',
    desc: 'Process + data flow + controls first. Then agents can execute reliably across CRM, finance, and ops.',
    icon: Workflow,
  },
  {
    title: 'Governance & safety by default',
    desc: 'Human-in-the-loop, audit trails, staged rollout, and least-privilege access — so AI helps without surprises.',
    icon: Shield,
  },
  {
    title: 'Measurable outcomes',
    desc: 'Time saved, SLA improvements, faster collections, higher conversion — we define the metric before we build.',
    icon: LineChart,
  },
];

export function AboutUs() {
  return (
    <div className="min-h-screen bg-nexius-dark-bg">
      {/* Hero (layout inspired by the Dribbble reference: clean, spacious, preview-first) */}
      <div className="bg-nexius-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <Link
            to="/"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>

          <div className="mt-8 grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                <Sparkles className="h-4 w-4 text-nexius-teal" />
                About Nexius Labs
              </div>

              <h1 className="mt-5 text-4xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                We help SMEs run RevOps, finance, and ops{' '}
                <span className="text-nexius-teal">on autopilot</span> — with controls.
              </h1>

              <p className="mt-5 text-white/80 leading-relaxed max-w-xl">
                Nexius Labs Pte Ltd builds practical AI business automation for small businesses and SMEs in Singapore.
                We design and deploy agentic ERP/CRM workflows that reduce manual admin, improve handoffs, and create
                consistent execution.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/book-assessment"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-nexius-teal text-white hover:bg-nexius-teal/90 transition-colors font-display font-semibold"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book a 15-min assessment
                </Link>
                <Link
                  to="/case-studies"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-white/15 text-white/90 hover:text-white hover:border-white/30 transition-colors"
                >
                  View case studies
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-white font-display text-2xl">Agentic</div>
                  <div className="text-white/70 text-sm">ERP &amp; CRM execution</div>
                </div>
                <div>
                  <div className="text-white font-display text-2xl">Finance</div>
                  <div className="text-white/70 text-sm">Automation &amp; controls</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-white font-display text-2xl">Ops</div>
                  <div className="text-white/70 text-sm">Workflow orchestration</div>
                </div>
              </div>
            </div>

            {/* Big preview panel */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-transparent p-6">
                <div className="rounded-2xl bg-nexius-dark-surface border border-nexius-dark-border overflow-hidden">
                  <div className="p-5 border-b border-nexius-dark-border flex items-center justify-between">
                    <div>
                      <div className="text-nexius-dark-text font-display font-semibold">What we build</div>
                      <div className="text-nexius-dark-text-muted text-sm">Agentic Business OS for SMEs</div>
                    </div>
                    <div className="text-xs text-nexius-dark-text-muted bg-nexius-dark-bg border border-nexius-dark-border rounded-full px-3 py-1">
                      Live-in-business
                    </div>
                  </div>

                  {/* “mock UI” preview */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-nexius-dark-bg border border-nexius-dark-border p-4">
                        <div className="text-xs text-nexius-dark-text-muted">RevOps</div>
                        <div className="mt-2 text-nexius-dark-text font-display font-semibold">CRM Touchpoints</div>
                        <div className="mt-2 text-sm text-nexius-dark-text-muted">
                          Autolog activities, summarize calls, route next steps.
                        </div>
                      </div>
                      <div className="rounded-xl bg-nexius-dark-bg border border-nexius-dark-border p-4">
                        <div className="text-xs text-nexius-dark-text-muted">Finance</div>
                        <div className="mt-2 text-nexius-dark-text font-display font-semibold">Collections</div>
                        <div className="mt-2 text-sm text-nexius-dark-text-muted">
                          Invoice follow-ups, alerts, and cashflow visibility.
                        </div>
                      </div>
                      <div className="rounded-xl bg-nexius-dark-bg border border-nexius-dark-border p-4">
                        <div className="text-xs text-nexius-dark-text-muted">Ops</div>
                        <div className="mt-2 text-nexius-dark-text font-display font-semibold">Handoffs</div>
                        <div className="mt-2 text-sm text-nexius-dark-text-muted">
                          Reduce dropped balls across teams and tools.
                        </div>
                      </div>
                      <div className="rounded-xl bg-nexius-dark-bg border border-nexius-dark-border p-4">
                        <div className="text-xs text-nexius-dark-text-muted">Governance</div>
                        <div className="mt-2 text-nexius-dark-text font-display font-semibold">Controls</div>
                        <div className="mt-2 text-sm text-nexius-dark-text-muted">
                          Approvals, audit logs, and safe automation.
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl bg-gradient-to-r from-nexius-teal/15 to-transparent border border-nexius-dark-border p-4">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-nexius-teal mt-0.5" />
                        <div>
                          <div className="text-nexius-dark-text font-display font-semibold">Designed for SMEs</div>
                          <div className="text-sm text-nexius-dark-text-muted mt-1">
                            Practical automation that fits real constraints: lean teams, messy data, fast cycles.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Principles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
            Our approach
          </h2>
          <p className="mt-3 text-nexius-dark-text-muted leading-relaxed">
            Agentic systems only work when they’re grounded in process, data, and governance. This is the operating
            discipline we bring to every build.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl bg-nexius-dark-surface border border-nexius-dark-border p-6"
            >
              <p.icon className="h-6 w-6 text-nexius-teal" />
              <div className="mt-4 text-white font-display font-semibold">{p.title}</div>
              <div className="mt-2 text-sm text-nexius-dark-text-muted leading-relaxed">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-transparent p-8 md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
                Want to see where automation will pay back first?
              </h3>
              <p className="mt-3 text-white/80 leading-relaxed">
                We’ll map 1–2 workflows, identify quick wins, and outline a safe rollout plan for agentic ERP/CRM and
                finance automation.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/book-assessment"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-nexius-teal text-white hover:bg-nexius-teal/90 transition-colors font-display font-semibold"
              >
                Book a 15-min assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
