import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Send,
  MessageSquare,
  Linkedin,
  Globe,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-nexius-dark-bg">
      {/* Banner (layout inspired by the provided reference) */}
      <div className="bg-nexius-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-nexius-teal/20 via-white/5 to-transparent px-6 py-10 md:px-10 md:py-12">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/80 bg-white/5 border border-white/10 rounded-full px-3 py-1">
              <MessageSquare className="h-4 w-4 text-nexius-teal" />
              Write to us
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              Get in touch
            </h1>
            <p className="mt-2 text-white/80 max-w-2xl leading-relaxed">
              Tell us what you want to automate. We’ll respond with a short plan and the fastest path to measurable
              outcomes.
            </p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-nexius-dark-surface border border-nexius-dark-border p-6 md:p-8">
              <h2 className="text-2xl font-display font-bold text-white">Let’s talk</h2>
              <p className="mt-2 text-nexius-dark-text-muted">
                Use the enquiry form, or jump straight to a 15‑min assessment.
              </p>

              <form
                className="mt-6 space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();

                  if (!consent) return;

                  try {
                    setLoading(true);
                    const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
                    const companyHint = message.trim() || null;

                    const { error } = await supabase
                      .from('lead_captures')
                      .insert({
                        email: email.trim().toLowerCase(),
                        name: fullName || 'Website Contact',
                        company: companyHint,
                        source: 'contact_page',
                        created_at: new Date().toISOString(),
                      });

                    if (error) throw error;

                    alert('Thank you — your enquiry has been submitted. We will get back to you shortly.');
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setMessage('');
                    setConsent(false);
                  } catch (err) {
                    console.error('Error submitting contact form:', err);
                    alert('Error submitting form. Please try again or contact us directly.');
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-nexius-dark-text-muted">First name</label>
                    <input
                      className="mt-2 w-full rounded-lg bg-nexius-dark-bg border border-nexius-dark-border px-4 py-3 text-nexius-dark-text outline-none focus:border-nexius-teal"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Your first name"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-nexius-dark-text-muted">Last name</label>
                    <input
                      className="mt-2 w-full rounded-lg bg-nexius-dark-bg border border-nexius-dark-border px-4 py-3 text-nexius-dark-text outline-none focus:border-nexius-teal"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Your last name"
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-nexius-dark-text-muted">Email</label>
                  <input
                    className="mt-2 w-full rounded-lg bg-nexius-dark-bg border border-nexius-dark-border px-4 py-3 text-nexius-dark-text outline-none focus:border-nexius-teal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    type="email"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-nexius-dark-text-muted">Message</label>
                  <textarea
                    className="mt-2 w-full min-h-[140px] rounded-lg bg-nexius-dark-bg border border-nexius-dark-border px-4 py-3 text-nexius-dark-text outline-none focus:border-nexius-teal"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you want to automate (RevOps/CRM, finance, ops) and what outcome matters."
                    required
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-nexius-dark-border bg-nexius-dark-bg"
                  />
                  <label htmlFor="consent" className="text-sm text-nexius-dark-text-muted leading-relaxed">
                    I consent to Nexius Labs contacting me about this enquiry. Read our{' '}
                    <Link to="/privacy" className="text-nexius-teal hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={!consent || loading}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-nexius-teal text-white hover:bg-nexius-teal/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-display font-semibold"
                  >
                    <Send className="h-5 w-5" />
                    {loading ? 'Submitting…' : 'Send enquiry'}
                  </button>

                  <Link
                    to="/book-assessment"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-nexius-dark-border text-white/90 hover:text-white hover:border-white/20 transition-colors"
                  >
                    <Calendar className="h-5 w-5" />
                    Book a 15‑min assessment
                  </Link>
                </div>

                <p className="text-xs text-nexius-dark-text-muted">
                  No spam. If you share your current tool stack + one workflow, we’ll reply with a concrete next step.
                </p>
              </form>
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-transparent p-6 md:p-8">
              <div className="rounded-2xl bg-nexius-dark-surface border border-nexius-dark-border overflow-hidden">
                {/* Illustration block (no external stock image; use a branded placeholder) */}
                <div className="p-6 bg-gradient-to-r from-nexius-teal/15 to-transparent border-b border-nexius-dark-border">
                  <div className="text-white font-display font-semibold">Quick contact</div>
                  <div className="text-sm text-white/75 mt-1">
                    Fastest way to start: a short assessment call.
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <a
                    className="flex items-center gap-3 rounded-xl bg-nexius-dark-bg border border-nexius-dark-border px-4 py-3 hover:border-nexius-teal transition-colors"
                    href="mailto:melverick@nexiuslabs.com"
                  >
                    <Mail className="h-5 w-5 text-nexius-teal" />
                    <div>
                      <div className="text-sm text-nexius-dark-text-muted">Email</div>
                      <div className="text-nexius-dark-text">melverick@nexiuslabs.com</div>
                    </div>
                  </a>

                  <a
                    className="flex items-center gap-3 rounded-xl bg-nexius-dark-bg border border-nexius-dark-border px-4 py-3 hover:border-nexius-teal transition-colors"
                    href="tel:+6589002130"
                  >
                    <Phone className="h-5 w-5 text-nexius-teal" />
                    <div>
                      <div className="text-sm text-nexius-dark-text-muted">Phone</div>
                      <div className="text-nexius-dark-text">+65 8900 2130</div>
                    </div>
                  </a>

                  <Link
                    className="flex items-center justify-center gap-2 rounded-xl bg-nexius-teal text-white px-4 py-3 hover:bg-nexius-teal/90 transition-colors font-display font-semibold"
                    to="/book-assessment"
                  >
                    <Calendar className="h-5 w-5" />
                    Book a 15‑min assessment
                  </Link>

                  <div className="pt-2">
                    <div className="text-nexius-dark-text font-display font-semibold">Follow</div>
                    <div className="mt-3 flex items-center gap-3">
                      <a
                        className="h-10 w-10 rounded-lg bg-nexius-dark-bg border border-nexius-dark-border flex items-center justify-center hover:border-nexius-teal transition-colors"
                        href="https://www.nexiuslabs.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Website"
                      >
                        <Globe className="h-5 w-5 text-nexius-teal" />
                      </a>
                      <a
                        className="h-10 w-10 rounded-lg bg-nexius-dark-bg border border-nexius-dark-border flex items-center justify-center hover:border-nexius-teal transition-colors"
                        href="https://linkedin.com/company/nexius-labs"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 text-nexius-teal" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
