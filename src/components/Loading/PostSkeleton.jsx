import React from 'react';
import './Skeleton.css';

const PostSkeleton = () => {
  return (
    <div className="post-skeleton-card">
      <div className="skeleton-header shimmer"></div>
      <div className="skeleton-title shimmer"></div>
      <div className="skeleton-content shimmer"></div>
      <div className="skeleton-footer shimmer"></div>
    </div>
  );
};

export default PostSkeleton;