```typescript
import React from 'react';
import { MapPin, Users, ChevronRight, Calendar, Clock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Event } from '../types/database';

interface EventsListProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
}

export function EventsList({ events, onEventClick }: EventsListProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleEventClick = (event: Event) => {
    if (location.pathname === '/admin') {
      onEventClick?.(event);
    } else {
      navigate(`/event/${event.slug}`);
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          onClick={() => handleEventClick(event)}
          className="bg-surface rounded-lg shadow-sm border border-surface p-4 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4">
            {/* Event Image */}
            <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden bg-surface flex-shrink-0">
              {event.featured_image ? (
                <img
                  src={event.featured_image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-surface flex items-center justify-center">
                  <span className="text-muted text-xs">No Image</span>
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <div className="sm:hidden mb-2">
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    event.status === 'published'
                      ? 'bg-primary/20 text-primary'
                      : event.status === 'draft'
                      ? 'bg-surface text-text'
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-text mb-1">{event.title}</h3>
                  <div className="flex items-center text-sm text-muted mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                </div>
                <div className="hidden sm:flex items-center self-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    event.status === 'published'
                      ? 'bg-primary/20 text-primary'
                      : event.status === 'draft'
                      ? 'bg-surface text-text'
                      : 'bg-red-500/20 text-red-500'
                  }`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                  <ChevronRight className="h-5 w-5 text-muted ml-2" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div className="text-sm text-muted">
                  {formatDateTime(event.start_date)}
                </div>
                <div className="flex items-center text-sm text-muted">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{event.capacity ? `${event.capacity} seats` : 'Unlimited'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```