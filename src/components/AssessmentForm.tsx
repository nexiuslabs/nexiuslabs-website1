import React, { useState } from 'react';
import { User, Mail, Building, FileText, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function AssessmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    currentTools: '',
    biggestTimeDrain: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      // Combine the assessment data into the message field
      const assessmentMessage = `Current Tools: ${formData.currentTools}\n\nBiggest Time Drain: ${formData.biggestTimeDrain}`;

      // Insert into Supabase leads table
      const { error } = await supabase
        .from('leads')
        .insert([
          {
            first_name: formData.name.split(' ')[0],
            last_name: formData.name.split(' ').slice(1).join(' ') || null,
            email: formData.email,
            message: assessmentMessage,
            status: 'new'
          }
        ]);

      if (error) throw error;

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
            firstName: formData.name.split(' ')[0]
          })
        });

        if (!response.ok) {
          throw new Error('Failed to send confirmation email');
        }
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Continue with form submission even if email fails
      }

      alert('Thank you! We\'ll reply within 1 business day with your custom proposal.');
      setFormData({
        name: '',
        email: '',
        company: '',
        currentTools: '',
        biggestTimeDrain: '',
      });
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Error submitting assessment. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="assessment" className="py-24 bg-nexius-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Get Your Custom Automation Plan
            </h2>
            <p className="text-white/80 text-lg">
              Tell us about your current setup and we'll show you exactly what to automate first.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-nexius-navy mb-2">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-nexius-navy mb-2">
                    Email *
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
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-nexius-navy mb-2">
                  Company *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="currentTools" className="block text-sm font-medium text-nexius-navy mb-2">
                  Current Tools
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    id="currentTools"
                    name="currentTools"
                    rows={3}
                    value={formData.currentTools}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                    placeholder="What tools do you currently use for leads, sales, invoicing, etc.?"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="biggestTimeDrain" className="block text-sm font-medium text-nexius-navy mb-2">
                  Biggest Time Drain
                </label>
                <div className="relative">
                  <AlertTriangle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    id="biggestTimeDrain"
                    name="biggestTimeDrain"
                    rows={3}
                    value={formData.biggestTimeDrain}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nexius-teal focus:border-nexius-teal"
                    placeholder="What repetitive tasks take up most of your time?"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-nexius-teal text-white py-4 rounded-lg hover:bg-nexius-teal/90 transition-colors font-display font-semibold tracking-wide uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Request My Proposal'}
              </button>

              <p className="text-center text-sm text-gray-600">
                We'll reply within 1 business day.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}