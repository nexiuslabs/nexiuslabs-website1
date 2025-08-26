import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../components/SEO';

export function PrivacyPolicy() {
  const baseUrl = 'https://nexiuslabs.com';
  return (
    <div className="min-h-screen bg-nexius-dark-bg">
      <SEO
        title="Privacy Policy | NEXIUS Labs"
        description="Read the privacy practices of NEXIUS Labs."
        canonical={`${baseUrl}/privacy`}
      />
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
            Privacy Policy
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
            At <strong>Nexius Labs Pte Ltd</strong> ("we", "our", "us"), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website at <a href="http://www.nexiuslabs.com">www.nexiuslabs.com</a> (the "Site").
          </p>

          <p>
            By using our Site, you agree to the collection and use of your information as outlined in this Privacy Policy.
          </p>

          <hr />

          <h2>1. Information We Collect</h2>

          <p>We may collect the following types of information:</p>

          <h3>A. Personal Information</h3>
          <p>When you visit or interact with our Site, we may collect personal information such as:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Company name</li>
            <li>Job title</li>
            <li>Any other information you choose to provide to us via contact forms or other communications</li>
          </ul>

          <h3>B. Non-Personal Information</h3>
          <p>We may also collect non-personal information, including but not limited to:</p>
          <ul>
            <li>IP addresses</li>
            <li>Browser type and version</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Location data (if enabled)</li>
          </ul>

          <p>This data helps us improve our services and user experience.</p>

          <hr />

          <h2>2. How We Use Your Information</h2>

          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>To respond to your inquiries or requests</li>
            <li>To provide customer support and assistance</li>
            <li>To send newsletters, updates, and marketing communications (with your consent)</li>
            <li>To analyze usage patterns and improve our website's functionality</li>
            <li>To comply with legal obligations and resolve disputes</li>
          </ul>

          <hr />

          <h2>3. How We Protect Your Information</h2>

          <p>
            We take the security of your personal information seriously. We implement appropriate technical and organizational measures to safeguard your data. However, please note that no method of data transmission or storage can be guaranteed as 100% secure.
          </p>

          <hr />

          <h2>4. Sharing Your Information</h2>

          <p>
            We will not sell, rent, or trade your personal information to third parties. We may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or providing services to you, but they are obligated not to disclose or use your information for any other purposes.
          </p>

          <p>
            We may also share your information when required by law or to protect our rights, property, or safety, or the rights, property, or safety of others.
          </p>

          <hr />

          <h2>5. Cookies and Tracking Technologies</h2>

          <p>
            Our website may use cookies, web beacons, or other tracking technologies to enhance your experience. Cookies are small files stored on your device that help us remember your preferences and gather usage data. You can manage or disable cookies through your browser settings, but doing so may affect the functionality of the Site.
          </p>

          <hr />

          <h2>6. Third-Party Links</h2>

          <p>
            Our Site may contain links to other websites. We are not responsible for the privacy practices or the content of those third-party sites. We encourage you to review the privacy policies of any external sites you visit.
          </p>

          <hr />

          <h2>7. Your Rights and Choices</h2>

          <p>You have the right to:</p>
          <ul>
            <li>Access, correct, or update your personal information</li>
            <li>Withdraw your consent to receive marketing communications</li>
            <li>Request the deletion of your personal information, subject to applicable law</li>
          </ul>

          <p>To exercise your rights, please contact us at the details provided below.</p>

          <hr />

          <h2>8. Children's Privacy</h2>

          <p>
            Our services are not intended for children under the age of 13, and we do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such information, we will take steps to delete it.
          </p>

          <hr />

          <h2>9. Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will post the updated Privacy Policy on this page with a new "Last Updated" date. Please review this policy periodically.
          </p>

          <hr />

          <h2>10. Contact Us</h2>

          <p>If you have any questions or concerns about this Privacy Policy or our practices, please contact us:</p>

          <p>
            <strong>Nexius Labs Pte Ltd</strong><br />
            Email: <a href="mailto:melverick@nexiuslabs.com">melverick@nexiuslabs.com</a><br />
            Phone: <a href="tel:+6589002130">+65-8900-2130</a>
          </p>

          <hr />

          <p className="text-sm text-gray-500">
            This Privacy Policy was last updated on 09th Apr 2025.
          </p>
        </div>
      </div>
    </div>
  );
}