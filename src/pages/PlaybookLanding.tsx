import React, { useState } from 'react';
import { Download, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function PlaybookLanding() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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
          source: 'playbook_landing_page',
          created_at: new Date().toISOString(),
        });

      if (dbError && dbError.code !== '23505') {
        throw dbError;
      }

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-nexius-teal font-semibold mb-3">Free Practical Guide</p>
            <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">
              AI Automation Playbook for SMEs
            </h1>
            <p className="text-nexius-dark-text-muted mb-6 leading-relaxed">
              Get the exact 30/60/90-day rollout blueprint we use to help SMEs deploy AI across finance, CRM, and operations without expensive replatforming.
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
                <h2 className="text-xl font-display font-bold text-white">Get Instant Access</h2>
                <p className="text-sm text-nexius-dark-text-muted">Enter your details to unlock the download.</p>

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
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                  Unlock Download
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <CheckCircle2 className="h-12 w-12 text-nexius-teal mx-auto mb-3" />
                <h3 className="text-white text-lg font-bold mb-2">You're all set</h3>
                <p className="text-nexius-dark-text-muted mb-5">Your playbook is ready.</p>
                <button
                  onClick={handleDownload}
                  className="w-full bg-nexius-teal text-white py-3 rounded-lg hover:bg-nexius-teal/90 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Playbook PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
