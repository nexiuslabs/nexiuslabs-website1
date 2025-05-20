import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2,
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
} from 'lucide-react';

export function BuildWithAI() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-nexius-navy to-nexius-navy/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Build Your Next Project<br />With AI Superpowers
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              Leverage our AI-powered development platform to build, deploy, and scale your applications faster than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#get-started"
                className="inline-flex items-center justify-center px-8 py-4 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
              >
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-display font-semibold tracking-wide uppercase text-sm"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4">
              AI-POWERED DEVELOPMENT FEATURES
            </h2>
            <p className="text-nexius-charcoal max-w-2xl mx-auto">
              Our platform combines cutting-edge AI capabilities with powerful development tools to help you build better applications faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <Code2 className="h-12 w-12 text-nexius-teal mb-4" />
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                AI Code Generation
              </h3>
              <p className="text-nexius-charcoal">
                Generate production-ready code with our advanced AI models trained on best practices and modern frameworks.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <Cpu className="h-12 w-12 text-nexius-teal mb-4" />
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                Intelligent Debugging
              </h3>
              <p className="text-nexius-charcoal">
                Let AI analyze your code, identify bugs, and suggest fixes before they become problems in production.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <Database className="h-12 w-12 text-nexius-teal mb-4" />
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                Smart Database Design
              </h3>
              <p className="text-nexius-charcoal">
                Automatically generate optimized database schemas and queries based on your application requirements.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <LayoutGrid className="h-12 w-12 text-nexius-teal mb-4" />
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                UI Component Generation
              </h3>
              <p className="text-nexius-charcoal">
                Transform design mockups into responsive, accessible React components with AI-powered code generation.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <GitBranch className="h-12 w-12 text-nexius-teal mb-4" />
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                Version Control Assistant
              </h3>
              <p className="text-nexius-charcoal">
                Get intelligent suggestions for commit messages, code reviews, and merge conflict resolution.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-nexius-gray hover:border-nexius-teal/30 hover:shadow-lg transition-all">
              <MessageSquare className="h-12 w-12 text-nexius-teal mb-4" />
              <h3 className="text-xl font-semibold text-nexius-navy mb-2">
                AI Code Reviews
              </h3>
              <p className="text-nexius-charcoal">
                Receive automated code reviews with suggestions for improvements in performance, security, and best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-nexius-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4">
              HOW IT WORKS
            </h2>
            <p className="text-nexius-charcoal max-w-2xl mx-auto">
              Get started with AI-powered development in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nexius-teal text-white text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-nexius-navy mb-4">
                Connect Your Project
              </h3>
              <p className="text-nexius-charcoal">
                Link your GitHub repository or start a new project with our AI-powered templates.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nexius-teal text-white text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-nexius-navy mb-4">
                Define Requirements
              </h3>
              <p className="text-nexius-charcoal">
                Describe your features in plain English, and let our AI translate them into code.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nexius-teal text-white text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-nexius-navy mb-4">
                Build & Deploy
              </h3>
              <p className="text-nexius-charcoal">
                Review AI-generated code, make adjustments, and deploy with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-nexius-navy mb-4">
              WHY BUILD WITH AI?
            </h2>
            <p className="text-nexius-charcoal max-w-2xl mx-auto">
              Experience the advantages of AI-powered development and take your projects to the next level.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-nexius-teal mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-nexius-navy mb-2">
                10x Faster Development
              </h3>
              <p className="text-sm text-nexius-charcoal">
                Accelerate your development cycle with AI-powered code generation and automation.
              </p>
            </div>

            <div className="text-center">
              <Sparkles className="h-12 w-12 text-nexius-teal mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-nexius-navy mb-2">
                Higher Code Quality
              </h3>
              <p className="text-sm text-nexius-charcoal">
                Ensure consistent, well-tested code that follows industry best practices.
              </p>
            </div>

            <div className="text-center">
              <Settings className="h-12 w-12 text-nexius-teal mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-nexius-navy mb-2">
                Reduced Technical Debt
              </h3>
              <p className="text-sm text-nexius-charcoal">
                Build maintainable applications with AI-enforced architecture patterns.
              </p>
            </div>

            <div className="text-center">
              <Layers className="h-12 w-12 text-nexius-teal mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-nexius-navy mb-2">
                Scalable Architecture
              </h3>
              <p className="text-sm text-nexius-charcoal">
                Design systems that can grow with your needs using AI-optimized infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-24 bg-nexius-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Join developers who are building the future with AI-powered tools.
          </p>
          <a 
            href="https://tidycal.com/melverick/discovery-call-via-zoom-30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-nexius-teal text-white px-8 py-4 rounded-lg hover:bg-nexius-teal/90 transition-colors inline-flex items-center font-display font-semibold tracking-wide uppercase text-sm"
          >
            Schedule a Demo <Clock className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}