import React from 'react';
import SearchBar from '../../features/search/SearchBar';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span className="reddit-text">Reddit</span>
      </div>
      <SearchBar />
    </header>
  );
};

export default Header;