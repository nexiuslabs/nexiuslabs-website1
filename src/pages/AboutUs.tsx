import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Linkedin, Users, Coffee } from 'lucide-react';

export function AboutUs() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-nexius-dark-bg">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-nexius-navy to-nexius-navy/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
              About Nexius Labs
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Free small teams from busy work so they can chase big ideas.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Our Mission</h2>
          <div className="bg-nexius-dark-surface rounded-xl p-8 border border-nexius-dark-border">
            <p className="text-xl font-display font-bold text-nexius-teal mb-4">
              Free small teams from busy work so they can chase big ideas.
            </p>
            <p className="text-nexius-dark-text-muted">
              We turn today's AI into everyday tools—no data-science degree, no enterprise budget.
            </p>
          </div>
        </section>

        {/* The Backstory */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-6">The Backstory</h2>
          <div className="prose max-w-none text-nexius-dark-text">
            <p>
              Nexius Labs began the same way many of our customers do: one founder, one laptop, too many spreadsheets.
              Weekend scripts to grab leads and reconcile invoices kept us lean; friends asked for copies, then their friends did too.
              Those quick hacks grew into a platform—and a community of founders who'd rather{' '}
              <strong className="text-nexius-teal">sell and ship than push paper.</strong>
            </p>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-6">What Makes Us Different</h2>
          <div className="bg-nexius-dark-surface rounded-xl overflow-hidden border border-nexius-dark-border">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-nexius-dark-border">
                  <td className="p-6 font-semibold text-white">
                    <strong>Applied first.</strong> We're <em>applications</em> people, not AI theorists.
                  </td>
                  <td className="p-6 text-nexius-dark-text-muted">
                    We layer AI on top of proven open-source tools—no lock-in, no surprise bills.
                  </td>
                </tr>
                <tr>
                  <td className="p-6 font-semibold text-white">
                    <strong>Build in public.</strong> Roadmap is public; feedback shapes every sprint.
                  </td>
                  <td className="p-6 text-nexius-dark-text-muted">
                    <strong>Customer-sized.</strong> If we can't automate our own ops, we shouldn't sell automation to you.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* The Crew */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-6">The Crew — Lean & Hands-On</h2>
          <div className="space-y-8">
            <div className="bg-nexius-dark-surface rounded-xl p-8 border border-nexius-dark-border">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-32 flex-shrink-0">
                  <img
                    src="https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/darryl-1740395556131.jpeg"
                    alt="Darryl Wong"
                    className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Darryl Wong – Co-Founder & AI Consultant
                  </h3>
                  <div className="mb-4">
                    <h4 className="font-semibold text-nexius-teal mb-2">Super-power</h4>
                    <p className="text-nexius-dark-text-muted">
                      <strong>Automates messy finances.</strong> Turns spreadsheets and month-end chaos into click-free, AI-driven workflows any SME can afford.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-nexius-teal mb-2">Former life</h4>
                    <p className="text-nexius-dark-text-muted">
                      10 years as CPA-qualified auditor & founder of Daisy Consultants, guiding hundreds of Singapore companies through compliance and growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-nexius-dark-surface rounded-xl p-8 border border-nexius-dark-border">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-32 flex-shrink-0">
                  <img
                    src="https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/darryl-1740396262527.jpeg"
                    alt="Melverick Ng"
                    className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Melverick Ng – Co-Founder & Product Lead
                  </h3>
                  <div className="mb-4">
                    <h4 className="font-semibold text-nexius-teal mb-2">Super-power</h4>
                    <p className="text-nexius-dark-text-muted">
                      <strong>Tames clunky ERP screens.</strong> Blends deep ERP know-how with no-code and AI agents so small teams run like enterprise ops—without the headcount.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-nexius-teal mb-2">Former life</h4>
                    <p className="text-nexius-dark-text-muted">
                      30 years moving companies off legacy systems; investor at Mezza Group, community builder at <strong>AI Ignite</strong>, adjunct mentor on innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <blockquote className="mt-8 bg-nexius-navy rounded-xl p-6 text-center">
            <p className="text-xl text-white/90 italic">
              "We stay tiny on purpose. If a task still needs a human, we haven't automated enough."
            </p>
          </blockquote>
        </section>

        {/* Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Principles We Ship By</h2>
          <div className="space-y-4">
            {[
              'Plain English beats jargon.',
              'Hours saved > features shipped.',
              'Open beats closed. If the community solves it better, we adopt it.',
              'Launch small, improve publicly.',
              'Huat for everyone. Your wins are our best marketing.'
            ].map((principle, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-nexius-dark-surface rounded-lg border border-nexius-dark-border">
                <span className="flex-shrink-0 w-8 h-8 bg-nexius-teal rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </span>
                <p className="text-nexius-dark-text-muted pt-1">{principle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Work With Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Work With Us</h2>
          <div className="bg-nexius-dark-surface rounded-xl p-8 border border-nexius-dark-border">
            <p className="text-nexius-dark-text-muted mb-6">
              <strong className="text-white">Partner, invest or just brainstorm?</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href="mailto:hello@nexiuslabs.com"
                className="inline-flex items-center px-6 py-3 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide text-sm"
              >
                <Mail className="h-5 w-5 mr-2" />
                hello@nexiuslabs.com
              </a>
              <a
                href="https://www.linkedin.com/company/nexiuslabs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-nexius-teal text-nexius-teal rounded-lg hover:bg-nexius-teal/10 transition-colors font-display font-semibold tracking-wide text-sm"
              >
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </a>
            </div>
            <p className="text-nexius-dark-text-muted flex items-center">
              <Coffee className="h-5 w-5 mr-2 text-nexius-teal" />
              We brew a mean kopi and love tough questions.
            </p>
          </div>
        </section>

        {/* Credits & Community */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold text-white mb-6">Credits & Community</h2>
          <div className="bg-nexius-dark-surface rounded-xl p-8 border border-nexius-dark-border">
            <p className="text-nexius-dark-text-muted mb-6">
              We stand on the shoulders of open-source giants—Odoo, Postgres, React, Tailwind, and the makers who keep them alive.
            </p>
            <p className="text-nexius-dark-text-muted">
              Join our Slack to swap tips, share "huat" moments, or vote on features.
            </p>
          </div>
        </section>

        {/* Footer Mini-Tagline */}
        <section className="text-center py-8 border-t border-nexius-dark-border">
          <p className="text-lg font-display font-bold text-nexius-teal mb-2">
            Nexius Labs – running lean since 2025.
          </p>
          <p className="text-nexius-dark-text-muted italic">
            "More customers, less admin."
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-nexius-dark-surface text-nexius-dark-text-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <button
                onClick={scrollToTop}
                className="flex items-center text-nexius-dark-text mb-4 group focus:outline-none"
              >
                <img
                  src="https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/m04h4fs8wns-1739784195705.png"
                  alt="NEXIUS Labs"
                  className="h-6 w-6 object-contain group-hover:opacity-90 transition-opacity"
                />
                <span className="ml-2 text-lg font-bold group-hover:text-nexius-teal transition-colors">NEXIUS Labs</span>
              </button>
              <p className="text-sm">
                Empower Your Business With AI-Driven Automation
              </p>
            </div>
            <div>
              <h3 className="text-nexius-dark-text font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-nexius-dark-text font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/aboutus" className="hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-nexius-dark-text font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-nexius-dark-border mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} NEXIUS Labs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}