import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, fetchPosts, selectSearchTerm } from '../posts/redditSlice'; 
import './SearchBar.css';

function SearchBar() {
    const dispatch = useDispatch();
    const reduxSearchTerm = useSelector(selectSearchTerm);
    
    // Local state for what the user is currently typing
    const [localTerm, setLocalTerm] = useState('');

    //Listen for when Redux clears the search term (like when clicking a subreddit)
    useEffect(() => {
        if (reduxSearchTerm === '') {
            setLocalTerm('');
        }
    }, [reduxSearchTerm]);

    const onSearchChange = (event) => {
        setLocalTerm(event.target.value);
    };

    const onSearchSubmit = (event) => {
        event.preventDefault();
        dispatch(setSearchTerm(localTerm));
        dispatch(fetchPosts({ subreddit: '', searchTerm: localTerm }));
    };

    return (
        <form className="search-form" onSubmit={onSearchSubmit}>
            <input
                type="text"
                value={localTerm}
                onChange={onSearchChange}
                placeholder="Search Reddit"
            />
            <button type="submit">🔍</button>
        </form>
    );
};

export default SearchBar;