import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, fetchComments, selectSearchTerm } from './redditSlice';
import Post from '../../components/Post/Post';
const Posts = () => {
    const dispatch = useDispatch();

    const { posts, isLoading, error, selectedSubreddit, searchTerm } = useSelector((state) => state.reddit);
    //const searchTerm = useSelector(selectSearchTerm);

    useEffect(() => {
        dispatch(fetchPosts({ subreddit: selectedSubreddit, searchTerm }));
    }, [selectedSubreddit, searchTerm, dispatch]);

    const handleToggleComments = (index, permalink) => {
        dispatch(fetchComments({ index, permalink }));
    };

    if (isLoading) return <div className="status">Loading posts...</div>;
    if (error) return <div className="status">Error loading posts. Please try again.</div>;
    
    if (posts.length === 0) {
        return <div className="status">No posts found for "{searchTerm}"</div>;
    }

    return (
        <section className="posts-container">
            {posts.map((post, index) => (
                <Post
                    key={post.id}
                    post={post}
                    onToggleComments={(permalink) => handleToggleComments(index, permalink)}
                />
            ))}
        </section>
    );
};

export default Posts;