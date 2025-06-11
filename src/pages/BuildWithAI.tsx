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
  X,
  ExternalLink
} from 'lucide-react';

export function BuildWithAI() {
  // Inject Luma checkout widget script once on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.lu.ma/loader.js";
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

  const cohorts = [
    {
      label: "June Cohort",
      slug: "build-with-ai-noncoders",
      sessions: [
        {
          title: "Session 1 – Sat, 21 Jun · 1‑5 PM",
          bullets: [
            "AI prompt fundamentals & Bolt.new onboarding",
            "Generate project boilerplate and connect Supabase",
            "Create your first functional screen & deploy preview",
          ],
        },
        {
          title: "Independent Build Week",
          bullets: ["Daily Slack check‑ins, mentor office hours, peer reviews"],
        },
        {
          title: "Session 2 – Sat, 28 Jun · 1‑5 PM",
          bullets: [
            "Debug clinic & feature polish",
            "Add simple analytics and payment hooks",
            "Final deploy & demo showcase",
          ],
        },
      ],
    },
    {
      label: "July Cohort",
      slug: "build-with-ai-july",
      sessions: [
        {
          title: "Session 1 – Sat, 19 Jul · 1‑5 PM",
          bullets: [
            "AI prompt fundamentals & Bolt.new onboarding",
            "Generate project boilerplate and connect Supabase",
            "Create your first functional screen & deploy preview",
          ],
        },
        {
          title: "Independent Build Week",
          bullets: ["Daily Slack check‑ins, mentor office hours, peer reviews"],
        },
        {
          title: "Session 2 – Sat, 26 Jul · 1‑5 PM",
          bullets: [
            "Debug clinic & feature polish",
            "Add simple analytics and payment hooks",
            "Final deploy & demo showcase",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-rose-50 via-white to-fuchsia-50 pt-20">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-fuchsia-600 animate-fade-in-up">
          Build With AI <span className="text-indigo-600">for Non‑Coders</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 animate-fade-in-up-delay-1">
          Two‑Saturday workshop that takes you from idea to functional web or mobile app — all in the browser with <strong>Bolt.new</strong>, no‑code databases, and AI‑generated code.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-2">
          {cohorts.map((c) => (
            <div
              key={c.slug}
              data-luma-action="checkout"
              data-luma-slug={c.slug}
              data-luma-mode="button"
              className="inline-block"
            >
              <button className="w-full px-8 py-4 rounded-2xl shadow-xl text-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-display font-semibold tracking-wide">
                Join {c.label} – SGD 180
              </button>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500 animate-fade-in-up-delay-3">Limited seats · PayNow after registration</p>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-6 max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "AI‑Generated Code",
              desc: "Prompt Bolt.new to scaffold UIs, APIs & tests — then fine‑tune with guided tweaks",
            },
            {
              title: "Database & Auth in Minutes",
              desc: "Plug‑and‑play Supabase templates handle users and data without SQL struggles",
            },
            {
              title: "Deploy Anywhere",
              desc: "One‑click publish to Netlify or Expo — share your app before the 2nd session",
            },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-200 p-6">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cohort Schedules */}
      <section className="py-16 bg-indigo-50 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-700">Choose Your Cohort</h2>
          <div className="grid gap-12 md:grid-cols-2">
            {cohorts.map((cohort) => (
              <div key={cohort.slug} className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-indigo-600">{cohort.label}</h3>
                <ol className="relative border-l-4 border-indigo-300 pl-6 space-y-10">
                  {cohort.sessions.map((s, idx) => (
                    <li key={idx}>
                      <span className="absolute -left-3 top-0 bg-indigo-600 w-6 h-6 rounded-full"></span>
                      <h4 className="text-lg font-semibold mb-2">{s.title}</h4>
                      <ul className="list-disc ml-6 text-gray-700 space-y-1">
                        {s.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
                <div
                  data-luma-action="checkout"
                  data-luma-slug={cohort.slug}
                  data-luma-mode="button"
                  className="inline-block mt-6"
                >
                  <button className="rounded-xl shadow px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium">
                    Reserve Seat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="py-12 bg-white px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Venue</h2>
        <p className="text-gray-700">
          Lifelong Learning Institute – Learning Hub<br />11 Eunos Rd 8, Singapore 408601 · Level 4, Room R9 Cabin
        </p>
      </section>

      {/* Instructors */}
      <section className="py-16 bg-white px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Your Instructors</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              name: "Darryl Wong, CPA (Aust.)",
              role: "Founder & AI Consultant, Nexius Labs",
              blurb: "CPA‑turned‑automation architect helping non‑coders build with AI since 2023",
              link: "https://www.linkedin.com/in/darrylwongdq/",
              image: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images//darryl%20portrait.jpeg"
            },
            {
              name: "Melverick Ng",
              role: "Co‑Founder & AI Strategist, Nexius Labs",
              blurb: "Indie‑hacker mentor who turns ideas into shipped agentic products in days",
              link: "https://www.linkedin.com/in/melverick/",
              image: "https://tunidbyclygzipvbfzee.supabase.co/storage/v1/object/public/website-images//Melverick%20portrait.jpeg"
            },
          ].map((t) => (
            <div key={t.name} className="rounded-2xl shadow-lg bg-white border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <img 
                  src={t.image}
                  alt={t.name} 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex flex-col gap-2 text-center sm:text-left">
                  <a href={t.link} className="text-xl font-semibold text-indigo-600 hover:underline inline-flex items-center justify-center sm:justify-start gap-2" target="_blank" rel="noopener noreferrer">
                    {t.name}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <span className="text-sm text-gray-500">{t.role}</span>
                  <p className="text-gray-600 leading-relaxed mt-2">{t.blurb}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-fuchsia-50 px-6 max-w-4xl mx-auto rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-fuchsia-700">FAQ</h2>
        <div className="space-y-6">
          {[
            {
              q: "Do I need coding experience?",
              a: "No — the workshop is designed for non‑coders. If you can follow prompts in a browser, you can build an app.",
            },
            {
              q: "What should I prepare?",
              a: "Bring a laptop with Chrome/Edge, a free StackBlitz account and an app idea you care about.",
            },
            {
              q: "How do I pay?",
              a: "After Luma checkout we'll email you a PayNow QR. Your seat is locked once payment is received.",
            },
            {
              q: "What if I can't attend one session?",
              a: "Sessions are recorded. With 72‑hour notice you can roll your ticket to the next cohort.",
            },
          ].map(({ q, a }) => (
            <details key={q} className="group bg-white rounded-lg p-4 shadow-sm">
              <summary className="font-medium cursor-pointer select-none">
                {q}
              </summary>
              <p className="pt-2 text-gray-600 leading-relaxed group-open:animate-fadeIn">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-12 bg-gray-900 text-gray-200 text-center flex flex-col items-center gap-4">
        <h3 className="text-2xl font-semibold">Ready to build your app?</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          {cohorts.map((c) => (
            <div key={c.slug + "-footer"} data-luma-action="checkout" data-luma-slug={c.slug} data-luma-mode="button" className="inline-block">
              <button className="w-full px-8 py-3 rounded-2xl font-medium bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                Join {c.label}
              </button>
            </div>
          ))}
        </div>
        <small className="mt-4">© {new Date().getFullYear()} Nexius Labs. All rights reserved.</small>
      </footer>
    </div>
  );
}