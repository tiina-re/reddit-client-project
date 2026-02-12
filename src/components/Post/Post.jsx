import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FaArrowUp, FaArrowDown, FaRegCommentAlt, FaShare } from 'react-icons/fa';
import { updatePostVote } from '../../features/posts/redditSlice';
import './Post.css';

const Post = ({ post, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [voteValue, setVoteValue] = useState(0);
  
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      // If the actual content height is greater than the visible (clamped) height
      if (element.scrollHeight > element.offsetHeight) {
        setIsTruncated(true);
      }
    }
  }, [post.selftext]);

  const timeAgo = moment.unix(post.created_utc).fromNow();
  const hasImage = post.post_hint === 'image' || post.url.match(/\.(jpeg|jpg|gif|png)$/) != null;

  const handleVote = (e, direction) => {
    e.stopPropagation();
    if (voteValue === direction) {
      dispatch(updatePostVote({ index, direction: -direction }));
      setVoteValue(0);
    } else {
      const adjustment = direction - voteValue;
      dispatch(updatePostVote({ index, direction: adjustment }));
      setVoteValue(direction);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const url = `https://www.reddit.com${post.permalink}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handleOpenPost = () => {
    navigate(`/comments/${post.id}`);
  };

  return (
    <article className="post-container" onClick={handleOpenPost}>
      <div className="post-content">
        <div className="post-metadata">
          <span className="subreddit-name">r/{post.subreddit}</span>
          <span className="post-divider">•</span>
          <span>Posted by <strong className="post-author">u/{post.author}</strong></span>
          <span className="post-divider">•</span>
          <span className="post-time">{timeAgo}</span>
        </div>

        <h2 className="post-title">{post.title}</h2>

        {post.selftext && (
          <div className="post-body-container">
            <p 
              ref={textRef} 
              className="post-selftext-preview"
            >
              {post.selftext}
            </p>
            {isTruncated && (
              <span className="read-more-link"> 
              </span>
            )}
          </div>
        )}

        {hasImage && (
          <div className="post-image-container">
            <img src={post.url} alt={post.title} className="post-main-image" />
          </div>
        )}

        {post.is_video && post.media?.reddit_video && (
          <div className="post-video-container" onClick={(e) => e.stopPropagation()}>
            <video controls className="post-main-video">
              <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
            </video>
          </div>
        )}

        <div className="post-footer">
          <div className="footer-pill vote-pill">
            <button
              className={`vote-button up ${voteValue === 1 ? 'active-up' : ''}`}
              onClick={(e) => handleVote(e, 1)}
            >
              <FaArrowUp />
            </button>
            <span className={`post-votes ${voteValue === 1 ? 'up' : voteValue === -1 ? 'down' : ''}`}>
              {post.ups.toLocaleString()}
            </span>
            <button
              className={`vote-button down ${voteValue === -1 ? 'active-down' : ''}`}
              onClick={(e) => handleVote(e, -1)}
            >
              <FaArrowDown />
            </button>
          </div>

          <button className="footer-pill comment-pill" onClick={handleOpenPost}>
            <FaRegCommentAlt />
            <span>{post.num_comments}</span>
          </button>

          <button className="footer-pill share-pill" onClick={handleShare}>
            <FaShare />
            <span>Share</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default Post;