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
  
  // Inject Luma registration widget once the component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.lu.ma/loader.js"; // Luma universal loader
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);
  
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
      <section className="relative pt-32 pb-24 bg-gradient-to-br from-indigo-50 via-white to-violet-50 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-indigo-600 mb-6 tracking-tight animate-fade-in-up">
              Launch Your SaaS in <span className="text-violet-600">Two Weekends</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up-delay-1">
              A guided, AI‑powered workshop using <strong>Bolt.new</strong> that takes you from idea to deployed MVP—no local setup, no fluff, all browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-2">
              {/* Luma registration button */}
              <div
                data-luma-action="checkout"
                data-luma-slug="weekend-saas-bolt"
                data-luma-mode="button"
                className="inline-block"
              >
                <button className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-colors font-display font-semibold tracking-wide text-lg shadow-xl hover:shadow-2xl">
                  Reserve My Seat
                </button>
              </div>
              <a 
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-indigo-600 text-indigo-600 rounded-2xl hover:bg-indigo-50 transition-colors font-display font-semibold tracking-wide text-lg"
              >
                Learn More
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500 animate-fade-in-up-delay-3">25 seats · SGD 799 · Live in Singapore & Online</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4">
              WHY CHOOSE OUR WORKSHOP
            </h2>
            <p className="text-nexius-charcoal max-w-2xl mx-auto">
              Our AI-powered approach using Bolt.new helps you build faster while learning practical skills that will benefit your long-term development journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 group">
              <div className="mb-6">
                <Code className="h-12 w-12 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-nexius-navy mb-3">
                All‑Browser Simplicity
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Bolt.new WebContainers compile instantly—code, run, deploy without leaving your tab.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 group">
              <div className="mb-6">
                <Cpu className="h-12 w-12 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-nexius-navy mb-3">
                AI‑Assisted Velocity
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate boilerplate, CRUD flows and tests with smart prompts, then polish the last 20% by hand.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 group">
              <div className="mb-6">
                <MessageSquare className="h-12 w-12 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-nexius-navy mb-3">
                Mentor Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                8 live hours + mid‑week office hours, peer code reviews, and a private Discord for rapid feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-indigo-700 mb-4">
              COURSE TIMELINE
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              A structured approach to help you build a functional SaaS product in just two weekends.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ol className="relative border-l-4 border-indigo-300 pl-8 space-y-12">
              <li>
                <div className="absolute -left-3 top-0 bg-indigo-600 w-6 h-6 rounded-full"></div>
                <h4 className="text-xl font-semibold text-indigo-800 mb-3">
                  Weekend 1 – Kick‑off & MVP Scaffold (4 hrs)
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700">Idea refinement & scope lock‑in</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700">Bolt.new deep‑dive & project generation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700">First CRUD flow live</span>
                  </li>
                </ul>
              </li>
              
              <li>
                <div className="absolute -left-3 top-0 bg-indigo-600 w-6 h-6 rounded-full"></div>
                <h4 className="text-xl font-semibold text-indigo-800 mb-3">
                  Mid‑week – Independent Build
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700">Daily micro‑targets to keep momentum</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700">Office hours for technical questions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700">Peer reviews and Discord support</span>
                  </li>
                </ul>
              </li>
              
              <li>
                <div className="absolute -left-3 top-0 bg-indigo-600 w-6 h-6 rounded-full"></div>
                <h4 className="text-xl font-semibold text-indigo-800 mb-3">
                  Weekend 2 – Polish & Deploy (4 hrs)
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700">Live demo & debug clinic</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700">Netlify one‑click deploy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5 mr-2" />
                    <span className="text-gray-700">Pitch prep & next steps</span>
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </section>
      
      {/* Instructors */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4">
              MEET YOUR INSTRUCTORS
            </h2>
            <p className="text-nexius-charcoal max-w-2xl mx-auto">
              Learn from experienced professionals with a proven track record in building successful SaaS products.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img 
                  src="https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/darryl-1740396262527.jpeg"
                  alt="Darryl Wong" 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-nexius-navy mb-1">Darryl Wong, CPA (Aust.)</h3>
                  <p className="text-sm text-indigo-600 mb-4">Founder & AI Consultant, Nexius Labs</p>
                  <p className="text-gray-600 leading-relaxed">
                    CPA‑turned‑automation architect empowering SMEs with AI solutions; host of SG Real Network and lead mentor for Code with AI cohorts.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img 
                  src="https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images//Melverick%20portrait.jpeg"
                  alt="Melverick Ng" 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-nexius-navy mb-1">Melverick Ng</h3>
                  <p className="text-sm text-indigo-600 mb-4">Co‑Founder & AI Strategist, Nexius Labs</p>
                  <p className="text-gray-600 leading-relaxed">
                    Helps businesses 10× growth by layering agentic AI on workflows; speaker & coach on AI adoption; co‑organiser of 'Code with AI' hackathons.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-violet-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-violet-700 mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>Do I need prior coding experience?</span>
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="text-gray-600 pt-3 group-open:animate-fadeIn">
                  Basic HTML/CSS/JS knowledge helps, but our AI‑guided prompts and live coaching will get you past hurdles quickly.
                </p>
              </details>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>What tools are required?</span>
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="text-gray-600 pt-3 group-open:animate-fadeIn">
                  Just a modern browser and free StackBlitz account. Optional GitHub & Netlify accounts for deployment.
                </p>
              </details>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>Is there a refund policy?</span>
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="text-gray-600 pt-3 group-open:animate-fadeIn">
                  Full refund up to 72 hours before Weekend 1, or transfer to a future cohort.
                </p>
              </details>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>What type of project can I build?</span>
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="text-gray-600 pt-3 group-open:animate-fadeIn">
                  You can build any type of web application with standard CRUD operations. Popular choices include project management tools, booking systems, content management systems, and e-commerce platforms.
                </p>
              </details>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>Will I get ongoing support?</span>
                  <span className="transition group-open:rotate-180">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </summary>
                <p className="text-gray-600 pt-3 group-open:animate-fadeIn">
                  Yes! After the workshop, you'll get 30 days of access to our private Discord where you can ask questions and get feedback from mentors and peers.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 bg-gray-900 text-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-semibold text-white mb-4">
            Ready to build your SaaS?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our next cohort and go from idea to launched product in just two weekends.
          </p>
          {/* Luma registration button */}
          <div
            data-luma-action="checkout"
            data-luma-slug="weekend-saas-bolt"
            data-luma-mode="button"
            className="inline-block mb-4"
          >
            <button className="bg-violet-600 text-white px-8 py-3 rounded-2xl hover:bg-violet-700 transition-colors font-display font-semibold tracking-wide text-sm">
              Join the Cohort Now
            </button>
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Nexius Labs. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}