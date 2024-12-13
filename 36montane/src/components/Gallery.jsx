import React, { useState, useEffect, useRef } from "react";
import "../style/Recenttrips.css";

// Sample data with both videos and photos
const recentTripsData = [
  { 
    id: 1, 
    title: "Trip to Paris", 
    mediaUrl: "https://www.youtube.com/embed/krhFY8LTWRs", // YouTube video URL
    thumbnail: "https://picsum.photos/500/300?random=1",
    type: "video", // Video type
    platform: "youtube", // Platform for video
  },
  { 
    id: 2, 
    title: "Hiking in the Alps", 
    mediaUrl: "https://www.youtube.com/embed/lZVDV3rCs9g", // YouTube video URL
    thumbnail: "https://picsum.photos/500/300?random=2",
    type: "video", // Video type
    platform: "youtube", // Platform for video
  },
  { 
    id: 3, 
    title: "Beach Vibes in Bali", 
    mediaUrl: "https://www.instagram.com/p/CVtWQ-vFZzw/embed", // Instagram reel URL
    thumbnail: "https://picsum.photos/500/300?random=3",
    type: "video", // Video type
    platform: "instagram", // Platform for video
  },
  { 
    id: 4, 
    title: "Sunset at the Beach", 
    mediaUrl: "https://picsum.photos/500/300?random=4", // Photo URL
    thumbnail: "https://picsum.photos/500/300?random=4",
    type: "photo", // Photo type
  },
  { 
    id: 5, 
    title: "Mountain Adventure", 
    mediaUrl: "https://picsum.photos/500/300?random=5", // Photo URL
    thumbnail: "https://picsum.photos/500/300?random=5",
    type: "photo", // Photo type
  },
];

const RecentTrips = () => {
  const [playingMedia, setPlayingMedia] = useState(null); // To store the media URL that is being played
  const [visible, setVisible] = useState(new Array(recentTripsData.length).fill(true)); // Make sure all thumbnails are visible
  const [filter, setFilter] = useState("all"); // Filter state to manage video/photo categories

  const observerRef = useRef(null);

  // Handle play media (video or photo)
  const handlePlayMedia = (mediaUrl) => {
    setPlayingMedia(mediaUrl);
  };

  // Handle close media player
  const handleCloseMedia = () => {
    setPlayingMedia(null);
  };

  // Lazy load thumbnails using Intersection Observer
  useEffect(() => {
    const options = {
      root: null, // Relative to viewport
      rootMargin: "0px",
      threshold: 0.1, // Load image when 10% is visible
    };

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setVisible((prevState) => {
              const newState = [...prevState];
              newState[index] = true; // Set only the visible thumbnail index
              return newState;
            });
          }
        });
      }, options);
    }

    // Observe the images
    const imgElements = document.querySelectorAll(".media-thumbnail");
    imgElements.forEach((img) => observerRef.current.observe(img));

    // Cleanup the observer on component unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Handle category filtering (All, Video, Photo)
  const handleFilterChange = (category) => {
    setFilter(category);
  };

  // Filter data based on selected category
  const filteredData = recentTripsData.filter((trip) => {
    if (filter === "all") return true;
    return trip.type === filter;
  });

  return (
    <div className="recent-trips-container">
      <h2 className="section-title">Recent Trip Reels, Videos & Photos</h2>

      {/* Category Filter */}
      <div className="filter-buttons">
        <button
          onClick={() => handleFilterChange("all")}
          className={`filter-button ${filter === "all" ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("video")}
          className={`filter-button ${filter === "video" ? "active" : ""}`}
        >
          Videos
        </button>
        <button
          onClick={() => handleFilterChange("photo")}
          className={`filter-button ${filter === "photo" ? "active" : ""}`}
        >
          Photos
        </button>
      </div>

      <div className="media-grid">
        {filteredData.map((trip, index) => (
          <div key={trip.id} className="media-card">
            <div className="media-thumbnail-container">
              {visible[index] ? (
                <img
                  className="media-thumbnail"
                  src={trip.thumbnail}
                  alt={`Thumbnail for ${trip.title}`}
                  onClick={() => handlePlayMedia(trip.mediaUrl)}
                  loading="lazy" // Lazy load image to improve performance
                />
              ) : (
                <div className="thumbnail-placeholder">Loading...</div>
              )}
            </div>
            <h3 className="media-title">{trip.title}</h3>

           

            <button
              className="play-button"
              onClick={(e) => {
                e.preventDefault();
                handlePlayMedia(trip.mediaUrl);
              }}
              aria-label={`View ${trip.title}`}
            >
            
              {trip.type === "video" ?  <span className="play-icon">▶</span> : ""}
              {trip.type === "video" ? "Play Video" : "View Photo"}
            </button>
          </div>
        ))}
      </div>

      {/* Display media player if a media is being played */}
      {playingMedia && (
        <div className="media-player-overlay">
          <div className="media-player-container">
            <button
              className="close-button"
              onClick={handleCloseMedia}
              aria-label="Close media player"
            >
              X
            </button>

            {/* Check if the playing media is video or photo */}
            {playingMedia.includes("youtube") || playingMedia.includes("instagram") ? (
              <iframe
                width="100%"
                height="315"
                src={playingMedia}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Media player"
              ></iframe>
            ) : (
              <img
                src={playingMedia}
                alt="Full-size view"
                className="full-size-photo"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTrips;
