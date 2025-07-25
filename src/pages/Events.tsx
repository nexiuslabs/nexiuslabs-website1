```typescript
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { EventsList } from '../components/EventsList';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import type { Event } from '../types/database';

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    loadEvents();
  }, [filter]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const query = supabase
        .from('events')
        .select('*')
        .order('start_date', { ascending: filter === 'upcoming' });

      // Add date filter based on selection
      if (filter === 'upcoming') {
        query.gte('end_date', new Date().toISOString());
      } else {
        query.lt('end_date', new Date().toISOString());
      }

      const { data, error } = await query;

      if (error) {
        setError('Failed to load events. Please try again later.');
        console.error('Error loading events:', error);
        throw error;
      }
      
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-background to-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight">
              Upcoming Events
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Join us for workshops, webinars, and conferences focused on AI innovation and business transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Events List Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-surface p-1">
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'upcoming'
                    ? 'bg-primary text-white'
                    : 'text-muted hover:text-text'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filter === 'past'
                    ? 'bg-primary text-white'
                    : 'text-muted hover:text-text'
                }`}
              >
                Past
              </button>
            </div>
          </div>
          {error ? (
            <div className="text-center py-16">
              <div className="text-red-500 mb-4">{error}</div>
              <button onClick={loadEvents} className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">Try Again</button>
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl font-display font-bold text-text mb-4">
                No {filter === 'upcoming' ? 'Upcoming' : 'Past'} Events
              </h2>
              <p className="text-muted max-w-md mx-auto mb-6">
                {filter === 'upcoming' 
                  ? 'Check back soon for our upcoming events and workshops.'
                  : 'No past events to display at this time.'}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid gap-6">
                <EventsList events={events} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Want to Learn More?
          </h2>
          <p className="text-muted mb-8 max-w-2xl mx-auto">
            Schedule a discovery call to discuss how our AI solutions can help transform your business.
          </p>
          <a 
            href="https://tidycal.com/melverick/discovery-call-via-zoom-30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center font-display font-semibold tracking-wide uppercase text-sm"
          >
            Schedule A Call <Clock className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}

export { Events }
```