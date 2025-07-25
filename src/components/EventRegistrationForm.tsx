```typescript
import React, { useState } from 'react';
import { X, User, Mail, Phone, Link as LinkIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { loadStripe } from '@stripe/stripe-js';
import type { Event } from '../types/database';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface EventRegistrationFormProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export function EventRegistrationForm({ event, isOpen, onClose }: EventRegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    linkedIn: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      // Create registration record first
      const { data, error } = await supabase
        .from('event_registrations')
        .insert([
          {
            event_id: event.id,
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            job_title: formData.jobTitle,
            linkedin_url: formData.linkedIn,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Failed to create registration. Please try again.');
      }
      
      if (!data) {
        throw new Error('Failed to create registration record');
      }
      
      // If event has a ticket price, initiate Stripe payment
      if (event.ticket_price) {
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe failed to load');

        // Create Stripe checkout session
        const response = await fetch(\`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': \`Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
          },
          body: JSON.stringify({
            eventId: event.id,
            registrationId: data.id,
            ticketPrice: event.ticket_price,
            customerEmail: formData.email,
            eventTitle: event.title
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const { sessionId } = await response.json();
        
        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId,
        });

        if (result.error) {
          throw result.error;
        }

        return; // Don't close form or show success message yet
      }

      alert('Registration successful! You will receive a confirmation email shortly.');
      onClose();
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        linkedIn: '',
      });
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Error submitting registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-text">
              {event.ticket_price 
                ? \`Register for Event - $${event.ticket_price}`
                : 'Register for Event'
              }
            </h2>
            <button
              onClick={onClose}
              className="text-muted hover:text-text transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-muted mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="pl-10 pr-3 py-2 w-full border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-text"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="pl-10 pr-3 py-2 w-full border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-text"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-muted mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="pl-10 pr-3 py-2 w-full border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-text"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-muted mb-1">
                Company/School
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="px-3 py-2 w-full border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-text"
                placeholder="Enter your company or school name"
              />
            </div>

            {/* Job Title */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-muted mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                className="px-3 py-2 w-full border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-text"
                placeholder="Enter your job title"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label htmlFor="linkedIn" className="block text-sm font-medium text-muted mb-1">
                LinkedIn Profile
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
                <input
                  type="url"
                  id="linkedIn"
                  value={formData.linkedIn}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedIn: e.target.value }))}
                  className="pl-10 pr-3 py-2 w-full border border-surface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background text-text"
                  placeholder="Enter your LinkedIn profile URL"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-display font-semibold tracking-wide uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Request to Join'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
```