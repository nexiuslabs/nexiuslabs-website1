import React, { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import RotatingText from './components/RotatingText';
import { AssessmentForm } from './components/AssessmentForm';
import {
  Menu,
  X as XIcon,
  BarChart3,
  Shield,
  Workflow,
  ArrowRight,
  Loader2,
  Brain,
  Zap,
  DollarSign,
  Rocket,
  LineChart,
  Users,
  UserCheck,
  Trophy,
  Bot,
  Clock,
  TrendingUp,
  ShoppingCart,
  FileText,
  Settings,
  Database,
  Lightbulb,
  MessageCircle,
} from 'lucide-react';
import { HeroAnimation } from './components/HeroAnimation';
import { CaseStudy } from './pages/CaseStudy';
import { CaseStudies } from './pages/CaseStudies';
import { UploadLogo } from './pages/UploadLogo';
import { AdminPage } from './pages/AdminPage';
import { EventDetail } from './pages/EventDetail';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { LinksPage } from './pages/LinksPage';
import { AIIgnite } from './pages/AIIgnite';
import { BuildWithAI } from './pages/BuildWithAI';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Events } from './pages/Events';
import { NotFound } from './pages/NotFound';
import { Chat } from './components/Chat';

const workflowCards = [
  {
    title: 'AI Sales Assistant',
    description: 'Captures inbound leads, tracks status and nudges you to follow up.',
    icon: UserCheck,
  },
  {
    title: 'Smart Billing',
    description: 'Generates invoices, matches payments and updates your books automatically.',
    icon: FileText,
  },
  {
    title: 'Ops Organizer',
    description: 'Logs activities, creates simple reports and keeps everyone aligned.',
    icon: Settings,
  },
];

const benefitsList = [
  {
    title: 'More revenue',
    description: 'Fewer lost leads and faster follow‑ups.',
  },
  {
    title: 'Lower cost',
    description: 'Replace multiple subscriptions and delay the next hire.',
  },
  {
    title: 'Time back',
    description: '20+ hours a month saved on repetitive admin.',
  },
  {
    title: 'Clarity',
    description: 'Real‑time view of sales and cash without spreadsheet gymnastics.',
  },
  {
    title: 'Future‑proof',
    description: 'Clean data and structured processes for deeper automation later.',
  },
];

const caseStudiesSummary = [
  {
    title: 'Consulting Firm',
    description: 'Automating follow‑ups increased monthly closed deals by 30%.',
    icon: TrendingUp,
    metric: '30% more deals',
  },
  {
    title: 'E‑Commerce Shop',
    description: 'Smart Billing removed manual reconciliation—20 hours/month saved.',
    icon: Clock,
    metric: '20 hours saved',
  },
  {
    title: 'Seasonal Retailer',
    description: 'Managed holiday surge with same headcount.',
    icon: Users,
    metric: 'Same team size',
  },
];

const testimonials = [
  {
    quote: "We were juggling five different apps and still missing follow‑ups. Bringing everything into one place saved us dozens of hours and let us avoid hiring an extra admin.",
    author: "Vincent Sim",
    title: "Operations Director",
    company: "Serial Company",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    quote: "Our finance team used to spend late nights reconciling invoices. Now it's automatic—about 20 hours a month back and lower software spend.",
    author: "Kate Yap",
    title: "CFO",
    company: "Daisy Accounting",
    image: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images//kate_yap.jpeg",
  },
  {
    quote: "Sales jumped and the workload didn't. The system handles follow‑ups and reporting so we scaled through peak season with the same headcount.",
    author: "Michael Zhang",
    title: "CEO",
    company: "GreenCart",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
  },
];

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link 
            to="/"
            className="flex items-center focus:outline-none group"
          >
            <img
              src="https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/m04h4fs8wns-1739784195705.png"
              alt="NEXIUS Labs"
              className="h-8 w-8 object-contain group-hover:opacity-90 transition-opacity"
            />
            <span className="ml-3 text-xl font-display font-extrabold text-nexius-navy tracking-tight uppercase group-hover:text-nexius-teal transition-colors">NEXIUS Labs</span>
          </Link>
          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="hidden md:flex items-center space-x-8 relative">
            <a href="/#services" className="font-body font-medium text-nexius-charcoal hover:text-nexius-navy transition-colors">Services</a>
            <a href="/#benefits" className="font-body font-medium text-nexius-charcoal hover:text-nexius-navy transition-colors">Benefits</a>
            <Link to="/blog" className="font-body font-medium text-nexius-charcoal hover:text-nexius-navy transition-colors">Blog</Link>
            <Link to="/case-studies" className="font-body font-medium text-nexius-charcoal hover:text-nexius-navy transition-colors">Case Studies</Link>
            <Link to="/events" className="font-body font-medium text-nexius-charcoal hover:text-nexius-navy transition-colors">Events</Link>
            <Link to="/ai-ignite" className="font-body font-medium text-nexius-charcoal hover:text-nexius-navy transition-colors">AI-Ignite</Link>
            <Link to="/build-with-ai" className="font-body font-medium text-nexius-charcoal hover:text-nexius-navy transition-colors">Build with AI</Link>
            <a 
              href="#assessment"
              className="bg-nexius-teal text-white px-4 py-2 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
            >
              Let's Talk
            </a>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
            <a 
              href="/#services" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-charcoal hover:text-nexius-navy hover:bg-gray-50"
            >
              Services
            </a>
            <a 
              href="/#benefits" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-charcoal hover:text-nexius-navy hover:bg-gray-50"
            >
              Benefits
            </a>
            <Link 
              to="/blog" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-charcoal hover:text-nexius-navy hover:bg-gray-50"
            >
              Blog
            </Link>
            <Link 
              to="/case-studies" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-charcoal hover:text-nexius-navy hover:bg-gray-50"
            >
              Case Studies
            </Link>
            <Link 
              to="/events" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-charcoal hover:text-nexius-navy hover:bg-gray-50"
            >
              Events
            </Link>
            <Link 
              to="/ai-ignite"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-charcoal hover:text-nexius-navy hover:bg-gray-50"
            >
              AI-Ignite
            </Link>
            <Link 
              to="/build-with-ai"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-charcoal hover:text-nexius-navy hover:bg-gray-50"
            >
              Build with AI
            </Link>
            <a 
              href="#assessment"
              onClick={() => setIsMenuOpen(false)}
              className="w-full mt-2 px-3 py-2 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-nexius-navy to-nexius-navy/95">
        <HeroAnimation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="relative text-5xl font-display font-extrabold text-white mb-6 tracking-tight">
              More customers ≠ more{' '}
              <RotatingText
                texts={[
                  "admin work",
                  "headcount", 
                  "costs",
                  "chaos",
                  "spreadsheets",
                  "late nights"
                ]}
                mainClassName="text-nexius-teal inline min-w-[12ch]"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden inline-block"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </h1>
            <p className="relative text-xl font-body text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              We get you more customers and quietly take care of the extra workload they create.
            </p>
            <div className="relative flex justify-center gap-4">
              <a
                href="#assessment"
                className="bg-nexius-teal text-white px-6 py-3 rounded-lg hover:bg-nexius-teal/90 transition-colors flex items-center group font-display font-semibold tracking-wide text-sm"
              >
                Get My 15‑Minute Assessment <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center group font-display font-semibold tracking-wide text-sm"
              >
                See What It Automates
              </a>
            </div>
            <div className="relative mt-16">
              <img
                src="/images/hero.png"
                alt="AI Executive Intelligence"
                className="rounded-xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-6 tracking-tight">
              Growing shouldn't feel like drowning.
            </h2>
            <p className="font-body text-nexius-charcoal max-w-4xl mx-auto text-lg leading-relaxed">
              When new customers arrive, the busywork explodes: forgotten follow‑ups, messy spreadsheets, late‑night invoicing. 
              Hiring too early is risky; doing it yourself burns you out. You need a way to handle more volume without expanding payroll.
            </p>
          </div>
        </div>
      </section>

      {/* Solution / Starter Workflows Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4 tracking-tight">
              One place to run the business.
            </h2>
            <p className="font-body text-nexius-charcoal max-w-2xl mx-auto leading-relaxed">
              We centralise your leads, sales and billing in a single organised system. Then we turn on smart automations—so tasks that used to steal hours simply happen in the background.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowCards.map((workflow) => (
              <div key={workflow.title} className="group p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
                <div className="relative inline-block">
                  <div className="absolute -inset-2 bg-nexius-teal/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <workflow.icon className="relative h-12 w-12 text-nexius-teal mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-nexius-navy mb-2">{workflow.title}</h3>
                <p className="text-nexius-charcoal">{workflow.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/case-studies"
              className="inline-flex items-center px-6 py-3 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
            >
              See All Workflows <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-nexius-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4 tracking-tight">
              From messy tools to running smooth—in a week.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Quick Call',
                description: 'Map your current tools and time drains.',
                icon: MessageCircle,
              },
              {
                step: '2',
                title: 'Migration',
                description: 'Import contacts, deals and invoices.',
                icon: Database,
              },
              {
                step: '3',
                title: 'Automation Setup',
                description: 'Turn on the first workflow (usually leads + follow‑ups).',
                icon: Settings,
              },
              {
                step: '4',
                title: 'Results',
                description: 'More responses, fewer late nights. Add more modules anytime.',
                icon: Trophy,
              },
            ].map((step) => (
              <div key={step.step} className="relative group">
                <div className="bg-white p-6 rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
                  <div className="flex items-center mb-4">
                    <span className="w-8 h-8 bg-nexius-teal text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </span>
                    <step.icon className="h-8 w-8 text-nexius-teal ml-3" />
                  </div>
                  <h3 className="text-xl font-semibold text-nexius-navy mb-2">{step.title}</h3>
                  <p className="text-nexius-charcoal">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#assessment"
              className="inline-flex items-center px-6 py-3 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
            >
              Book Onboarding <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-nexius-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4 tracking-tight">
              What you gain immediately.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {benefitsList.map((benefit) => (
              <div key={benefit.title} className="bg-white p-6 rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
                <h3 className="text-lg font-semibold text-nexius-navy mb-2">{benefit.title}</h3>
                <p className="text-nexius-charcoal">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4 tracking-tight">
              Small teams working like big ones.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="p-8 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 transition-colors">
                <p className="text-nexius-charcoal mb-6 text-lg italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full object-cover"
                    crossOrigin="anonymous"
                  />
                  <div className="ml-4">
                    <h4 className="text-nexius-navy font-semibold">{testimonial.author}</h4>
                    <p className="text-nexius-charcoal">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/case-studies"
              className="inline-flex items-center px-6 py-3 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
            >
              Read More Case Studies <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Summary Section */}
      <section className="py-24 bg-nexius-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4 tracking-tight">
              Proven Results Across Industries
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudiesSummary.map((study) => (
              <div key={study.title} className="bg-white p-6 rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
                <div className="flex items-center mb-4">
                  <study.icon className="h-8 w-8 text-nexius-teal mr-3" />
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-nexius-teal/10 text-nexius-teal">
                    {study.metric}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-nexius-navy mb-2">{study.title}</h3>
                <p className="text-nexius-charcoal">{study.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/case-studies"
              className="inline-flex items-center px-6 py-3 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
            >
              Get Similar Results <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Assessment Form */}
      <AssessmentForm />

      {/* Roadmap / Expansion Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4 tracking-tight">
              Start with one workflow—expand when ready.
            </h2>
            <p className="font-body text-nexius-charcoal max-w-3xl mx-auto text-lg leading-relaxed">
              Activate leads + follow‑ups today. Add billing, inventory or analytics later with no rebuild. 
              Your data stays put; you just switch features on.
            </p>
          </div>
          <div className="text-center">
            <Link
              to="/case-studies"
              className="inline-flex items-center px-6 py-3 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
            >
              See Roadmap <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Community / Resources Section */}
      <section className="py-24 bg-nexius-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4 tracking-tight">
                Learn and stay ahead.
              </h2>
              <p className="font-body text-nexius-charcoal text-lg leading-relaxed mb-8">
                Join our events and newsletter for plain‑English updates on practical AI. No hype—just what helps you operate smarter.
              </p>
              <div className="bg-white p-6 rounded-xl border border-nexius-gray">
                <h3 className="text-lg font-semibold text-nexius-navy mb-4">Stay Updated</h3>
                <form className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-medium"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-sm text-gray-600 mt-2">
                  Weekly tips. Unsubscribe anytime.
                </p>
              </div>
            </div>
            <div>
              <div className="bg-white p-6 rounded-xl border border-nexius-gray">
                <h3 className="text-lg font-semibold text-nexius-navy mb-4">Upcoming Event</h3>
                <p className="text-nexius-charcoal mb-4">
                  Next event: AI Ignite – 14 Aug. Reserve your seat.
                </p>
                <Link
                  to="/ai-ignite"
                  className="inline-flex items-center px-4 py-2 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-medium"
                >
                  Reserve Seat <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-nexius-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
            More customers shouldn't mean more work.
          </h2>
          <p className="font-body text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let us show you the first 3 processes you can automate this month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#assessment"
              className="bg-nexius-teal text-white px-8 py-4 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm inline-flex items-center"
            >
              Get My 15‑Minute Assessment <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#assessment"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-display font-semibold tracking-wide uppercase text-sm inline-flex items-center"
            >
              Try It Free
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <button
                onClick={scrollToTop}
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
                Build a 10x business without a 10x headcount.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link to="/ai-ignite" className="hover:text-white transition-colors">AI-Ignite</Link></li>
                <li><a href="mailto:hello@nexiuslabs.com" className="hover:text-white transition-colors">Contact</a></li>
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

function App() {
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation();

  const shouldShowNav = location.pathname !== '/links';

  useEffect(() => {
    supabase.auth.getSession().then(() => {
      setAuthChecked(true);
    }).catch(error => {
      console.error('Auth check failed:', error);
      setAuthChecked(true);
    });
  }, []);

  if (!authChecked) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-nexius-teal animate-spin" />
      </div>
    );
  }

  return (
    <>
      {shouldShowNav && <Navigation />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/upload" element={<UploadLogo />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/ai-ignite" element={<AIIgnite />} />
        <Route path="/build-with-ai" element={<BuildWithAI />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/event/:slug" element={<EventDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Chat />
    </>
  );
}

export default App;