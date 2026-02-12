import React, { useState, useRef, MouseEvent } from 'react';
import { X, Download, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PlaybookCaptureProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlaybookCapture({ isOpen, onClose }: PlaybookCaptureProps) {
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

      // Store lead in Supabase
      const { error: dbError } = await supabase
        .from('lead_captures')
        .insert({
          email: email.trim().toLowerCase(),
          name: name.trim(),
          company: company.trim() || null,
          source: 'playbook_download',
          created_at: new Date().toISOString(),
        });

      if (dbError) {
        // If duplicate email, still allow download
        if (dbError.code === '23505') {
          setSubmitted(true);
          return;
        }
        throw dbError;
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Error capturing lead:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.open('/downloads/ai-automation-playbook-smes.pdf', '_blank');
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setEmail('');
      setName('');
      setCompany('');
    }, 1000);
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-nexius-dark-surface border border-nexius-dark-border rounded-2xl w-full max-w-md relative overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-nexius-teal/20 to-nexius-navy p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="text-3xl mb-2">📘</div>
          <h3 className="text-xl font-display font-bold text-white">
            AI Automation Playbook for SMEs
          </h3>
          <p className="text-white/60 text-sm mt-1">
            5 workflows you can automate this week — no coding required.
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Name <span className="text-nexius-teal">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 bg-nexius-dark-card border border-nexius-dark-border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-nexius-teal transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Work Email <span className="text-nexius-teal">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-2.5 bg-nexius-dark-card border border-nexius-dark-border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-nexius-teal transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Company <span className="text-white/40">(optional)</span>
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your company"
                  className="w-full px-4 py-2.5 bg-nexius-dark-card border border-nexius-dark-border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-nexius-teal transition-colors"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-nexius-teal text-white py-3 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Get Free Playbook
                  </>
                )}
              </button>

              <p className="text-white/40 text-xs text-center">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="h-12 w-12 text-nexius-teal mx-auto mb-3" />
              <h4 className="text-lg font-bold text-white mb-2">You're in! 🎉</h4>
              <p className="text-white/60 text-sm mb-4">
                Your playbook is ready to download.
              </p>
              <button
                onClick={handleDownload}
                className="w-full bg-nexius-teal text-white py-3 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Playbook (PDF)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
