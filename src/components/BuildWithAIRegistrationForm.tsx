import React, { useState } from 'react';
import { X, User, Mail, Phone, Building, Lightbulb } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface BuildWithAIRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  cohort: string;
}

export function BuildWithAIRegistrationForm({ isOpen, onClose, cohort }: BuildWithAIRegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectIdea: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateEmail = (email: string): boolean => {
    // Email validation regex that exactly matches the database constraint for workshop_registrations
    // Pattern: ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    
    // Additional validation to ensure no invalid characters
    const trimmedEmail = email.trim();
    
    // Check for common issues that might cause database constraint violations
    if (trimmedEmail !== email) {
      return false; // Leading/trailing whitespace
    }
    
    if (trimmedEmail.includes('..')) {
      return false; // Consecutive dots
    }
    
    if (trimmedEmail.startsWith('.') || trimmedEmail.includes('@.') || trimmedEmail.includes('.@')) {
      return false; // Dots in wrong positions
    }
    
    return emailRegex.test(trimmedEmail);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate email format
    if (!validateEmail(formData.email)) {
      alert('Please enter a valid email address. Email must contain only letters, numbers, and the characters . _ % + - in the local part, and letters, numbers, . - in the domain part.');
      return;
    }

    try {
      setLoading(true);

      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : null;

      // Clean and prepare data for database insertion
      const registrationData = {
        first_name: firstName,
        last_name: lastName,
        email: formData.email.trim().toLowerCase(), // Normalize email
        phone: formData.phone.trim() || null,
        company: formData.company.trim() || null,
        project_idea: formData.projectIdea.trim() || null,
        cohort: cohort,
        status: 'pending'
      };

      // Insert into Supabase
      const { error } = await supabase
        .from('workshop_registrations')
        .insert([registrationData]);

      if (error) {
        console.error('Database error:', error);
        if (error.code === '23514' && error.message.includes('valid_email')) {
          alert('The email address format is not accepted. Please ensure your email contains only standard characters (letters, numbers, and . _ % + - symbols).');
        } else {
          throw error;
        }
        return;
      }

      // Send confirmation email
      try {
        const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-confirmation-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            to: formData.email,
            firstName: firstName
          })
        });

        if (!response.ok) {
          throw new Error('Failed to send confirmation email');
        }
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Continue with form submission even if email fails
      }

      alert('Thank you for registering! We will be in touch with payment details and further instructions shortly.');
      onClose();
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        projectIdea: '',
      });
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Error submitting registration. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Register for Workshop
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {cohort} - Build With AI for Non‑Coders
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company/Organization
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your company or organization"
                />
              </div>
            </div>

            <div>
              <label htmlFor="projectIdea" className="block text-sm font-medium text-gray-700 mb-1">
                Brief Description of Your Project Idea
              </label>
              <div className="relative">
                <Lightbulb className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  id="projectIdea"
                  name="projectIdea"
                  rows={4}
                  value={formData.projectIdea}
                  onChange={handleChange}
                  className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="What kind of app would you like to build?"
                />
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-medium text-indigo-900 mb-2">What's Next?</h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• We'll email you PayNow details within 24 hours</li>
                <li>• Your seat is secured once payment is received</li>
                <li>• You'll receive workshop materials 1 week before</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Register for Workshop'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}