import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Cpu,
  Database,
  GitBranch,
  Layers,
  LayoutGrid,
  MessageSquare,
  Settings,
  Sparkles,
  Zap,
  Clock,
  ArrowRight,
  CheckCircle,
  Calendar,
  X
} from 'lucide-react';

export function BuildWithAI() {
  const [showRegistration, setShowRegistration] = useState(false);
  
  // Scroll to section when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-nexius-navy to-nexius-navy/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Launch Your SaaS in <span className="text-nexius-teal">Two Weekends</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              A guided, AI‑powered workshop that takes you from idea to deployed MVP—no local setup, no fluff, all browser-based.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowRegistration(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
              >
                Reserve My Seat
              </button>
              <a 
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
              >
                Learn More
              </a>
            </div>
            <p className="mt-4 text-sm text-white/60">25 seats · SGD 799 · Live in Singapore & Online</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4">
              WHY CHOOSE OUR WORKSHOP
            </h2>
            <p className="text-nexius-charcoal max-w-2xl mx-auto">
              Our AI-powered approach helps you build faster while learning practical skills that will benefit your long-term development journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <div className="mb-6">
                <Code className="h-12 w-12 text-nexius-teal" />
              </div>
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                All‑Browser Simplicity
              </h3>
              <p className="text-nexius-charcoal">
                Code, run, and deploy without leaving your browser tab. No local development environment required.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <div className="mb-6">
                <Cpu className="h-12 w-12 text-nexius-teal" />
              </div>
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                AI‑Assisted Velocity
              </h3>
              <p className="text-nexius-charcoal">
                Generate boilerplate, CRUD flows, and UI components with AI, then focus on customizing the last 20% by hand.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <div className="mb-6">
                <MessageSquare className="h-12 w-12 text-nexius-teal" />
              </div>
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                Expert Mentor Support
              </h3>
              <p className="text-nexius-charcoal">
                8 live hours plus mid-week office hours, peer code reviews, and a private community for rapid feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-nexius-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4">
              WORKSHOP TIMELINE
            </h2>
            <p className="text-nexius-charcoal max-w-2xl mx-auto">
              A structured approach to help you build a functional SaaS product in just two weekends.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ol className="relative border-l-4 border-nexius-teal/30 pl-8 space-y-12">
              <li>
                <div className="absolute -left-3 top-0 bg-nexius-teal w-6 h-6 rounded-full"></div>
                <h4 className="text-xl font-semibold text-nexius-navy mb-3">
                  Weekend 1 – Kick‑off & MVP Scaffold (4 hrs)
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-nexius-teal shrink-0 mt-0.5 mr-2" />
                    <span className="text-nexius-charcoal">Idea refinement & scope lock‑in</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-nexius-teal shrink-0 mt-0.5 mr-2" />
                    <span className="text-nexius-charcoal">AI-assisted project setup & scaffolding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-nexius-teal shrink-0 mt-0.5 mr-2" />
                    <span className="text-nexius-charcoal">First CRUD flow implementation</span>
                  </li>
                </ul>
              </li>
              
              <li>
                <div className="absolute -left-3 top-0 bg-nexius-teal w-6 h-6 rounded-full"></div>
                <h4 className="text-xl font-semibold text-nexius-navy mb-3">
                  Mid‑week – Independent Build
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-nexius-teal shrink-0 mt-0.5 mr-2" />
                    <span className="text-nexius-charcoal">Daily micro‑targets to keep momentum</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-nexius-teal shrink-0 mt-0.5 mr-2" />
                    <span className="text-nexius-charcoal">Online office hours for technical questions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-nexius-teal shrink-0 mt-0.5 mr-2" />
                    <span className="text-nexius-charcoal">AI-assisted troubleshooting and code generation</span>
                  </li>
                </ul>
              </li>
              
              <li>
                <div className="absolute -left-3 top-0 bg-nexius-teal w-6 h-6 rounded-full"></div>
                <h4 className="text-xl font-semibold text-nexius-navy mb-3">
                  Weekend 2 – Polish & Deploy (4 hrs)
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-nexius-teal shrink-0 mt-0.5 mr-2" />
                    <span className="text-nexius-charcoal">Live demo & debugging clinic</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-nexius-teal shrink-0 mt-0.5 mr-2" />
                    <span className="text-nexius-charcoal">One-click deployment to production</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-nexius-teal shrink-0 mt-0.5 mr-2" />
                    <span className="text-nexius-charcoal">Launch strategy and next steps planning</span>
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </section>
      
      {/* Instructors */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4">
              MEET YOUR INSTRUCTORS
            </h2>
            <p className="text-nexius-charcoal max-w-2xl mx-auto">
              Learn from experienced professionals with a proven track record in building successful SaaS products.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border border-nexius-gray p-6 hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img 
                  src="https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/darryl-1740396262527.jpeg"
                  alt="Darryl Wong" 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-nexius-navy mb-1">Darryl Wong, CPA (Aust.)</h3>
                  <p className="text-sm text-nexius-charcoal/80 mb-4">Founder, Nexius Labs · AI Development Expert</p>
                  <p className="text-nexius-charcoal">
                    15 yrs in accounting automation, 5 yrs mentoring indie hackers to launch revenue‑ready SaaS products.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-nexius-gray p-6 hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img 
                  src="https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/kate_yap.jpeg"
                  alt="Kate Yap" 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-nexius-navy mb-1">Kate Yap, CA (Singapore)</h3>
                  <p className="text-sm text-nexius-charcoal/80 mb-4">Co‑Founder, Daisy Consultants · Ops Coach</p>
                  <p className="text-nexius-charcoal">
                    Corporate secretary & automation advocate; specialises in lean compliance for early‑stage startups.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-nexius-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>Do I need prior coding experience?</span>
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="text-nexius-charcoal pt-3 group-open:animate-fadeIn">
                  Basic HTML/CSS/JS knowledge helps, but our AI‑guided prompts and live coaching will get you past hurdles quickly. The workshop is designed to be accessible to those with minimal coding experience.
                </p>
              </details>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>What tools are required?</span>
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="text-nexius-charcoal pt-3 group-open:animate-fadeIn">
                  Just a modern browser and free StackBlitz account. Optional GitHub & Netlify accounts for deployment. Everything runs in the browser, so there's no need to install any software locally.
                </p>
              </details>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>Is there a refund policy?</span>
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="text-nexius-charcoal pt-3 group-open:animate-fadeIn">
                  Full refund up to 72 hours before Weekend 1, or transfer to a future cohort. We want to ensure you're fully satisfied with your investment in this workshop.
                </p>
              </details>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>What type of project can I build?</span>
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="text-nexius-charcoal pt-3 group-open:animate-fadeIn">
                  You can build any type of web application with standard CRUD operations. Popular choices include project management tools, booking systems, content management systems, and e-commerce platforms.
                </p>
              </details>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>Will I get ongoing support?</span>
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="text-nexius-charcoal pt-3 group-open:animate-fadeIn">
                  Yes! After the workshop, you'll get 30 days of access to our private community where you can ask questions and get feedback from mentors and peers. We also offer discounted rates for continued mentorship.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-nexius-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Ready to Build Your SaaS?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join our next cohort and go from idea to launched product in just two weekends.
          </p>
          <button
            onClick={() => setShowRegistration(true)}
            className="bg-nexius-teal text-white px-8 py-4 rounded-lg hover:bg-nexius-teal/90 transition-colors inline-flex items-center font-display font-semibold tracking-wide uppercase text-sm"
          >
            Reserve My Seat <Calendar className="ml-2 h-5 w-5" />
          </button>
          <p className="mt-4 text-sm text-white/60">Next cohort starts June 15, 2025</p>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold text-nexius-navy">
                  Register for Build with AI Workshop
                </h2>
                <button
                  onClick={() => setShowRegistration(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                alert('Registration system coming soon! We\'ll notify you when seats are available.');
                setShowRegistration(false);
              }}>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                    placeholder="Enter your company or organization"
                  />
                </div>

                <div>
                  <label htmlFor="projectIdea" className="block text-sm font-medium text-gray-700 mb-1">
                    Brief Description of Your Project Idea
                  </label>
                  <textarea
                    id="projectIdea"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                    placeholder="What kind of SaaS product would you like to build?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-nexius-teal text-white py-3 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
                >
                  Submit Registration
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}