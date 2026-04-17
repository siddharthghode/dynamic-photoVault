import React from 'react';

const BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8080';

function ServiceCard({ service }) {
  return (
    <div className="col-md-3 text-center mb-4">
      {service.icon && (
        <img src={`${BASE}/uploads/${service.icon}`} alt={service.title} style={{ maxHeight: '80px' }} />
      )}
      <h5 className="mt-2">{service.title}</h5>
      <p className="text-muted">{service.description}</p>
    </div>
  );
}

export default ServiceCard;
