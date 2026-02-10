import React from 'react';
import './Post.css';
import { FaArrowUp, FaArrowDown, FaRegCommentAlt, FaShare } from 'react-icons/fa';
import moment from 'moment';

const Post = ({ post, onToggleComments }) => {

  const timeAgo = moment.unix(post.created_utc).fromNow();

  const hasImage = post.post_hint === 'image' || post.url.match(/\.(jpeg|jpg|gif|png)$/) != null;

  const handleCommentClick = () => {
    if (typeof onToggleComments === 'function') {
      onToggleComments(post.permalink);
    } else {
      console.error("onToggleComments is not a function! Value is:", onToggleComments);
    }
  };

  return (
    <article className="post-container">
      <div className="post-content">
        <div className="post-metadata">
          <span>Posted by <strong>u/{post.author}</strong></span>
          <span className="post-time">{timeAgo}</span>
        </div>
        
        <h2 className="post-title">{post.title}</h2>

        {/* Image Rendering */}
        {hasImage && (
          <div className="post-image-container">
            <img src={post.url} alt={post.title} className="post-main-image" />
          </div>
        )}

        {/* Video Rendering */}
        {post.is_video && post.media?.reddit_video && (
          <div className="post-video-container">
            <video controls className="post-main-video">
              <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
            </video>
          </div>
        )}
        
        {/* Pill-style Footer */}
        <div className="post-footer">
          <div className="footer-pill vote-pill">
            <button className="vote-button up"><FaArrowUp /></button>
            <span className="post-votes">{post.ups}</span>
            <button className="vote-button down"><FaArrowDown /></button>
          </div>

          <button 
            className={`footer-pill comment-pill ${post.showingComments ? 'active' : ''}`} 
            onClick={handleCommentClick}
          >
            <FaRegCommentAlt />
            <span>{post.num_comments}</span>
          </button>

          <button className="footer-pill share-pill">
            <FaShare />
            <span>Share</span>
          </button>
        </div>

        {/* --- COMMENT SECTION --- */}
        { /*Conditional render ensures that we aren't slowing down the app by rendering hidden data.*/}
        {post.showingComments && (
          <div className="comment-section">
            < hr/>
          {post.loadingComments ? (
            <div className="loader-container">
              <p>Loading comments ....</p>
              </div>
          ) : post.errorComments ? (
            <p className="error">Error lodaing comments.</p>
          ) : (
            post.comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <p className="comment-author">u/{comment.author}</p>
                <p className="comment-body">{comment.body}</p>
                </div>
            ))
          )}
          </div>
        )}

      </div>
    </article>
  );
};

export default Post;