import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

// Styled components
const BlogContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  background-color: #f4f4f4;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 15px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const AuthorAndDate = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 20px;
`;

const ShortDescription = styled.p`
  font-style: italic;
  color: #777;
`;

const ReadMoreButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const BlogContent = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
  text-align: justify;

  p {
    margin-bottom: 20px;
  }

  ul {
    list-style-type: disc;
    margin-left: 20px;
  }

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialShare = styled.div`
  margin: 20px 0;
`;

const SocialIcon = styled.a`
  margin-right: 10px;
  font-size: 1.5rem;
  color: #333;
  text-decoration: none;

  &:hover {
    color: #007bff;
  }
`;

const CommentSection = styled.div`
  margin-top: 40px;
  border-top: 2px solid #e0e0e0;
  padding-top: 20px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  color: #333;
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const CommentList = styled.div`
  margin-top: 20px;
`;

const Comment = styled.div`
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const HighlightedText = styled.span`
  font-weight: bold;
  color: #007bff;
`;

const BlogDetail = () => {
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const defaultBlogs = [
    {
      id: 1,
      title: "Trekking and Camping: A Perfect Adventure",
      author: "John Doe",
      date: "December 16, 2024",
      shortDescription: "Trekking and camping offer a great escape from daily life, reconnecting you with nature while challenging your body and mind.",
      fullContent: `
        Trekking and camping are the ultimate escape from the daily grind, offering an opportunity to reconnect with nature and experience adventure. Whether you're hiking through the mountains or setting up camp under the stars, these activities bring a sense of peace and thrill that's hard to match.

        <h2>Why Trekking and Camping?</h2>
        Trekking and camping are excellent ways to disconnect from the hustle and bustle of modern life. Some key benefits include:
        <ul>
          <li><HighlightedText>Physical Health:</HighlightedText> Trekking is great for cardiovascular health, muscle endurance, and overall fitness.</li>
          <li><HighlightedText>Mental Clarity:</HighlightedText> Spending time in nature can help clear your mind and reduce stress.</li>
          <li><HighlightedText>Adventure:</HighlightedText> Camping allows you to experience the outdoors, making new memories and connections with friends or family.</li>
        </ul>
      `,
    },
    {
        "id": 2,
        "title": "Essential Gear for Camping Adventures",
        "author": "Jane Smith",
        "date": "December 17, 2024",
        "shortDescription": "Planning a camping trip? Here's a guide to the essential gear you'll need for a comfortable and enjoyable experience.",
        "fullContent": `
          Camping is a fantastic way to explore the outdoors and create lasting memories. But before you head out, it's crucial to have the right gear. This guide will help you pack the essentials for a successful camping trip.
      
          <h2>Camping Essentials:</h2>
          <ul>
            <li>Tent: Choose a tent that suits the number of people and weather conditions you'll encounter.</li>
            <li>Sleeping bag: Select a sleeping bag with appropriate warmth rating for your destination.</li>
            <li>Sleeping pad: Provides insulation and comfort from the ground.</li>
            <li>Backpack: Choose a comfortable backpack that can carry all your gear.</li>
            <li>Cooking gear: Stove, pots, utensils, and fuel for preparing meals.</li>
            <li>Navigation tools: Map, compass, or GPS device to find your way around.</li>
            <li>First-aid kit: Be prepared for minor injuries.</li>
            <li>Sun protection: Sunscreen, hat, and sunglasses to shield yourself from the sun.</li>
            <li>Plenty of water and food: Stay hydrated and fueled for your adventures.</li>
          </ul>
        `
      },
    {
        "id": 3,
        "title": "Top Tips for Planning a Successful Camping Trip",
        "author": "Mike Jones",
        "date": "December 18, 2024",
        "shortDescription": "Planning a camping trip can be exciting, but it also requires some preparation. Here are some tips to ensure a smooth and enjoyable experience.",
        "fullContent": `
          Camping offers a unique opportunity to connect with nature and create lasting memories. However, proper planning is essential for a successful trip. Here are some tips to help you plan your next camping adventure:
      
          <h2>Planning Your Camping Trip:</h2>
          <ul>
            <li>Choose your destination: Consider factors like scenery, amenities, and difficulty level.</li>
            <li>Research and book campsites: Make reservations in advance, especially during peak season.</li>
            <li>Check the weather forecast: Pack appropriate clothing and gear based on the expected weather conditions.</li>
            <li>Plan your meals: Create a menu with easy-to-prepare and nutritious meals.</li>
            <li>Leave no trace: Respect the environment by practicing responsible camping principles.</li>
          </ul>
        `
      },
  ];

  // Fetch blog data from API on component mount
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('https://api.example.com/blogs'); // Replace with your API URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(true);
        setBlogs(defaultBlogs); // Fallback to default blogs in case of error
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const toggleBlogContent = (id) => {
    setExpandedBlogId((prevId) => (prevId === id ? null : id)); // Toggle blog content
  };

  const handleCommentSubmit = (blogId) => {
    if (newComment.trim()) {
      setComments({
        ...comments,
        [blogId]: [...(comments[blogId] || []), newComment],
      });
      setNewComment('');
    }
  };

  return (
    <>
      {loading && <p>Loading blogs...</p>}
      {error && !loading && <p>Error loading blogs. Showing default content.</p>}

      {blogs.map((blog) => (
        <BlogContainer key={blog.id}>
          <BlogTitle onClick={() => toggleBlogContent(blog.id)}>
            {blog.title}
          </BlogTitle>
          <AuthorAndDate>
            By <strong>{blog.author}</strong> | Published on {blog.date}
          </AuthorAndDate>

          {/* Short Description */}
          <ShortDescription>{blog.shortDescription}</ShortDescription>

          {/* Read More / Show Less Button */}
          <ReadMoreButton onClick={() => toggleBlogContent(blog.id)}>
            {expandedBlogId === blog.id ? "Show Less" : "Read More"}
          </ReadMoreButton>

          {/* Full Content - Show only if the blog is expanded */}
          {expandedBlogId === blog.id && (
            <BlogContent dangerouslySetInnerHTML={{ __html: blog.fullContent }} />
          )}

          {/* Social Media Share Buttons */}
          <SocialShare>
            <h3>Share this blog:</h3>
            <SocialIcon href={`https://www.facebook.com/sharer/sharer.php?u=http://your-website.com/${blog.id}`} target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
            </SocialIcon>
            <SocialIcon href={`https://twitter.com/intent/tweet?url=http://your-website.com/${blog.id}&text=${blog.title}`} target="_blank">
              <FontAwesomeIcon icon={faTwitter} />
            </SocialIcon>
            <SocialIcon href={`https://www.linkedin.com/shareArticle?mini=true&url=http://your-website.com/${blog.id}`} target="_blank">
              <FontAwesomeIcon icon={faLinkedin} />
            </SocialIcon>
          </SocialShare>

          {/* Comment Section for Each Blog */}
          <CommentSection>
            <h3>Comments:</h3>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <SubmitButton onClick={() => handleCommentSubmit(blog.id)}>Submit Comment</SubmitButton>

            <CommentList>
              {(comments[blog.id] || []).map((comment, index) => (
                <Comment key={index}>{comment}</Comment>
              ))}
            </CommentList>
          </CommentSection>
        </BlogContainer>
      ))}
    </>
  );
};

export default BlogDetail;
