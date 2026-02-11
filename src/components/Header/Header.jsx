import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedSubreddit, fetchPosts } from '../../features/posts/redditSlice'; 
import SearchBar from '../../features/search/SearchBar';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    try {

      dispatch(setSelectedSubreddit('/r/popular'));
      
      dispatch(fetchPosts({ subreddit: '/r/popular', searchTerm: '' }));
      
      navigate('/');
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <span className="reddit-text">Reddit</span>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;