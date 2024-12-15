import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');
  const [loading, setLoading] = useState(true);

  // Default events in case the API fails
  const defaultEvents = [
    {
      eventName: 'Mountain Hiking',
      date: new Date(2024, 11, 25, 9, 0),
      duration: 120,
      description: 'A great hiking trip to the mountains.',
      location: 'Mountain Range, ABC',
      image: 'https://picsum.photos/500/300?random=1'
    },
    {
      eventName: 'Beach Camping',
      date: new Date(2024, 11, 30, 16, 0),
      duration: 180,
      description: 'Camping by the beach with bonfires.',
      location: 'Coastal Beach, XYZ',
      image: 'https://picsum.photos/500/300?random=2'
    }
  ];

  // Fetch events data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Mock API call (replace this with your actual API endpoint)
        const response = await fetch('https://api.example.com/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents(defaultEvents); // Use default events if there's an error
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      const upcomingEvent = events.filter(event => event.date >= new Date())[0];
      if (upcomingEvent) {
        const now = new Date();
        const timeDiff = upcomingEvent.date - now;

        if (timeDiff <= 0) {
          clearInterval(interval);
          setTimeLeft('Event Started');
        } else {
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup the interval when the component is unmounted
  }, [events]);

  // Separate upcoming and past events
  const today = new Date();
  const upcomingEvents = events.filter(event => new Date(event.date) >= today);
  const pastEvents = events.filter(event => new Date(event.date) < today);

  // Function to generate ICS file for event and allow user to save to calendar
  const saveToCalendar = (event) => {
    const { eventName, date, description, location, duration } = event;

    // Calculate end time based on duration
    const endDate = new Date(date.getTime() + duration * 60000); // Duration in minutes

    // Create the ICS file content
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventName}
DTSTART:${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}00Z
DTEND:${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, '0')}${String(endDate.getDate()).padStart(2, '0')}T${String(endDate.getHours()).padStart(2, '0')}${String(endDate.getMinutes()).padStart(2, '0')}00Z
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    // Create a Blob for the ICS file and trigger download
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${eventName}_${new Date(date).toLocaleDateString()}.ics`; // Set file name
    link.click();
    URL.revokeObjectURL(url); // Clean up
  };

  if (loading) {
    return (
        <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-message">Loading Events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-transparent shadow-lg p-6">
        <h1 className="text-4xl font-bold text-center text-gray-900">Camping & Trekking Events</h1>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Upcoming Events</h2>
        </div>

        {/* Event List Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {upcomingEvents.length === 0 ? (
            <p className="text-center text-gray-600">No upcoming events. Please check back later!</p>
          ) : (
            upcomingEvents.map((event, index) => (
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
                <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}</p>
                <p className="mt-2 text-gray-600">{event.description}</p>
                <p className="mt-2 text-sm text-gray-500">Location: {event.location}</p>
                <div className="mt-4">
                  <h4 className="text-lg font-bold text-gray-700">Time Left:</h4>
                  <div className="text-3xl font-semibold">{timeLeft}</div>
                </div>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => saveToCalendar(event)} // Save event to calendar
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Save to Calendar
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        {/* Past Events Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {pastEvents.length === 0 ? (
              <p className="text-center text-gray-600">No past events found.</p>
            ) : (
              pastEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-70"
                >
                  <img 
                    src={event.image || 'https://picsum.photos/500/300'} 
                    alt={event.eventName} 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-500">{event.eventName}</h3>
                  <p className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}</p>
                  <p className="mt-2 text-gray-400">{event.description}</p>
                  <p className="mt-2 text-sm text-gray-400">Location: {event.location}</p>
                </div>
              ))
            )}
          </section>
        </div>

        {/* Optional Calendar Display */}
        
      </main>
    </div>
  );
};

export default EventPage;
