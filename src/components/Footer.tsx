import React from 'react';
import { Link } from 'react-router-dom';

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
