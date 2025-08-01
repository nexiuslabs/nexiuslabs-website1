import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Mail, Linkedin, Twitter, MessageCircle, Clock } from 'lucide-react';
import DotGrid from '../components/DotGrid';
import { ContactForm } from '../components/ContactForm';
import { supabase } from '../lib/supabase';

export function AgentPage() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistLoading, setWaitlistLoading] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;

    try {
      setWaitlistLoading(true);

      // Insert into leads table with a specific status for waitlist
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            first_name: 'Waitlist',
            email: waitlistEmail,
            message: 'Nexius Agent Waitlist Signup',
            status: 'waitlist'
          }
        ]);

      if (error) throw error;

      alert('Thank you for joining the waitlist! We\'ll keep you updated on our launch.');
      setWaitlistEmail('');
    } catch (error) {
      console.error('Error submitting waitlist:', error);
      alert('Error joining waitlist. Please try again.');
    } finally {
      setWaitlistLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-nexius-dark-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-nexius-navy to-nexius-navy/95 mt-16">
        <div className="absolute inset-0">
          <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#0F1419"
            activeColor="#00CABA"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="relative text-5xl font-display font-extrabold text-white mb-6 tracking-tight">
              Run your business like the big boys—<br />
              without the big-boy budget.
            </h1>
            <p className="relative text-xl font-body text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Let our AI pull in new leads, follow them up, and keep all the numbers tidy—so you grow while everyone else hires.
            </p>
            <div className="relative flex justify-center gap-4">
              <a
                href="#waitlist"
                className="bg-nexius-teal text-white px-8 py-4 rounded-lg hover:bg-nexius-teal/90 transition-colors flex items-center group font-display font-semibold tracking-wide uppercase text-sm"
              >
                Join the Wait List <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="relative mt-6">
              <p className="text-white/60 text-sm">
                Launching soon • Early users get lifetime discounts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Promise Section */}
      <section className="py-24 bg-nexius-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-6 tracking-tight">
              Growing is great—until the admin kicks in.
            </h2>
            <div className="max-w-3xl mx-auto space-y-4 text-lg text-nexius-dark-text">
              <p>• New inquiries slip through the cracks.</p>
              <p>• Spreadsheets multiply.</p>
              <p>• You think, <em>"Do I need to hire someone?"</em></p>
              <p className="font-semibold text-nexius-teal mt-6">
                We've been there, and we built a smarter way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Helps Section */}
      <section className="py-24 bg-nexius-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-12 tracking-tight">
              Three Quick Wins
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border hover:border-nexius-teal/50 hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-display font-bold text-white mb-4">
                More Leads, Less Chasing
              </h3>
              <p className="text-nexius-dark-text-muted">
                AI finds prospects, drafts polite follow-ups, and nudges you at the right moment.
              </p>
            </div>
            
            <div className="p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border hover:border-nexius-teal/50 hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-display font-bold text-white mb-4">
                Everything in One Place
              </h3>
              <p className="text-nexius-dark-text-muted">
                Contacts, quotes, invoices and notes stay together—no more tab-hunting.
              </p>
            </div>
            
            <div className="p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border hover:border-nexius-teal/50 hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-display font-bold text-white mb-4">
                Hours Back Every Week
              </h3>
              <p className="text-nexius-dark-text-muted">
                Routine tasks run themselves so you can sell, build, or sleep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple 3-Step Flow Section */}
      <section className="py-24 bg-nexius-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-12 tracking-tight">
              Simple 3-Step Flow
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-nexius-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">Connect</h3>
              <p className="text-nexius-dark-text-muted">
                your email & site forms (takes 5 minutes).
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-nexius-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">Turn on</h3>
              <p className="text-nexius-dark-text-muted">
                the lead engine—watch new opportunities drop into your pipeline.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-nexius-teal rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">Grow</h3>
              <p className="text-nexius-dark-text-muted">
                while the system organises and reminds you what's next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-nexius-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <blockquote className="max-w-4xl mx-auto">
              <p className="text-2xl font-body text-white/90 italic mb-6">
                "We doubled monthly sales with the same two-person team. The AI keeps deals moving while we focus on delivery."
              </p>
              <footer className="text-nexius-dark-text-muted">
                <div className="font-semibold text-white">Amanda</div>
                <div>Consultancy Founder</div>
                <div className="text-sm mt-2 italic">(More stories coming soon)</div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Why We're Different Section */}
      <section className="py-24 bg-nexius-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-6 tracking-tight">
              Built on battle-tested, open tech.
            </h2>
            <p className="font-body text-nexius-dark-text max-w-3xl mx-auto leading-relaxed text-lg">
              We start with popular open-source tools—no vendor lock-in—and layer AI on top. That means lower costs for you and freedom to customise later.
            </p>
          </div>
        </div>
      </section>

      {/* Early-Access Perks Section */}
      <section className="py-24 bg-nexius-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-12 tracking-tight">
              Early-Access Perks
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
              <div className="w-16 h-16 bg-nexius-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">
                Lifetime 20% Discount
              </h3>
              <p className="text-nexius-dark-text-muted">
                for wait-listers
              </p>
            </div>
            
            <div className="text-center p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
              <div className="w-16 h-16 bg-nexius-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-nexius-teal" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">
                Private Slack Group
              </h3>
              <p className="text-nexius-dark-text-muted">
                with the founding team
              </p>
            </div>
            
            <div className="text-center p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border">
              <div className="w-16 h-16 bg-nexius-teal/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">
                First Dibs
              </h3>
              <p className="text-nexius-dark-text-muted">
                on new features
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Wait List Section */}
      <section id="waitlist" className="py-24 bg-nexius-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-6 tracking-tight">
            Join the Wait List
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Be among the first to experience Nexius Agent and get exclusive early-access benefits.
          </p>
          
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
            <input
              type="email"
              name="email"
              placeholder="Your best email"
              required
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-nexius-dark-border bg-nexius-dark-card text-nexius-dark-text placeholder-nexius-dark-text-muted focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
            />
            <button
              type="submit"
              disabled={waitlistLoading}
              className="px-6 py-3 rounded-lg bg-nexius-teal text-white font-semibold hover:bg-nexius-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {waitlistLoading ? 'Joining...' : 'Join Wait List'}
            </button>
          </form>
          
          <p className="text-white/60 text-sm">
            No spam—just launch updates and early access.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-nexius-dark-surface text-nexius-dark-text-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <button
              onClick={scrollToTop}
              className="flex items-center text-nexius-dark-text mb-4 group focus:outline-none mx-auto"
            >
              <img
                src="https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images//NexiusLabs_Logo-removebg-preview-removebg-preview.png"
                alt="NEXIUS Labs"
                className="h-6 w-6 object-contain group-hover:opacity-90 transition-opacity"
              />
              <span className="ml-2 text-lg font-bold group-hover:text-nexius-teal transition-colors">NEXIUS Labs</span>
            </button>
            <p className="text-sm mb-6">
              Singapore<br />
              "We build practical AI tools so small teams can punch well above their weight."
            </p>
            
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://www.linkedin.com/company/nexius-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-nexius-dark-text-muted hover:text-nexius-teal transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/nexiuslabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-nexius-dark-text-muted hover:text-nexius-teal transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <button
                onClick={() => setShowContactForm(true)}
                className="text-nexius-dark-text-muted hover:text-nexius-teal transition-colors"
              >
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="border-t border-nexius-dark-border pt-8 text-sm text-center">
            © {new Date().getFullYear()} NEXIUS Labs. All rights reserved.
          </div>
        </div>
      </footer>

      <ContactForm isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  );
}