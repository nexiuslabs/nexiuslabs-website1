import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';

const PLAYBOOK_UNLOCK_KEY = 'nexius_playbook_unlocked_v2';

export function PlaybookLanding() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(PLAYBOOK_UNLOCK_KEY);
    if (stored === '1') setUnlocked(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your work email to unlock the playbook.');
      return;
    }

    try {
      setLoading(true);

      const normalizedEmail = email.trim().toLowerCase();
      const fallbackName = normalizedEmail.split('@')[0] || 'Playbook Reader';

      const { error: dbError } = await supabase
        .from('lead_captures')
        .insert({
          email: normalizedEmail,
          name: fallbackName,
          company: null,
          source: 'playbook_full_web_unlock',
          created_at: new Date().toISOString(),
        });

      if (dbError && dbError.code !== '23505') throw dbError;

      window.localStorage.setItem(PLAYBOOK_UNLOCK_KEY, '1');
      setUnlocked(true);
    } catch (err) {
      console.error(err);
      setError('Unable to unlock right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nexius-dark-bg pt-24 pb-6">
      <div className={unlocked ? 'w-full px-0' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {!unlocked ? (
          <div className="max-w-xl mx-auto bg-nexius-dark-surface border border-nexius-dark-border rounded-2xl p-6 md:p-8 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-nexius-teal/20 text-nexius-teal mb-4">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white">Unlock Full Playbook (11 pages, 8 chapters)</h1>
            <p className="mt-3 text-nexius-dark-text-muted">
              Enter your email to access the complete web version of the AI Automation Playbook for SMEs.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
              <div>
                <label className="block text-sm text-nexius-dark-text-muted mb-1">Work Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full px-4 py-3 bg-nexius-dark-card border border-nexius-dark-border rounded-lg text-white placeholder-white/40"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-nexius-teal text-white py-3 rounded-lg hover:bg-nexius-teal/90 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                {loading ? 'Unlocking...' : 'Unlock Full Playbook'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="mx-3 md:mx-4 bg-nexius-dark-surface border border-nexius-dark-border rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-white font-display font-semibold">AI Automation Playbook for SMEs</h2>
                <p className="text-sm text-nexius-dark-text-muted">Full web edition unlocked (8 chapters, 11 pages)</p>
              </div>
            </div>

            <div className="mx-0 md:mx-4 rounded-none md:rounded-xl overflow-hidden border-y md:border border-nexius-dark-border bg-white">
              <iframe
                src="/playbook-full.html"
                title="AI Automation Playbook Full Web Version"
                className="w-full"
                style={{ height: 'calc(100vh - 165px)' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
