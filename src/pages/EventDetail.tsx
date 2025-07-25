```typescript
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { supabase } from '../lib/supabase';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { EventRegistrationForm } from '../components/EventRegistrationForm';
import type { Event } from '../types/database';

export function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [slug]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error('Error loading event:', error);
      setError('Failed to load event details.');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background py-32 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-display font-bold text-text mb-4">
            Event Not Found
          </h1>
          <Link
            to="/events"
            className="inline-flex items-center text-primary hover:text-primary-dark"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-background py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <Link 
            to="/events" 
            className="inline-flex items-center text-muted hover:text-text pt-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Events
          </Link>
          
          <div className="flex flex-col justify-center mt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className={\`px-3 py-1 rounded-full text-sm font-medium ${
                event.status === 'published'
                  ? 'bg-primary/20 text-primary'
                  : 'bg-surface text-text') + ' px-3 py-1 rounded-full text-sm font-medium'}>
                {event.event_type.charAt(0).toUpperCase() + event.event_type.slice(1)}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white max-w-4xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Featured Image */}
            <div className="space-y-8">
              {event.featured_image && (
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-surface">
                  <img
                    src={event.featured_image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {event.description && (
                <div className="prose max-w-none mb-8">
                  <p className="text-lg text-muted leading-relaxed">{event.description}</p>
                </div>
              )}

              {event.content && (
                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: event.content }} />
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-24 bg-surface rounded-xl p-4 md:p-6 space-y-6">
              <div>
                <h3 className="text-lg font-display font-bold text-text mb-4">
                  Event Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-text">Date & Time</div>
                      <div className="text-muted break-words">
                        {formatDateTime(event.start_date)}
                        {' - '}
                        {formatDateTime(event.end_date)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-text">Location</div>
                      <div className="text-muted break-words">{event.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-surface">
                <button
                  onClick={() => setShowRegistration(true)}
                  className="block w-full bg-primary text-white text-center px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-display font-semibold tracking-wide uppercase text-sm"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <EventRegistrationForm
        event={event}
        isOpen={showRegistration}
        onClose={() => setShowRegistration(false)}
      />
    </div>
  );
}
```