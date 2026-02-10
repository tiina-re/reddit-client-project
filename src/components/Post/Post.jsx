import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Post.css';
import { FaArrowUp, FaArrowDown, FaRegCommentAlt, FaShare } from 'react-icons/fa';
import { updatePostVote } from '../../features/posts/redditSlice';
import moment from 'moment';

const Post = ({ post, index, onToggleComments }) => {
  const dispatch = useDispatch();
  const [voteValue, setVoteValue] = useState(0);

  const timeAgo = moment.unix(post.created_utc).fromNow();
  const hasImage = post.post_hint === 'image' || post.url.match(/\.(jpeg|jpg|gif|png)$/) != null;

  const handleVote = (direction) => {
    if (voteValue === direction) {
      dispatch(updatePostVote({ index, direction: -direction }));
      setVoteValue(0);
    } else {
      const adjustment = direction - voteValue;
      dispatch(updatePostVote({ index, direction: adjustment }));
      setVoteValue(direction);
    }
  };

  const handleShare = () => {
    const url = `https://www.reddit.com${post.permalink}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handleCommentClick = () => {
    if (typeof onToggleComments === 'function') {
      onToggleComments(post.permalink);
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

        {/* Footer Actions */}
        <div className="post-footer">
          <div className="footer-pill vote-pill">
            <button
              className={`vote-button up ${voteValue === 1 ? 'active-up' : ''}`}
              onClick={() => handleVote(1)}
            >
              <FaArrowUp />
            </button>
            <span className={`post-votes ${voteValue === 1 ? 'up' : voteValue === -1 ? 'down' : ''}`}>
              {post.ups.toLocaleString()}
            </span>
            <button
              className={`vote-button down ${voteValue === -1 ? 'active-down' : ''}`}
              onClick={() => handleVote(-1)}
            >
              <FaArrowDown />
            </button>
          </div>

          <button
            className={`footer-pill comment-pill ${post.showingComments ? 'active' : ''}`}
            onClick={handleCommentClick}
          >
            <FaRegCommentAlt />
            <span>{post.num_comments}</span>
          </button>

          <button className="footer-pill share-pill" onClick={handleShare}>
            <FaShare />
            <span>Share</span>
          </button>
        </div>

        {/* --- COMMENT SECTION --- */}
        {post.showingComments && (
          <div className="comment-section">
            <hr />
            {post.loadingComments ? (
              <div className="loader-container">
                <p>Loading comments...</p>
              </div>
            ) : post.errorComments ? (
              <p className="error">Error loading comments.</p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-metadata">
                    <span className="comment-author">u/{comment.author}</span>
                    <span className="comment-divider">•</span>
                    <span className="comment-time">
                      {moment.unix(comment.created_utc).fromNow()}
                    </span>
                    <span className="comment-divider">•</span>
                    <span className="comment-ups">{comment.ups?.toLocaleString()} points</span>
                  </div>
                  
                  <p className="comment-body">{comment.body}</p>

                  {/* Render Replies (First Level) */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="replies-container">
                      {comment.replies.map((reply) => {
                        // Skip Reddit's "load more" placeholders
                        if (reply.kind === 'more') return null;

                        return (
                          <div key={reply.data.id} className="reply-item">
                            <div className="comment-metadata">
                              <span className="comment-author">u/{reply.data.author}</span>
                              <span className="comment-divider">•</span>
                              <span className="comment-time">
                                {moment.unix(reply.data.created_utc).fromNow()}
                              </span>
                              <span className="comment-divider">•</span>
                              <span className="comment-ups">
                                {reply.data.ups?.toLocaleString()} points
                              </span>
                            </div>
                            <p className="comment-body">{reply.data.body}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
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