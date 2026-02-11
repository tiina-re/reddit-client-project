import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments } from './redditSlice';
import Post from '../../components/Post/Post';
import Comment from './Comment';
import PostSkeleton from '../../components/Loading/PostSkeleton';
import './PostDetail.css';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // 1. Grab the post from Redux state
  const post = useSelector((state) => 
    state.reddit.posts.find((p) => p.id === postId)
  );

  const { comments, loadingComments, errorComments } = useSelector(
    (state) => state.reddit
  );

  // 2. We need the permalink for the API. 
  // We check location state first, then the post object.
  const permalink = location.state?.permalink || post?.permalink;

  useEffect(() => {
    if (permalink) {
      dispatch(fetchComments(permalink));
    }
    window.scrollTo(0, 0);
  }, [dispatch, permalink]);

  // 3. Handle the "Refresh" or "Not Found" case
  if (!post && !loadingComments) {
    return (
      <div className="error-container">
        <h2>Post not found</h2>
        <p>If you refreshed the page, try heading back to the feed.</p>
        <button className="back-button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      <button className="back-btn-pill" onClick={() => navigate(-1)}>
        ← Back to Feed
      </button>

      {/* --- DETAILED VIEW CONTENT --- */}
      {/* Reusing your Post card for the main content */}
      {post && <Post post={post} />}

      <div className="comment-section-detailed">
        <h3 className="comment-header">Comments ({post?.num_comments || 0})</h3>
        
        {loadingComments ? (
          <div className="skeleton-container">
             {/* Using your new Skeleton component for comments too */}
             <PostSkeleton /> 
             <PostSkeleton />
          </div>
        ) : errorComments ? (
          <p className="error">Failed to load the conversation. Please try again.</p>
        ) : (
          <div className="comments-list">
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;