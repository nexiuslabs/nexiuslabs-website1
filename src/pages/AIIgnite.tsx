import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  Target,
  Users,
  BarChart,
  UserPlus,
  Monitor,
  Lightbulb,
  Users2,
  GraduationCap,
  Book,
  Link as LinkIcon,
  Building2,
  School,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ContactForm } from '../components/ContactForm';
import { FeatureCard } from '../components/FeatureCard';

export function AIIgnite() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-nexius-navy to-nexius-navy/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            AI Ignite – Fueling Growth<br />for Forward-Thinking<br />Leaders
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Join a premier event series connecting business leaders with AI innovators to drive 
            real-world impact and competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#collaborate"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#FF6B2C] text-white rounded-lg hover:bg-[#FF6B2C]/90 transition-colors font-display font-semibold tracking-wide text-sm uppercase"
            >
              Collaboration Opportunities
            </a>
            <button
              onClick={() => setShowContactForm(true)}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-display font-semibold tracking-wide text-sm uppercase"
            >
              Contact Us
            </button>
          </div>
          <div className="mt-8 text-white/60 text-sm">
            Powered by Nexius Labs
          </div>
        </div>
      </section>

      {/* Why Collaborate Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-nexius-navy text-center mb-6">
            Objectives of AI Ignite
          </h2>
          <p className="text-center text-nexius-charcoal mb-16 max-w-3xl mx-auto">
            We're on a mission to bridge the gap between AI innovation and business results, creating a
            community where technology and strategy converge.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <Book className="h-12 w-12 text-nexius-teal mb-6" />
              <h3 className="text-xl font-bold text-nexius-navy mb-4">
                Educate & Empower Business Leaders
              </h3>
              <ul className="space-y-4 text-nexius-charcoal">
                <li>• Provide executives and entrepreneurs with actionable insights on AI implementation.</li>
                <li>• Showcase real-world use cases and success stories that demonstrate AI's business value.</li>
                <li>• Offer hands-on opportunities to assess AI solutions and their ROI potential.</li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <LinkIcon className="h-12 w-12 text-nexius-teal mb-6" />
              <h3 className="text-xl font-bold text-nexius-navy mb-4">
                Connect AI Innovators with High-Growth Enterprises
              </h3>
              <ul className="space-y-4 text-nexius-charcoal">
                <li>• Facilitate structured networking between AI vendors, service providers, and decision-makers.</li>
                <li>• Create opportunities for AI startups and established solution providers to present live demos and case studies.</li>
                <li>• Encourage partnerships and pilot projects between businesses and AI solution providers.</li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <Users2 className="h-12 w-12 text-nexius-teal mb-6" />
              <h3 className="text-xl font-bold text-nexius-navy mb-4">
                Foster a Community of AI-Driven Business Transformation
              </h3>
              <ul className="space-y-4 text-nexius-charcoal">
                <li>• Build an ongoing knowledge-sharing ecosystem through content, discussions, and follow-ups.</li>
                <li>• Maintain an exclusive network where businesses can stay updated on AI trends, tools, and best practices.</li>
                <li>• Encourage long-term collaborations and strategic alliances among attendees.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-nexius-navy text-center mb-6">
            Why Collaborate with AI Ignite?
          </h2>
          <p className="text-center text-nexius-charcoal mb-16 max-w-3xl mx-auto">
            We welcome collaborations that align with our mission of driving AI-powered business growth.
            Join us to make AI Ignite a catalyst for real-world AI implementation!
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <Target className="h-12 w-12 text-nexius-teal mb-4" />
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                Access a High-Intent Audience
              </h3>
              <p className="text-nexius-charcoal">
                Engage with business leaders actively seeking AI adoption strategies.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <Lightbulb className="h-12 w-12 text-nexius-teal mb-4" />
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                Showcase Thought Leadership
              </h3>
              <p className="text-nexius-charcoal">
                Position your brand or expertise as a trusted AI transformation partner.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <BarChart className="h-12 w-12 text-nexius-teal mb-4" />
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                Generate Meaningful Business Leads
              </h3>
              <p className="text-nexius-charcoal">
                Connect directly with decision-makers in a structured, results-driven setting.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <Users className="h-12 w-12 text-nexius-teal mb-4" />
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                Long-Term Engagement
              </h3>
              <p className="text-nexius-charcoal">
                Become part of a growing network that extends beyond a single event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Collaborate Section */}
      <section id="collaborate" className="py-24 bg-nexius-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-nexius-navy text-center mb-6">
            Ways to Collaborate with AI Ignite
          </h2>
          <p className="text-center text-nexius-charcoal mb-16 max-w-3xl mx-auto">
            Join our ecosystem of AI innovation and business transformation. We offer multiple ways to
            engage, share expertise, and connect with decision-makers.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard />

            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              {/* Header */}
              <div className="bg-nexius-navy px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <Lightbulb className="h-10 w-10 text-white/80" />
                  <span className="text-2xl font-bold">2</span>
                </div>

                <h3 className="mt-4 text-2xl font-bold leading-snug">
                  Expert Panels & Thought Leadership
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  Ideal for: AI strategists, consultants, industry experts, innovation leaders
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <ul className="list-disc list-inside space-y-2 text-gray-800 mb-4">
                  <li>Contribute to discussions on AI adoption and industry trends</li>
                  <li>Share case studies and success frameworks</li>
                  <li>Position yourself as a trusted advisor for business leaders</li>
                </ul>
                <Link
                  to="#"
                  className="inline-flex items-center font-medium text-nexius-teal hover:text-nexius-teal/80"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              {/* Header */}
              <div className="bg-[#FF6B2C] px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <Building2 className="h-10 w-10 text-white/80" />
                  <span className="text-2xl font-bold">3</span>
                </div>

                <h3 className="mt-4 text-2xl font-bold leading-snug">
                  Strategic Partnerships & Sponsorships
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  Ideal for: Enterprise AI firms, accelerators, business associations, consultants
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <ul className="list-disc list-inside space-y-2 text-gray-800 mb-4">
                  <li>Gain brand visibility among top decision-makers investing in AI</li>
                  <li>Sponsor exclusive networking lounges or breakout sessions</li>
                  <li>Co-create industry-specific AI adoption playbooks</li>
                </ul>
                <Link
                  to="#"
                  className="inline-flex items-center font-medium text-nexius-teal hover:text-nexius-teal/80"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              {/* Header */}
              <div className="bg-[#FF4D79] px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <School className="h-10 w-10 text-white/80" />
                  <span className="text-2xl font-bold">4</span>
                </div>

                <h3 className="mt-4 text-2xl font-bold leading-snug">
                  Community & Educational Initiatives
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  Ideal for: Universities, incubators, AI advocacy groups, associations
                </p>
              </div>

              {/* Body */}
              <div className="px-6 py-5">
                <ul className="list-disc list-inside space-y-2 text-gray-800 mb-4">
                  <li>Co-host workshops or webinars for our executive community</li>
                  <li>Provide industry research or exclusive insights</li>
                  <li>Support outreach by inviting leaders and students to participate</li>
                </ul>
                <Link
                  to="#"
                  className="inline-flex items-center font-medium text-nexius-teal hover:text-nexius-teal/80"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-nexius-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Contact Information
              </h2>
              <div className="mb-8">
                <h3 className="text-[#FF6B2C] font-medium mb-2">Email</h3>
                <a href="mailto:darryl@nexiuslabs.com" className="text-white hover:text-white/80">
                  darryl@nexiuslabs.com
                </a>
              </div>
              <div>
                <h3 className="text-[#FF6B2C] font-medium mb-2">Connect With Us</h3>
                <p className="text-white/80 mb-4">
                  Interested in becoming a speaker, sponsor, or exhibitor at our next AI Ignite event? We'd love to discuss how we can collaborate!
                </p>
              </div>
              <div className="mt-12 pt-12 border-t border-white/10">
                <p className="text-white/60">
                  Powered by <Link to="/" className="text-nexius-teal hover:text-nexius-teal/80">Nexius Labs</Link> - 
                  Accelerating business transformation through AI innovation.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8">
              <h3 className="text-2xl font-display font-bold text-nexius-navy mb-6">
                Get in Touch
              </h3>
              <p className="text-nexius-charcoal mb-8">
                For partnership opportunities or event collaboration inquiries, please reach out to us. Let's create impactful AI events together!
              </p>
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const firstName = formData.get('firstName')?.toString() || '';
                const lastName = formData.get('lastName')?.toString() || '';
                const email = formData.get('email')?.toString() || '';
                const company = formData.get('company')?.toString() || '';
                const message = formData.get('message')?.toString() || '';

                if (!firstName || !email || !company) {
                  alert('Please fill in all required fields');
                  return;
                }
                
                try {
                  const { error } = await supabase
                    .from('ignite_form')
                    .insert({
                      first_name: firstName,
                      last_name: lastName,
                      email: email,
                      company: company,
                      message: message,
                      remarks: '',
                      status: 'new'
                    });

                  if (error) throw error;

                  alert('Thank you for your interest! We will be in touch shortly.');
                  form.reset();
                } catch (error) {
                  console.error('Error submitting form:', error);
                  alert('Error submitting form. Please try again.');
                }
              }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How would you like to collaborate?
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-nexius-teal text-white py-3 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <ContactForm isOpen={showContactForm} onClose={() => setShowContactForm(false)} />

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center text-white mb-4 group focus:outline-none"
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
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            © {new Date().getFullYear()} NEXIUS Labs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}