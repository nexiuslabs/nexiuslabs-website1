import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/nexiuslabs',
  instagram: 'https://www.instagram.com/nexiuslabs',
  linkedin: 'https://www.linkedin.com/company/105886234/',
  x: 'https://x.com/nexiuslabs',
  youtube: 'https://www.youtube.com/@nexiuslabs',
} as const;

export function Footer() {
  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
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

            {/* Social */}
            <div className="mt-5 flex items-center gap-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexius Labs on Facebook"
                className="text-nexius-dark-text-muted hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexius Labs on Instagram"
                className="text-nexius-dark-text-muted hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexius Labs on LinkedIn"
                className="text-nexius-dark-text-muted hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexius Labs on X"
                className="text-nexius-dark-text-muted hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nexius Labs on YouTube"
                className="text-nexius-dark-text-muted hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-nexius-dark-text font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="/#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/#benefits" className="hover:text-white transition-colors">Benefits</a></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-nexius-dark-text font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-nexius-dark-text font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-nexius-dark-border mt-12 pt-8 text-sm text-center">
          © {new Date().getFullYear()} NEXIUS Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
