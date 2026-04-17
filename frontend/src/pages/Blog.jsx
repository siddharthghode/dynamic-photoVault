import React from 'react';
import { useBlogs } from '../api/useBlog';
import BlogCard from '../components/BlogCard';

function Blog() {
  const { data, isLoading } = useBlogs();

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4">Blog</h2>
        <div className="row">
          {isLoading
            ? [...Array(3)].map((_, idx) => (
                <div className="col-md-4 mb-4" key={idx}>
                  <div className="placeholder-glow" style={{ height: '250px' }}></div>
                </div>
              ))
            : (data || []).length === 0
            ? <p className="text-muted">No blog posts yet.</p>
            : (data || []).map(post => <BlogCard key={post.id} post={post} />)}
        </div>
      </div>
    </section>
  );
}

export default Blog;
