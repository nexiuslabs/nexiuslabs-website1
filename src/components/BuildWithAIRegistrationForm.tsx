import React, { useState } from 'react';
import { X, User, Mail, Phone, Building, Lightbulb, AlertCircle, CheckCircle2 } from 'lucide-react';
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
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const validateField = (fieldName: string, value: string) => {
    let error = '';

    switch (fieldName) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (value.trim().length < 2) {
          error = 'Full name must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email address is required';
        } else {
          const emailValidation = validateEmail(value);
          if (!emailValidation.isValid) {
            error = emailValidation.message;
          }
        }
        break;

      case 'phone':
        if (value.trim() && !validatePhone(value)) {
          error = 'Please enter a valid phone number (e.g., +65 1234 5678)';
        }
        break;
    }

    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));

    return error === '';
  };

  const validateEmail = (email: string): { isValid: boolean; message: string } => {
    const cleanEmail = email.trim();
    
    if (!cleanEmail) {
      return { isValid: false, message: 'Email address is required' };
    }

    // Check for basic format
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      return { 
        isValid: false, 
        message: 'Please enter a valid email format (e.g., name@example.com)' 
      };
    }

    // Check for consecutive dots
    if (cleanEmail.includes('..')) {
      return { 
        isValid: false, 
        message: 'Email cannot contain consecutive dots (..)' 
      };
    }

    // Check for dots at start or end
    if (cleanEmail.startsWith('.') || cleanEmail.endsWith('.')) {
      return { 
        isValid: false, 
        message: 'Email cannot start or end with a dot' 
      };
    }

    // Check for dots around @
    if (cleanEmail.includes('@.') || cleanEmail.includes('.@')) {
      return { 
        isValid: false, 
        message: 'Email cannot have dots immediately before or after @' 
      };
    }

    // Check for valid domain
    const parts = cleanEmail.split('@');
    if (parts.length !== 2) {
      return { 
        isValid: false, 
        message: 'Email must contain exactly one @ symbol' 
      };
    }

    const [localPart, domain] = parts;
    if (localPart.length === 0) {
      return { 
        isValid: false, 
        message: 'Email must have text before the @ symbol' 
      };
    }

    if (domain.length === 0 || !domain.includes('.')) {
      return { 
        isValid: false, 
        message: 'Email must have a valid domain (e.g., gmail.com)' 
      };
    }

    return { isValid: true, message: '' };
  };

  const validatePhone = (phone: string): boolean => {
    // Basic phone validation - allows various formats
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,20}$/;
    return phoneRegex.test(phone.trim());
  };

  const getFieldState = (fieldName: keyof typeof errors) => {
    const hasError = errors[fieldName] && touched[fieldName];
    const isValid = !errors[fieldName] && touched[fieldName] && formData[fieldName].trim();
    
    return {
      hasError,
      isValid,
      className: hasError 
        ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
        : isValid 
        ? 'border-green-300 bg-green-50 focus:ring-green-500 focus:border-green-500'
        : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
    });

    // Validate all fields
    const isFullNameValid = validateField('fullName', formData.fullName);
    const isEmailValid = validateField('email', formData.email);
    const isPhoneValid = validateField('phone', formData.phone);

    if (!isFullNameValid || !isEmailValid || !isPhoneValid) {
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
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        company: formData.company.trim() || null,
        project_idea: formData.projectIdea.trim() || null,
        cohort: cohort,
        status: 'pending'
      };

      console.log('Submitting registration data:', registrationData);

      // Insert into Supabase
      const { error } = await supabase
        .from('workshop_registrations')
        .insert([registrationData]);

      if (error) {
        console.error('Database error:', error);
        
        // Handle specific database errors
        if (error.code === '23514') {
          if (error.message.includes('valid_email')) {
            setErrors(prev => ({
              ...prev,
              email: 'This email format is not accepted by our system. Please contact support if you believe this is an error.'
            }));
          } else {
            throw new Error('Data validation failed. Please check your information and try again.');
          }
        } else if (error.code === '23505') {
          // Duplicate key error
          setErrors(prev => ({
            ...prev,
            email: 'This email is already registered for this cohort.'
          }));
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
      setErrors({
        fullName: '',
        email: '',
        phone: '',
      });
      setTouched({
        fullName: false,
        email: false,
        phone: false,
      });
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Error submitting registration. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Check if form is valid for submission
  const isFormValid = formData.fullName.trim() && 
                     formData.email.trim() && 
                     !errors.fullName && 
                     !errors.email && 
                     !errors.phone;

  const fullNameState = getFieldState('fullName');
  const emailState = getFieldState('email');
  const phoneState = getFieldState('phone');

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
            {/* Full Name */}
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
                  onBlur={handleBlur}
                  className={`pl-10 pr-10 py-2 w-full border rounded-lg focus:ring-2 transition-colors ${fullNameState.className}`}
                  placeholder="Enter your full name"
                />
                {fullNameState.isValid && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
              {errors.fullName && touched.fullName && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                  {errors.fullName}
                </div>
              )}
            </div>

            {/* Email */}
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
                  onBlur={handleBlur}
                  className={`pl-10 pr-10 py-2 w-full border rounded-lg focus:ring-2 transition-colors ${emailState.className}`}
                  placeholder="Enter your email"
                />
                {emailState.isValid && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
              {errors.email && touched.email && (
                <div className="mt-1 flex items-start text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
                  <span>{errors.email}</span>
                </div>
              )}
              {emailState.isValid && (
                <div className="mt-1 flex items-center text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Email format is valid
                </div>
              )}
            </div>

            {/* Phone */}
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
                  onBlur={handleBlur}
                  className={`pl-10 pr-10 py-2 w-full border rounded-lg focus:ring-2 transition-colors ${phoneState.className}`}
                  placeholder="Enter your phone number"
                />
                {phoneState.isValid && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
              {errors.phone && touched.phone && (
                <div className="mt-1 flex items-center text-sm text-red-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.phone}
                </div>
              )}
            </div>

            {/* Company */}
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

            {/* Project Idea */}
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
              disabled={loading || !isFormValid}
              className={`w-full py-3 rounded-lg transition-all font-semibold ${
                loading || !isFormValid
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Register for Workshop'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}