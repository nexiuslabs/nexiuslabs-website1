import React, { useEffect, useMemo, useState } from 'react';
import { Download, Loader2, CheckCircle2, Lock, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';

const PLAYBOOK_UNLOCK_KEY = 'nexius_playbook_unlocked_v1';

export function PlaybookLanding() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(PLAYBOOK_UNLOCK_KEY);
    if (stored === '1') {
      setUnlocked(true);
      setSubmitted(true);
    }
  }, []);

  const sections = useMemo(
    () => [
      {
        title: '30 Days — Stabilize the Workflow Backbone',
        points: [
          'Pick one high-friction workflow (invoice-to-cash, lead follow-up, or service handoff).',
          'Define states + owners (Draft → Review → Approved → Done).',
          'Set non-negotiable controls: approvals, audit trail, rollback path.',
          'Baseline 3 KPIs: cycle time, error rate, and human-hours consumed.',
        ],
      },
      {
        title: '60 Days — Layer Agentic Automation Safely',
        points: [
          'Automate repetitive steps first (data capture, routing, reminders, status updates).',
          'Use human-in-the-loop only on financial, compliance, or customer-risk decisions.',
          'Instrument every action (who/what/when) and capture exception reasons.',
          'Build a weekly review cadence to tighten prompts, rules, and escalation thresholds.',
        ],
      },
      {
        title: '90 Days — Scale Across Functions',
        points: [
          'Expand from one workflow to adjacent workflows with shared data contracts.',
          'Consolidate into one operating dashboard for ops, finance, and RevOps.',
          'Introduce role-specific copilots while preserving central governance.',
          'Track margin impact and cashflow improvements, not just activity metrics.',
        ],
      },
      {
        title: 'Operator Checklist (Before You Scale)',
        points: [
          'Single source of truth for each workflow is explicit and enforced.',
          'Exception paths are documented and tested monthly.',
          'Approval rights are mapped to real roles, not generic users.',
          'Runbooks exist for outages, bad inputs, and model drift.',
        ],
      },
    ],
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !name) {
      setError('Please fill in your name and email.');
      return;
    }

    try {
      setLoading(true);
      const { error: dbError } = await supabase
        .from('lead_captures')
        .insert({
          email: email.trim().toLowerCase(),
          name: name.trim(),
          company: company.trim() || null,
          source: 'playbook_web_unlock',
          created_at: new Date().toISOString(),
        });

      if (dbError && dbError.code !== '23505') {
        throw dbError;
      }

      window.localStorage.setItem(PLAYBOOK_UNLOCK_KEY, '1');
      setUnlocked(true);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.open('/downloads/ai-automation-playbook-smes.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-nexius-dark-bg pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-nexius-teal font-semibold mb-3">Free Practical Guide</p>
            <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">
              AI Automation Playbook for SMEs
            </h1>
            <p className="text-nexius-dark-text-muted mb-6 leading-relaxed">
              Hybrid access enabled: unlock the full web playbook now, and optionally download the PDF version.
            </p>
            <img
              src="/images/playbook-preview.svg"
              alt="AI Automation Playbook for SMEs"
              className="rounded-xl border border-nexius-dark-border"
            />
          </div>

          <div className="bg-nexius-dark-surface border border-nexius-dark-border rounded-2xl p-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 text-white mb-1">
                  <Lock className="h-4 w-4 text-nexius-teal" />
                  <h2 className="text-xl font-display font-bold">Unlock Full Web Playbook</h2>
                </div>
                <p className="text-sm text-nexius-dark-text-muted">
                  Enter your details to access the full online version. PDF download is optional after unlock.
                </p>

                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-nexius-dark-card border border-nexius-dark-border rounded-lg text-white placeholder-white/40"
                  required
                />
                <input
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-nexius-dark-card border border-nexius-dark-border rounded-lg text-white placeholder-white/40"
                  required
                />
                <input
                  type="text"
                  placeholder="Company (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-2.5 bg-nexius-dark-card border border-nexius-dark-border rounded-lg text-white placeholder-white/40"
                />

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-nexius-teal text-white py-3 rounded-lg hover:bg-nexius-teal/90 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                  Unlock Web Playbook
                </button>
              </form>
            ) : (
              <div className="text-center py-2">
                <CheckCircle2 className="h-12 w-12 text-nexius-teal mx-auto mb-3" />
                <h3 className="text-white text-lg font-bold mb-2">Access unlocked</h3>
                <p className="text-nexius-dark-text-muted mb-5">You can now read the full playbook online.</p>
                <button
                  onClick={handleDownload}
                  className="w-full bg-nexius-teal text-white py-3 rounded-lg hover:bg-nexius-teal/90 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Optional: Download PDF
                </button>
              </div>
            )}
          </div>
        </div>

        <section className="relative rounded-2xl border border-nexius-dark-border bg-nexius-dark-surface p-6 md:p-8 overflow-hidden">
          {!unlocked && (
            <div className="absolute inset-0 z-20 bg-black/70 backdrop-blur-sm flex items-center justify-center text-center px-6">
              <div>
                <Lock className="h-8 w-8 text-nexius-teal mx-auto mb-3" />
                <h3 className="text-white text-xl font-display font-bold">Content locked</h3>
                <p className="text-white/70 mt-2">Unlock above to read the full web playbook.</p>
              </div>
            </div>
          )}

          <div className={!unlocked ? 'blur-sm select-none pointer-events-none' : ''}>
            <h2 className="text-2xl font-display font-bold text-white mb-2">Playbook (Web Edition)</h2>
            <p className="text-nexius-dark-text-muted mb-6">
              A practical 30/60/90-day rollout system for Agentic ERP/CRM and business automation.
            </p>

            <div className="space-y-6">
              {sections.map((section) => (
                <article key={section.title} className="rounded-xl border border-nexius-dark-border bg-nexius-dark-card p-5">
                  <h3 className="text-lg font-display font-semibold text-white mb-3">{section.title}</h3>
                  <ul className="space-y-2 text-nexius-dark-text-muted">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="text-nexius-teal">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
