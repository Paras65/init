import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, isBefore, addMinutes } from 'date-fns';
import { CircularProgress } from '@mui/material';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const defaultEvents = [
    {
      eventName: 'Mountain Hiking',
      date: new Date(2024, 11, 25, 9, 0),
      duration: 120,
      description: 'A great hiking trip to the mountains.',
      location: 'Mountain Range, ABC',
      image: 'https://picsum.photos/500/300?random=1',
    },
    {
      eventName: 'Beach Camping',
      date: new Date(2024, 11, 30, 16, 0),
      duration: 180,
      description: 'Camping by the beach with bonfires.',
      location: 'Coastal Beach, XYZ',
      image: 'https://picsum.photos/500/300?random=2',
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents(defaultEvents);
        setError('Failed to load events. Showing default events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const updateTimeLeft = () => {
      const updatedTimeLeft = {};

      events.forEach((event) => {
        const eventTime = new Date(event.date);
        const now = new Date();
        const timeDiff = eventTime - now;

        if (timeDiff <= 0) {
          updatedTimeLeft[event.eventName] = 'Event Started';
        } else {
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          updatedTimeLeft[event.eventName] = `${hours}h ${minutes}m ${seconds}s`;
        }
      });

      setTimeLeft(updatedTimeLeft);
    };

    const interval = setInterval(updateTimeLeft, 1000);
    updateTimeLeft();

    return () => clearInterval(interval);
  }, [events]);

  const today = new Date();
  const upcomingEvents = events.filter((event) => new Date(event.date) >= today);
  const pastEvents = events.filter((event) => new Date(event.date) < today);

  const filteredEvents = selectedDate
    ? events.filter(
        (event) => format(new Date(event.date), 'MM/dd/yyyy') === format(selectedDate, 'MM/dd/yyyy')
      )
    : upcomingEvents;

  const saveToCalendar = (event) => {
    const { eventName, date, description, location, duration } = event;
    const endDate = addMinutes(date, duration);

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventName}
DTSTART:${format(date, 'yyyyMMdd\'T\'HHmmss\'Z\'')}
DTEND:${format(endDate, 'yyyyMMdd\'T\'HHmmss\'Z\'')}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${eventName}_${format(date, 'MM-dd-yyyy')}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const resetDate = () => {
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <header className="bg-transparent shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-900">Upcoming Events</h1>
      </header>

      <main className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row justify-between gap-8">
        {/* Left Side: Calendar Section */}
        <section className="w-full md:w-1/3 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Select a Date</h2>
          <div className="flex justify-center mb-6">
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileClassName="calendar-tile"
              prevLabel={<span className="text-2xl text-blue-600">←</span>}
              nextLabel={<span className="text-2xl text-blue-600">→</span>}
            />
          </div>
          <div className="text-center">
            <button
              onClick={resetDate}
              className="bg-blue-600 text-white px-8 py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
              aria-label="Reset Date"
            >
              Reset Date
            </button>
          </div>
        </section>

        {/* Right Side: Events Section */}
        <section className="w-full md:w-2/3">
          {/* Loading or error states */}
          {loading && (
            <div className="loading-container text-center">
              <CircularProgress className="loading-spinner" />
              <p className="loading-message">Loading events...</p>
            </div>
          )}

          {error && !loading && (
            <div className="error-container text-center text-red-500">
              <p>{error}</p>
            </div>
          )}

          {/* Event List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredEvents.length === 0 && !loading ? (
              <p className="text-center text-gray-600">No events found for this date.</p>
            ) : (
              filteredEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={event.image || 'https://picsum.photos/500/300'}
                    alt={event.eventName}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold">{event.eventName}</h3>
                  <p className="text-sm text-gray-500">
                    {format(new Date(event.date), 'MM/dd/yyyy')} at {format(new Date(event.date), 'hh:mm a')}
                  </p>
                  <p className="mt-2 text-gray-600">{event.description}</p>
                  <p className="mt-2 text-sm text-gray-500">Location: {event.location}</p>
                  <div className="mt-4">
                    <h4 className="text-lg font-bold text-gray-700">Time Left:</h4>
                    <div className="text-3xl font-semibold">{timeLeft[event.eventName]}</div>
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => saveToCalendar(event)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                      aria-label={`Save ${event.eventName} to calendar`}
                    >
                      Save to Calendar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default EventPage;
