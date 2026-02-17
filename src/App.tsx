import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
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
  FileText,
  Settings,
  Database,
  Lightbulb,
} from 'lucide-react';
import { HeroAnimation } from './components/HeroAnimation';
import { ContactForm } from './components/ContactForm';
import RotatingText from './components/RotatingText';
import { CaseStudy } from './pages/CaseStudy';
import { CaseStudies } from './pages/CaseStudies';
import { UploadLogo } from './pages/UploadLogo';
import { AdminPage } from './pages/AdminPage';
import { EventDetail } from './pages/EventDetail';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { LinksPage } from './pages/LinksPage';
import { AIIgnite } from './pages/AIIgnite';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Events } from './pages/Events';
import { NotFound } from './pages/NotFound';
import { Chat } from './components/Chat';
import { PlaybookCapture } from './components/PlaybookCapture';
import { PlaybookLanding } from './pages/PlaybookLanding';
import { BookAssessment } from './pages/BookAssessment';

const features = [
  {
    title: 'Agentic ERP & CRM for Small Businesses',
    description: 'Deploy agentic ERP and CRM automation that adapts to your processes and reduces manual admin work.',
    icon: Brain,
  },
  {
    title: 'AI Workflow Automation for Small Businesses and SMEs',
    description: 'Automate repetitive workflows across sales, operations, support, and back office with practical AI orchestration.',
    icon: Workflow,
  },
  {
    title: 'Automate Finance and Operations with AI Agents',
    description: 'Improve invoice speed, handoff quality, and cash-flow visibility with controlled AI workflow automation.',
    icon: BarChart3,
  },
  {
    title: 'AI Training and Workshops for Business Teams in Singapore',
    description: 'Hands-on programs to help teams adopt AI business automation and execute with confidence.',
    icon: Shield,
  },
];

const useCases = [
  {
    title: 'Document Processing',
    description: 'Automate data extraction from invoices, receipts, and forms with AI-powered OCR.',
    icon: FileText,
    metrics: '60% faster processing',
  },
  {
    title: 'Financial Analysis',
    description: 'AI-driven insights for better financial decision-making and forecasting.',
    icon: TrendingUp,
    metrics: '85% accuracy rate',
  },
  {
    title: 'Customer Service',
    description: 'Intelligent chatbots and automation for 24/7 customer support.',
    icon: Users,
    metrics: '3x faster response time',
  },
  {
    title: 'Data Management',
    description: 'Smart data organization and analysis for better business insights.',
    icon: Database,
    metrics: '50% less manual work',
  },
  {
    title: 'Process Automation',
    description: 'Streamline repetitive tasks with intelligent workflow automation.',
    icon: Settings,
    metrics: '40% cost reduction',
  },
  {
    title: 'Innovation Strategy',
    description: 'AI-powered insights to drive product and service innovation.',
    icon: Lightbulb,
    metrics: '2x faster development',
  },
];

const benefits = [
  {
    title: 'Automate Repetitive Tasks',
    description: 'Let AI handle routine operations while your team focuses on strategic work.',
    icon: Bot,
  },
  {
    title: 'Cut Operational Costs',
    description: 'Reduce expenses through intelligent process optimization.',
    icon: DollarSign,
  },
  {
    title: 'Boost Productivity',
    description: 'Accelerate workflows and eliminate bottlenecks with AI assistance.',
    icon: Rocket,
  },
  {
    title: 'Enhance Decision-Making',
    description: 'Make data-driven decisions with AI-powered insights.',
    icon: LineChart,
  },
  {
    title: 'Improve Customer Experience',
    description: 'Deliver personalized service through AI-driven interactions.',
    icon: Users,
  },
  {
    title: 'Optimize Workforce',
    description: 'Empower employees with AI tools to maximize their potential.',
    icon: UserCheck,
  },
  {
    title: 'Gain Competitive Edge',
    description: 'Stay ahead of the market with cutting-edge AI capabilities.',
    icon: Trophy,
  },
  {
    title: 'Scale Operations',
    description: 'Grow your business efficiently with automated processes.',
    icon: Zap,
  },
];

const testimonials = [
  {
    quote: "NEXIUS Labs' AI automation solution has transformed our operations. What used to take our team hours now happens in minutes, and with better accuracy. This has allowed us to focus on strategic initiatives and growth.",
    author: "Vincent Sim",
    title: "Operations Director",
    company: "Serial Company",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    quote: "The AI solution from NEXIUS Labs has revolutionized our accounting processes. Our team now focuses on analysis and strategy instead of manual data entry.",
    author: "Kate Yap",
    title: "CFO",
    company: "Daisy Accounting",
    image: "https://tueprsmyrebrfwrdlagk.supabase.co/storage/v1/object/public/website-images//kate_yap.jpeg",
  },
  {
    quote: "NEXIUS Labs' AI solution has transformed how we understand and serve our customers. The results have exceeded our expectations.",
    author: "Michael Zhang",
    title: "CEO",
    company: "GreenCart",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
  },
];

function Navigation({ onContactClick }: { onContactClick: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-nexius-dark-surface/90 backdrop-blur-md z-50 border-b border-nexius-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link
            to="/"
            className="flex items-center focus:outline-none group"
          >
            <img
              src="https://tueprsmyrebrfwrdlagk.supabase.co/storage/v1/object/public/website-images/nexius_logo_no_text_transparent_bg.png"
              alt="NEXIUS Labs"
              className="h-8 w-8 object-contain group-hover:opacity-90 transition-opacity"
              width={32}
              height={32}
            />
            <span className="ml-3 text-xl font-display font-extrabold text-white tracking-tight uppercase group-hover:text-nexius-teal transition-colors">NEXIUS Labs</span>
          </Link>
          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-nexius-dark-card text-nexius-dark-text">
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="hidden md:flex items-center space-x-8 relative">
            <a href="/#services" className="font-body font-medium text-nexius-dark-text-muted hover:text-white transition-colors">Services</a>
            <a href="/#benefits" className="font-body font-medium text-nexius-dark-text-muted hover:text-white transition-colors">Benefits</a>
            <Link to="/blog" className="font-body font-medium text-nexius-dark-text-muted hover:text-white transition-colors">Blog</Link>
            <Link to="/case-studies" className="font-body font-medium text-nexius-dark-text-muted hover:text-white transition-colors">Case Studies</Link>
            <Link to="/events" className="font-body font-medium text-nexius-dark-text-muted hover:text-white transition-colors">Events</Link>
            <Link to="/ai-ignite" className="font-body font-medium text-nexius-dark-text-muted hover:text-white transition-colors">AI-Ignite</Link>
            <button 
              onClick={onContactClick}
              data-contact="true"
              className="bg-nexius-teal text-white px-4 py-2 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
            >
              Let's Talk
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-nexius-dark-border">
            <a 
              href="/#services" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-dark-text-muted hover:text-white hover:bg-nexius-dark-card"
            >
              Services
            </a>
            <a 
              href="/#benefits" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-dark-text-muted hover:text-white hover:bg-nexius-dark-card"
            >
              Benefits
            </a>
            <Link 
              to="/blog" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-dark-text-muted hover:text-white hover:bg-nexius-dark-card"
            >
              Blog
            </Link>
            <Link 
              to="/case-studies" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-dark-text-muted hover:text-white hover:bg-nexius-dark-card"
            >
              Case Studies
            </Link>
            <Link 
              to="/events" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-dark-text-muted hover:text-white hover:bg-nexius-dark-card"
            >
              Events
            </Link>
            <Link 
              to="/ai-ignite"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-dark-text-muted hover:text-white hover:bg-nexius-dark-card"
            >
              AI-Ignite
            </Link>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                onContactClick();
              }} 
              className="w-full mt-2 px-3 py-2 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
            >
              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  const [showPlaybook, setShowPlaybook] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NEXIUS Labs',
    url: 'https://nexiuslabs.com',
    logo: 'https://tueprsmyrebrfwrdlagk.supabase.co/storage/v1/object/public/website-images/nexius_logo_no_text_transparent_bg.png',
    sameAs: [
      'https://www.linkedin.com/company/nexius-labs',
      'https://www.linkedin.com/in/melverick'
    ],
    description: 'NEXIUS Labs delivers AI business automation for small businesses and SMEs in Singapore across agentic ERP, CRM, finance, and operations workflows.'
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NEXIUS Labs',
    url: 'https://nexiuslabs.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://nexiuslabs.com/blog?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const homepageFaqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is AI business automation for SMEs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI business automation for SMEs uses agentic AI to handle repetitive tasks across ERP, CRM, finance, and operations — reducing manual work and letting small teams operate at enterprise speed without enterprise headcount.'
        }
      },
      {
        '@type': 'Question',
        name: 'How can small businesses in Singapore start with AI automation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start by identifying one high-friction workflow (e.g. invoicing, lead follow-up, or inventory updates). Deploy a focused AI agent on that process, measure time saved, then expand to adjacent workflows. Nexius Labs offers a free 15-minute assessment to help you identify the right starting point.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is agentic AI and how is it different from chatbots?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Agentic AI goes beyond simple Q&A. Unlike chatbots that only respond to prompts, agentic AI systems can plan, execute multi-step workflows, use tools, and take actions autonomously — like processing invoices, updating CRM records, or generating reports without human intervention.'
        }
      },
      {
        '@type': 'Question',
        name: 'Does Nexius Labs offer AI training and workshops?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Nexius Academy runs hands-on AI training and workshops for business teams in Singapore, covering practical AI implementation, no-code automation, and agentic workflow design. Programs are tailored for non-technical teams and founders.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqJsonLd) }}
      />
      <div className="min-h-screen bg-nexius-dark-bg">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-nexius-navy to-nexius-navy/95">
        <HeroAnimation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="relative text-5xl font-display font-extrabold text-white mb-6 tracking-tight">
              <span className="block">AI Business Automation for SMEs</span>
              <span className="block mt-2">More customers ≠ more{' '}
                <RotatingText
                  texts={['admin work', 'headcount', 'costs', 'chaos', 'spreadsheets', 'late nights']}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-nexius-teal text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-flex"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </span>
            </h1>
            <p className="relative text-xl font-body text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Nexius Labs helps businesses implement AI automation for SMEs in Singapore across ERP, CRM, finance, and daily operations.
            </p>
            <div className="relative flex justify-center gap-4">
              <button 
                onClick={() => {
                  const contactButton = document.querySelector('button[data-contact="true"]');
                  if (contactButton instanceof HTMLButtonElement) {
                    contactButton.click();
                  }
                }}
                className="bg-nexius-teal text-white px-6 py-3 rounded-lg hover:bg-nexius-teal/90 transition-colors flex items-center group font-display font-semibold tracking-wide uppercase text-sm"
              >
                Get My 15‑Minute Assessment <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => {
                  const useCasesSection = document.getElementById('use-cases');
                  if (useCasesSection) {
                    useCasesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center group font-display font-semibold tracking-wide uppercase text-sm"
              >
                See What It Automates <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative mt-8">
              <p className="text-white/60 text-sm">
                Average 45% efficiency boost • Used by founders and lean teams
              </p>
            </div>
            <div className="relative mt-6 bg-white/5 border border-white/10 rounded-xl p-6 max-w-xl mx-auto">
              <p className="text-white font-semibold mb-2">📘 Free: AI Automation Playbook for SMEs</p>
              <p className="text-white/60 text-sm mb-4">5 workflows you can automate this week — no coding required.</p>
              <button
                onClick={() => setShowPlaybook(true)}
                className="inline-flex items-center bg-nexius-teal text-white px-5 py-2.5 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-xs"
              >
                Get the Playbook <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="relative mt-16">
              <img
                src="/images/hero.png"
                alt="AI business automation dashboard for SMEs — Nexius Labs"
                className="rounded-xl shadow-2xl border border-white/10"
                width={1456}
                height={816}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
              Agentic AI Solutions and AI Workflow Automation Services
            </h2>
            <p className="font-body text-nexius-dark-text-muted max-w-2xl mx-auto leading-relaxed">
              From agentic ERP and CRM for small businesses to custom AI workflow solutions for businesses, Nexius delivers practical systems for AI business automation with measurable operating leverage.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="group p-6 bg-nexius-dark-card rounded-xl border border-nexius-dark-border hover:border-nexius-teal/50 hover:shadow-lg transition-all">
                <div className="relative inline-block">
                  <div className="absolute -inset-2 bg-nexius-teal/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <feature.icon className="relative h-12 w-12 text-nexius-teal mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-nexius-dark-text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 bg-nexius-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
              How AI Automation Helps Small Businesses and SMEs
            </h2>
            <p className="font-body text-nexius-dark-text-muted max-w-2xl mx-auto leading-relaxed">
              Discover how AI workflow automation and ERP CRM automation can improve execution speed,
              reduce manual handoffs, and drive sustainable growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="benefit-card">
                <benefit.icon className="benefit-icon" />
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-sm text-nexius-dark-text-muted">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
              AI Automation for SMEs in Singapore: Solutions in Action
            </h2>
            <p className="font-body text-nexius-dark-text-muted max-w-2xl mx-auto leading-relaxed">
              Explore how our agentic AI solutions are transforming core business operations and
              delivering measurable results for small businesses and SMEs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="group p-6 bg-nexius-dark-card rounded-xl border border-nexius-dark-border hover:border-nexius-teal/50 hover:shadow-lg transition-all">
                <div className="relative inline-block">
                  <div className="absolute -inset-2 bg-nexius-teal/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <useCase.icon className="relative h-12 w-12 text-nexius-teal mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-nexius-dark-text-muted mb-4">{useCase.description}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-nexius-teal/10 text-nexius-teal">
                  {useCase.metrics}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-nexius-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
              Visionary Leaders Trust Nexius
            </h2>
            <p className="font-body text-nexius-dark-text-muted max-w-2xl mx-auto leading-relaxed">
              Join forward-thinking executives who've transformed their decision-making
              process with NEXIUS Labs' intelligent insights.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border hover:border-nexius-teal/50 transition-colors">
                <p className="text-nexius-dark-text mb-6 text-lg italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full object-cover"
                    crossOrigin="anonymous"
                    loading="lazy"
                    decoding="async"
                    width={48}
                    height={48}
                  />
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">{testimonial.author}</h4>
                    <p className="text-nexius-dark-text-muted">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-nexius-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
            Ready for AI business automation that actually ships?
          </h2>
          <p className="font-body text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Work with Nexius to deploy AI workflow automation, agentic ERP and CRM for small businesses,
            and finance automation that creates measurable outcomes.
          </p>
          <a 
            href="https://outlook.office.com/bookwithme/user/1a3b3c1b65044d24b6cddcc6b42c8ecb%40nexiuslabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-nexius-teal text-white px-8 py-4 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm inline-flex items-center"
          >
            Schedule A Call <Clock className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

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
                  src="https://tueprsmyrebrfwrdlagk.supabase.co/storage/v1/object/public/website-images/nexius_logo_no_text_transparent_bg.png"
                  alt="NEXIUS Labs"
                  className="h-6 w-6 object-contain group-hover:opacity-90 transition-opacity"
                  loading="lazy"
                  decoding="async"
                  width={24}
                  height={24}
                />
                <span className="ml-2 text-lg font-bold group-hover:text-nexius-teal transition-colors">NEXIUS Labs</span>
              </button>
              <p className="text-sm">
                AI Business Automation for Small Businesses and SMEs in Singapore
              </p>
            </div>
            <div>
              <h3 className="text-nexius-dark-text font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-nexius-dark-text font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
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
      <PlaybookCapture isOpen={showPlaybook} onClose={() => setShowPlaybook(false)} />
    </>
  );
}
import { useLocation } from 'react-router-dom';

export default function App() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
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
      <div className="fixed inset-0 flex items-center justify-center bg-nexius-dark-bg">
        <Loader2 className="w-8 h-8 text-nexius-teal animate-spin" />
      </div>
    );
  }

  return (
    <>
      {shouldShowNav && <Navigation onContactClick={() => setIsContactFormOpen(true)} />}
      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
        <Route path="/case-study-agentic-erp-crm-mvp" element={<Navigate to="/case-study/agentic-erp-crm-mvp" replace />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/upload" element={<UploadLogo />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/ai-ignite" element={<AIIgnite />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/event/:slug" element={<EventDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/playbook" element={<PlaybookLanding />} />
        <Route path="/book-assessment" element={<BookAssessment />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Chat />
    </>
  );
}
