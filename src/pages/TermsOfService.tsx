import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-nexius-dark-bg">
      {/* Header */}
      <div className="bg-nexius-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-display font-bold text-white">
            Terms of Service
          </h1>
          <p className="text-white/80 mt-2">
            Last Updated: 09th Apr 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose max-w-none text-nexius-dark-text">
          <p>
            Welcome to <strong>Nexius Labs Pte Ltd</strong> ("we", "our", "us"). These Terms of Service ("Terms") govern your use of our website at <a href="http://www.nexiuslabs.com">www.nexiuslabs.com</a> (the "Site") and the services we provide.
          </p>

          <p>
            By accessing or using our Site, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our Site or services.
          </p>

          <hr />

          <h2>1. Acceptance of Terms</h2>

          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <hr />

          <h2>2. Description of Service</h2>

          <p>
            Nexius Labs provides AI-powered business automation solutions, consulting services, and educational resources. Our services include but are not limited to:
          </p>
          <ul>
            <li>AI consulting and implementation services</li>
            <li>Custom automation solutions</li>
            <li>Educational workshops and training</li>
            <li>Software development and integration</li>
            <li>Business process optimization</li>
          </ul>

          <hr />

          <h2>3. User Accounts and Registration</h2>

          <p>
            Some features of our Site may require you to register for an account. When you register, you agree to:
          </p>
          <ul>
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your password and identification</li>
            <li>Accept all risks of unauthorized access to your account</li>
          </ul>

          <hr />

          <h2>4. Acceptable Use</h2>

          <p>You agree not to use the Site to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Distribute spam, malware, or other harmful content</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the Site's functionality</li>
            <li>Use the Site for any commercial purpose without our prior written consent</li>
          </ul>

          <hr />

          <h2>5. Intellectual Property Rights</h2>

          <p>
            The Site and its original content, features, and functionality are and will remain the exclusive property of Nexius Labs Pte Ltd and its licensors. The Site is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
          </p>

          <hr />

          <h2>6. Service Availability</h2>

          <p>
            We strive to maintain the availability of our Site and services, but we do not guarantee that the Site will be available at all times. We may suspend, withdraw, or restrict the availability of all or any part of our Site for business and operational reasons.
          </p>

          <hr />

          <h2>7. Payment Terms</h2>

          <p>
            For paid services:
          </p>
          <ul>
            <li>All fees are stated in Singapore Dollars (SGD) unless otherwise specified</li>
            <li>Payment is due according to the terms specified in your service agreement</li>
            <li>We reserve the right to change our fees at any time with reasonable notice</li>
            <li>Refunds are subject to our refund policy as stated in your service agreement</li>
          </ul>

          <hr />

          <h2>8. Limitation of Liability</h2>

          <p>
            To the fullest extent permitted by applicable law, Nexius Labs Pte Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Site or services.
          </p>

          <hr />

          <h2>9. Indemnification</h2>

          <p>
            You agree to defend, indemnify, and hold harmless Nexius Labs Pte Ltd and its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these Terms or your use of the Site.
          </p>

          <hr />

          <h2>10. Termination</h2>

          <p>
            We may terminate or suspend your account and bar access to the Site immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.
          </p>

          <hr />

          <h2>11. Governing Law</h2>

          <p>
            These Terms shall be interpreted and governed by the laws of Singapore. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Singapore.
          </p>

          <hr />

          <h2>12. Changes to Terms</h2>

          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <hr />

          <h2>13. Severability</h2>

          <p>
            If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.
          </p>

          <hr />

          <h2>14. Contact Information</h2>

          <p>If you have any questions about these Terms of Service, please contact us:</p>

          <p>
            <strong>Nexius Labs Pte Ltd</strong><br />
            Email: <a href="mailto:melverick@nexiuslabs.com">melverick@nexiuslabs.com</a><br />
            Phone: <a href="tel:+6589002130">+65-8900-2130</a>
          </p>

          <hr />

          <p className="text-sm text-gray-500">
            These Terms of Service were last updated on 09th Apr 2025.
          </p>
        </div>
      </div>
    </div>
  );
}