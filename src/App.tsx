import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import RotatingText from './components/RotatingText';
import { AssessmentForm } from './components/AssessmentForm';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
import { Section } from './components/ui/Section';
import { Heading } from './components/ui/Heading';
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
    icon: TrendingUp,
  },
  {
    title: 'Lower cost',
    description: 'Replace multiple subscriptions and delay the next hire.',
    icon: DollarSign,
  },
  {
    title: 'Time back',
    description: '20+ hours a month saved on repetitive admin.',
    icon: Clock,
  },
  {
    title: 'Clarity',
    description: 'Real‑time view of sales and cash without spreadsheet gymnastics.',
    icon: BarChart3,
  },
  {
    title: 'Future‑proof',
    description: 'Clean data and structured processes for deeper automation later.',
    icon: Rocket,
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

const processSteps = [
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
];

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-surface/80 backdrop-blur-md z-50 border-b border-surface">
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
            <span className="ml-3 text-xl font-heading font-extrabold text-text tracking-tight group-hover:text-primary transition-colors">NEXIUS Labs</span>
          </Link>
          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-surface">
            {isMenuOpen ? <XIcon className="h-6 w-6 text-text" /> : <Menu className="h-6 w-6 text-text" />}
          </button>
          <div className="hidden md:flex items-center space-x-8 relative">
            <Link to="/blog" className="font-body font-medium text-muted hover:text-text transition-colors">Blog</Link>
            <Link to="/case-studies" className="font-body font-medium text-muted hover:text-text transition-colors">Case Studies</Link>
            <Link to="/events" className="font-body font-medium text-muted hover:text-text transition-colors">Events</Link>
            <Link to="/ai-ignite" className="font-body font-medium text-muted hover:text-text transition-colors">AI-Ignite</Link>
            <Button href="#assessment" variant="primary" size="sm">
              Let's Talk
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={"md:hidden " + (isMenuOpen ? 'block' : 'hidden')}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-surface">
            <Link 
              to="/blog" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-text hover:bg-surface"
            >
              Blog
            </Link>
            <Link 
              to="/case-studies" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-text hover:bg-surface"
            >
              Case Studies
            </Link>
            <Link 
              to="/events" 
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-text hover:bg-surface"
            >
              Events
            </Link>
            <Link 
              to="/ai-ignite"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-muted hover:text-text hover:bg-surface"
            >
              AI-Ignite
            </Link>
            <Button 
              href="#assessment"
              onClick={() => setIsMenuOpen(false)}
              variant="primary" 
              size="sm"
              fullWidth
            >
              Let's Talk
            </Button>
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section background="background" size="xl" contained={false}>
        <HeroAnimation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <Heading level={1} variant="white" className="mb-6">
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
                mainClassName="text-primary inline-block min-w-[6ch] sm:min-w-[8ch]"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden inline-block"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </Heading>
            <p className="text-xl font-body text-muted mb-8 max-w-3xl mx-auto leading-relaxed">
              We get you more customers and quietly take care of the extra workload they create.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="#assessment" 
                variant="primary" 
                size="lg"
                icon={ArrowRight}
              >
                Get My 15‑Minute Assessment
              </Button>
              <Button 
                href="#services" 
                variant="outline" 
                size="lg"
              >
                See What It Automates
              </Button>
            </div>
            <div className="mt-16">
              <img
                src="/images/hero.png"
                alt="AI Executive Intelligence Dashboard"
                className="rounded-xl shadow-2xl border border-surface/10"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Problem Section */}
      <Section background="background" size="lg">
        <div className="text-center">
          <Heading level={2} className="mb-6">
            Growing shouldn't feel like drowning.
          </Heading>
          <p className="font-body text-muted max-w-4xl mx-auto text-lg leading-relaxed">
            When new customers arrive, the busywork explodes: forgotten follow‑ups, messy spreadsheets, late‑night invoicing. 
            Hiring too early is risky; doing it yourself burns you out. You need a way to handle more volume without expanding payroll.
          </p>
        </div>
      </Section>

      {/* Solution / Starter Workflows Section */}
      <Section id="services" background="surface" size="lg">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">
            One place to run the business.
          </Heading>
          <p className="font-body text-muted max-w-2xl mx-auto leading-relaxed">
            We centralise your leads, sales and billing in a single organised system. Then we turn on smart automations—so tasks that used to steal hours simply happen in the background.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workflowCards.map((workflow) => (
            <Card key={workflow.title} variant="default">
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-2 bg-primary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <workflow.icon className="relative h-12 w-12 text-primary" />
              </div>
              <Heading level={3} size="lg" className="mb-2">
                {workflow.title}
              </Heading>
              <p className="text-muted font-body">{workflow.description}</p>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/case-studies" variant="primary" icon={ArrowRight}>
            See All Workflows
          </Button>
        </div>
      </Section>

      {/* How It Works Section */}
      <Section background="background" size="lg">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">
            From messy tools to running smooth—in a week.
          </Heading>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step) => (
            <Card key={step.step} variant="default">
              <div className="flex items-center mb-4">
                <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </span>
                <step.icon className="h-8 w-8 text-primary ml-3" />
              </div>
              <Heading level={3} size="lg" className="mb-2">
                {step.title}
              </Heading>
              <p className="text-muted font-body">{step.description}</p>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="#assessment" variant="primary" icon={ArrowRight}>
            Book Onboarding
          </Button>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section id="benefits" background="surface" size="lg">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">
            What you gain immediately.
          </Heading>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {benefitsList.map((benefit) => (
            <Card key={benefit.title} variant="default">
              <benefit.icon className="h-8 w-8 text-primary mb-4" />
              <Heading level={3} size="md" className="mb-2">
                {benefit.title}
              </Heading>
              <p className="text-muted font-body">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section id="testimonials" background="background" size="lg">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">
            Small teams working like big ones.
          </Heading>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} variant="testimonial" padding="lg">
              <p className="text-muted mb-6 text-lg italic font-body">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author + ' - ' + testimonial.title}
                  className="h-12 w-12 rounded-full object-cover"
                  crossOrigin="anonymous"
                />
                <div className="ml-4">
                  <h4 className="text-text font-semibold font-heading">{testimonial.author}</h4>
                  <p className="text-muted font-body">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/case-studies" variant="primary" icon={ArrowRight}>
            Read More Case Studies
          </Button>
        </div>
      </Section>

      {/* Case Studies Summary Section */}
      <Section background="surface" size="lg">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">
            Proven Results Across Industries
          </Heading>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {caseStudiesSummary.map((study) => (
            <Card key={study.title} variant="default">
              <div className="flex items-center mb-4">
                <study.icon className="h-8 w-8 text-primary mr-3" />
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {study.metric}
                </span>
              </div>
              <Heading level={3} size="lg" className="mb-2">
                {study.title}
              </Heading>
              <p className="text-muted font-body">{study.description}</p>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button href="/case-studies" variant="primary" icon={ArrowRight}>
            Get Similar Results
          </Button>
        </div>
      </Section>

      {/* Assessment Form */}
      <AssessmentForm />

      {/* Roadmap / Expansion Section */}
      <Section background="background" size="lg">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4">
            Start with one workflow—expand when ready.
          </Heading>
          <p className="font-body text-muted max-w-3xl mx-auto text-lg leading-relaxed">
            Activate leads + follow‑ups today. Add billing, inventory or analytics later with no rebuild. 
            Your data stays put; you just switch features on.
          </p>
        </div>
        <div className="text-center">
          <Button href="/case-studies" variant="primary" icon={ArrowRight}>
            See Roadmap
          </Button>
        </div>
      </Section>

      {/* Community / Resources Section */}
      <Section background="surface" size="lg">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <Heading level={2} className="mb-4">
              Learn and stay ahead.
            </Heading>
            <p className="font-body text-muted text-lg leading-relaxed mb-8">
              Join our events and newsletter for plain‑english updates on practical AI. No hype—just what helps you operate smarter.
            </p>
            <Card variant="default">
              <Heading level={3} size="md" className="mb-4">
                Stay Updated
              </Heading>
              <form className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-text"
                />
                <Button type="submit" variant="primary" size="sm">
                  Subscribe
                </Button>
              </form>
              <p className="text-sm text-muted mt-2 font-body">
                Weekly tips. Unsubscribe anytime.
              </p>
            </Card>
          </div>
          <div>
            <Card variant="default">
              <Heading level={3} size="md" className="mb-4">
                Upcoming Event
              </Heading>
              <p className="text-muted mb-4 font-body">
                Next event: AI Ignite – 14 Aug. Reserve your seat.
              </p>
              <Button href="/ai-ignite" variant="primary" icon={ArrowRight}>
                Reserve Seat
              </Button>
            </Card>
          </div>
        </div>
      </Section>

      {/* Final CTA Section */}
      <Section background="background" size="lg">
        <div className="text-center">
          <Heading level={2} variant="white" className="mb-4">
            More customers shouldn't mean more work.
          </Heading>
          <p className="font-body text-muted mb-8 max-w-2xl mx-auto leading-relaxed">
            Let us show you the first 3 processes you can automate this month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="#assessment" 
              variant="primary" 
              size="lg"
              icon={ArrowRight}
            >
              Get My 15‑Minute Assessment
            </Button>
            <Button 
              href="#assessment" 
              variant="outline" 
              size="lg"
            >
              Try It Free
            </Button>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-background text-muted py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <button
                onClick={scrollToTop}
                className="flex items-center text-sm text-muted hover:text-text transition-colors focus:outline-none group"
              >
                <img
                  src="https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images/m04h4fs8wns-1739784195705.png"
                  alt="NEXIUS Labs"
                  className="h-6 w-6 object-contain group-hover:opacity-90 transition-opacity"
                />
                <span className="ml-2 font-heading font-bold tracking-tight group-hover:text-primary transition-colors">NEXIUS Labs</span>
              </button>
              <p className="text-sm text-muted mt-2 font-body">
                Streamlining business operations with intelligent automation.
              </p>
            </div>
            <div>
              <h3 className="text-text font-semibold mb-4 font-heading">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/case-studies" className="text-muted hover:text-text transition-colors font-body">Case Studies</Link></li>
                <li><Link to="/blog" className="text-muted hover:text-text transition-colors font-body">Blog</Link></li>
                <li><Link to="/events" className="text-muted hover:text-text transition-colors font-body">Events</Link></li>
                <li><Link to="/ai-ignite" className="text-muted hover:text-text transition-colors font-body">AI-Ignite</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-text font-semibold mb-4 font-heading">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-muted font-body">hello@nexius.sg</li>
                <li className="text-muted font-body">+65 8123 4567</li>
              </ul>
            </div>
            <div>
              <h3 className="text-text font-semibold mb-4 font-heading">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-muted hover:text-text transition-colors font-body">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-surface pt-8 mt-8 text-center">
            <p className="text-sm text-muted font-body">
              © 2025 NEXIUS Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default function App() {
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
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
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