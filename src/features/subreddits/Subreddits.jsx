import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubreddits, selectSubreddits } from './subredditsSlice';
import { setSelectedSubreddit, fetchPosts } from '../posts/redditSlice';
import './Subreddits.css';

const Subreddits = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const subreddits = useSelector(selectSubreddits);

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    return (
        <div className="subreddits-card">
            <h2>Subreddits</h2>
            <ul className="subreddits-list">
                {subreddits.map((subreddit) => (
                    <li key={subreddit.id}>
                        <button
                            type="button"
                            onClick={() => {
                                dispatch(setSelectedSubreddit(subreddit.url));
                                dispatch(fetchPosts({ subreddit: subreddit.url, searchTerm: '' }));
                                navigate('/');
                            }}
                        >
                            <img
                                src={subreddit.icon_img || `https://api.dicebear.com/7.x/identicon/svg?seed=${subreddit.display_name}`}
                                alt={`${subreddit.display_name}`}
                                className="subreddit-icon"
                            />
                            {subreddit.display_name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Subreddits;