import React from 'react';

const BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8080';

function BlogCard({ post }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        {post.image && (
          <img
            src={`${BASE}/uploads/${post.image}`}
            className="card-img-top"
            alt={post.title}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text text-muted flex-fill">
            {(post.content || '').substring(0, 100)}...
          </p>
          <small className="text-muted mb-2">
            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
          </small>
          <a href={`/blog/${post.slug}`} className="btn btn-outline-primary btn-sm mt-auto">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
