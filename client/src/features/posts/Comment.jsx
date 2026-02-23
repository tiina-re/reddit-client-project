import React, { useState } from 'react';
import moment from 'moment';
import { FaPlusSquare, FaMinusSquare, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './Comment.css';

const Comment = ({ comment }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const replies = comment.replies?.data?.children || [];

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`comment-thread ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="comment-item">
        <div className="comment-metadata" onClick={handleToggle}>
          <span className="collapse-icon">
            {isCollapsed ? <FaPlusSquare /> : <FaMinusSquare />}
          </span>
          <span className="comment-author">u/{comment.author}</span>
          <span className="comment-time">
            {moment.unix(comment.created_utc).fromNow()}
          </span>
        </div>

        {!isCollapsed && (
          <>
            <div className="comment-body">
              <p>{comment.body}</p>
            </div>

            <div className="comment-actions">
              <button className="comment-vote-btn up">
              <FaArrowUp/>
              </button>
              <span className="comment-score">
                {comment.ups > 1000 ? `${(comment.ups / 1000).toFixed(1)}k` : comment.ups}
              </span>
              <button className="comment-vote-btn down">
                <FaArrowDown />
              </button>
            </div>


            {replies.length > 0 && (
              <div className="replies-indent">
                {replies.map((reply) => {
                  if (reply.kind === 't1') {
                    return <Comment key={reply.data.id} comment={reply.data} />;
                  }
                  return null;
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;