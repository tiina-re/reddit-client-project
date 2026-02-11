import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchPosts } from './redditSlice';
import Post from '../../components/Post/Post';
import PostSkeleton from '../../components/Loading/PostSkeleton';

const Posts = () => {
    const dispatch = useDispatch();
    const { posts, isLoading, error, selectedSubreddit, searchTerm } = useSelector((state) => state.reddit);

    useEffect(() => {
        dispatch(fetchPosts({ subreddit: selectedSubreddit, searchTerm }));
    }, [selectedSubreddit, searchTerm, dispatch]);

    if (isLoading) {
        return (
            <div className="posts-container">
                {[1, 2, 3, 4, 5].map((n) => <PostSkeleton key={n} />)}
            </div>
        );
    }
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
                    index={index} // Keep this if updatePostVote uses index
                />
            ))}
        </section>
    );
};

export default Posts;