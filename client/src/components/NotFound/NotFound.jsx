import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegQuestionCircle } from 'react-icons/fa';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <FaRegQuestionCircle className="not-found-icon" />
      <h1>404 - Page Not Found</h1>
      <p>The subreddit or post you're looking for doesn't exist or has been moved.</p>
      <button className="back-home-btn" onClick={() => navigate('/')}>
        Go Back to Popular
      </button>
    </div>
  );
};

export default NotFound;