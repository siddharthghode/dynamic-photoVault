import React from 'react';

const BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8080';

function PortfolioGrid({ items, isLoading }) {
  if (isLoading) {
    return (
      <div className="row">
        {[...Array(4)].map((_, idx) => (
          <div className="col-md-6 mb-4" key={idx}>
            <div className="placeholder-glow" style={{ height: '200px' }}></div>
          </div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <p className="text-muted">No portfolio items yet.</p>;
  }

  return (
    <div className="row">
      {items.map(item => (
        <div className="col-md-6 mb-4" key={item.id}>
          <div className="card h-100 shadow-sm">
            {item.image && (
              <img
                src={`${BASE}/uploads/${item.image}`}
                className="card-img-top"
                alt={item.title}
                style={{ height: '220px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              {item.category && <span className="badge bg-secondary mb-2">{item.category}</span>}
              {item.description && <p className="card-text text-muted">{item.description}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PortfolioGrid;
