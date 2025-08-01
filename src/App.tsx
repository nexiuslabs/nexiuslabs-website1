import React, { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
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
  ShoppingCart,
  FileText,
  Settings,
  Database,
  Lightbulb,
  MessageCircle,
  ChevronDown,
  Target,
  MessageSquare,
} from 'lucide-react';
import DotGrid from './components/DotGrid';
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
import { AgentPage } from './pages/AgentPage';

const features = [
  {
    title: 'Custom AI Solutions',
    description: 'Building AI-driven automation for business operations and accounting.',
    icon: Brain,
  },
  {
    title: 'AI Consulting',
    description: 'Helping businesses integrate AI tools for workflow optimization.',
    icon: BarChart3,
  },
  {
    title: 'Workflow Automation',
    description: 'Developing no-code and AI-powered automation strategies for SMEs.',
    icon: Workflow,
  },
  {
    title: 'AI Training & Workshops',
    description: 'Educating business owners on the power of AI for growth.',
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
    image: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images//kate_yap.jpeg",
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
    <nav className="fixed top-0 w-full bg-nexius-dark-surface/90 backdrop-blur-md z-50 border-b border-nexius-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center group"
          >
            <img
              src="https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images//NexiusLabs_Logo-removebg-preview-removebg-preview.png"
              alt="NEXIUS Labs"
              className="h-8 w-8 object-contain group-hover:opacity-90 transition-opacity"
            />
            <span className="ml-3 text-xl font-display font-extrabold text-white tracking-tight uppercase group-hover:text-nexius-teal transition-colors">NEXIUS Labs</span>
          </Link>
          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-nexius-dark-card text-nexius-dark-text">
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="hidden md:flex items-center space-x-8 relative">
            <Link to="/blog" className="font-body font-medium text-nexius-dark-text-muted hover:text-white transition-colors">Blog</Link>
            <Link to="/events" className="font-body font-medium text-nexius-dark-text-muted hover:text-white transition-colors">Events</Link>
            <Link to="/ai-ignite" className="font-body font-medium text-nexius-dark-text-muted hover:text-white transition-colors">AI-Ignite</Link>
            <Link to="/agent" className="font-body font-medium text-nexius-dark-text-muted hover:text-white transition-colors">Nexius Agent</Link>
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
            <Link 
              to="/blog" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-dark-text-muted hover:text-white hover:bg-nexius-dark-card"
            >
              Blog
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
            <Link 
              to="/agent"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-nexius-dark-text-muted hover:text-white hover:bg-nexius-dark-card"
            >
              Nexius Agent
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

function HomePage({ onExploreClick }: { onExploreClick: (message: string) => void }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="h-[calc(100vh-4rem)] mt-16 bg-nexius-dark-bg overflow-y-auto snap-y snap-mandatory scroll-pt-16">
    <div className="h-[calc(100vh-4rem)] mt-16 bg-nexius-dark-bg overflow-y-auto snap-y snap-mandatory scroll-pt-16 hide-scrollbar">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] snap-start flex items-center justify-center bg-gradient-to-b from-nexius-navy to-nexius-navy/95">
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
              More customers ≠ more{' '}
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
            </h1>
            <p className="relative text-xl font-body text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              We get you more customers and quietly take care of the extra workload they create.
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
                  window.open('https://academy.nexiuslabs.com', '_blank');
                }}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors flex items-center group font-display font-semibold tracking-wide uppercase text-sm"
              >
                Visit Our Academy <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative mt-8">
              <p className="text-white/60 text-sm">
                Average 45% efficiency boost • Used by founders and lean teams
              </p>
            </div>
          </div>
        </div>
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-white/80">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="min-h-[calc(100vh-4rem)] snap-start flex items-center py-16 bg-nexius-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-6 tracking-tight">
              Who We Are
            </h2>
            <p className="font-body text-nexius-dark-text max-w-3xl mx-auto leading-relaxed text-lg mb-8">
              At Nexius Labs, we don't chase the latest AI buzz, we apply it to real business headaches.
              We're practitioners who've built and run lean teams ourselves, and now we package those workflows into turn‑key automations.
            </p>
            <a 
              href="/about" 
              className="inline-flex items-center text-nexius-teal hover:text-nexius-teal/90 font-medium"
            >
              Learn more about our story <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* What We Can Help You Build Section */}
      <section className="min-h-[calc(100vh-4rem)] snap-start flex items-center py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-6 tracking-tight">
              What We Help You Build
            </h2>
            <p className="font-body text-nexius-dark-text max-w-3xl mx-auto leading-relaxed text-lg">
              Whether you need an automatic lead engine, hands‑free invoicing or a lightweight ops dashboard, we've distilled the most‑requested automations into three starter workflows you can turn on in days.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border hover:border-nexius-teal/50 hover:shadow-lg transition-all">
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-nexius-teal/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Bot className="relative h-12 w-12 text-nexius-teal mb-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">Customised Sales Acquisition</h3>
              <p className="text-nexius-dark-text-muted mb-6">Find the right customers with limited time/resources.</p>
              <a
                onClick={(e) => { e.preventDefault(); onExploreClick("I'm interested in customised sales acquisition. Can you tell me more about how this works?"); }}
                className="inline-flex items-center text-nexius-teal hover:text-nexius-teal/90 font-medium"
              >
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            
            <div className="group p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border hover:border-nexius-teal/50 hover:shadow-lg transition-all">
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-nexius-teal/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <DollarSign className="relative h-12 w-12 text-nexius-teal mb-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">Open-Source AI-Enhanced Stacks</h3>
              <p className="text-nexius-dark-text-muted mb-6">Scale without expensive/dumb software.</p>
              <a
                onClick={(e) => { e.preventDefault(); onExploreClick("Tell me more about open-source AI-enhanced stacks. How can this help my business scale?"); }}
                className="inline-flex items-center text-nexius-teal hover:text-nexius-teal/90 font-medium"
              >
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            
            <div className="group p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border hover:border-nexius-teal/50 hover:shadow-lg transition-all">
              <div className="relative inline-block">
                <div className="absolute -inset-2 bg-nexius-teal/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Settings className="relative h-12 w-12 text-nexius-teal mb-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">Natural-Language Operations</h3>
              <p className="text-nexius-dark-text-muted mb-6">Talk to AI agents; they understand & execute change.</p>
              <a
                onClick={(e) => { e.preventDefault(); onExploreClick("How can natural-language operations help my business? What does this look like in practice?"); }}
                className="inline-flex items-center text-nexius-teal hover:text-nexius-teal/90 font-medium"
              >
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What We Are Building Section */}
      <section className="min-h-[calc(100vh-4rem)] snap-start flex items-center py-24 bg-nexius-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-6 tracking-tight">
              Introducing Nexius Agent
            </h2>
            <p className="font-body text-nexius-dark-text max-w-3xl mx-auto leading-relaxed text-lg mb-8">
              Run your business like the big boys—without the big-boy budget. Our AI pulls in new leads, follows them up, and keeps all the numbers tidy—so you grow while everyone else hires.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-nexius-dark-card rounded-xl border border-nexius-dark-border hover:border-nexius-teal/50 hover:shadow-lg transition-all text-center">
              <Bot className="h-16 w-16 text-nexius-teal mx-auto mb-6" />
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Your AI-Powered Business Partner
              </h3>
              <p className="text-nexius-dark-text-muted mb-8">
                Automate lead generation, manage finances, streamline HR, and more. Nexius Agent handles the admin, so you can focus on growth.
              </p>
              <Link
                to="/agent"
                className="inline-flex items-center bg-nexius-teal text-white px-6 py-3 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
              >
                Learn More About Nexius Agent <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="text-center mt-8">
              <a
                href="/agent"
                className="inline-flex items-center text-nexius-teal hover:text-nexius-teal/90 font-medium"
              >
                Visit the Nexius Agent Page <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Section */}
      <section className="min-h-[calc(100vh-4rem)] snap-start flex items-center py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-6 tracking-tight">
              Level Up with Our Academy
            </h2>
            <p className="font-body text-nexius-dark-text max-w-3xl mx-auto leading-relaxed text-lg mb-8">
              Hands‑on workshops, self‑paced courses and community events—everything from "AI for Solopreneurs" to "Building Custom Workflows."
            </p>
            <a
              href="https://academy.nexiuslabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nexius-teal text-white px-8 py-4 rounded-lg hover:bg-nexius-teal/90 transition-colors inline-flex items-center font-display font-semibold tracking-wide uppercase text-sm"
            >
              Visit the Academy <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[calc(100vh-4rem)] snap-start flex items-center py-24 bg-nexius-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4 tracking-tight">
            More customers shouldn't mean more work.
          </h2>
          <p className="font-body text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let us show you the first 3 processes you can automate this month.
          </p>
          <button 
            onClick={() => {
              const contactButton = document.querySelector('button[data-contact="true"]');
              if (contactButton instanceof HTMLButtonElement) {
                contactButton.click();
              }
            }}
            data-contact="true"
            className="bg-nexius-teal text-white px-8 py-4 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm inline-flex items-center"
          >
            Get My 15‑Minute Assessment <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="min-h-[calc(100vh-4rem)] snap-start bg-nexius-dark-surface text-nexius-dark-text-muted py-12">
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
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
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
import { useLocation } from 'react-router-dom';

export default function App() {
                }
  )
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState<string>('');
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

  const handleExploreClick = (message: string) => {
    setChatInitialMessage(message);
    setIsChatOpen(true);
  };

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
        <Route path="/" element={<HomePage onExploreClick={handleExploreClick} />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-study/:id" element={<CaseStudy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/upload" element={<UploadLogo />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/ai-ignite" element={<AIIgnite />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/event/:slug" element={<EventDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Chat 
        isOpen={isChatOpen} 
        setIsOpen={setIsChatOpen}
        initialMessage={chatInitialMessage}
        onInitialMessageSent={() => setChatInitialMessage('')}
      />
    </>
  );
}