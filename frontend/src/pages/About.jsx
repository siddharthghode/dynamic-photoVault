import React from 'react';
import { useAbout } from '../api/useAbout';

const BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8080';

function About() {
  const { data, isLoading } = useAbout();

  if (isLoading) {
    return <div className="container py-5 placeholder-glow" style={{ height: '200px' }}></div>;
  }

  if (!data || !data.heading) {
    return (
      <section className="py-5">
        <div className="container text-muted">No about content yet. Add it from the admin panel.</div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4">{data.heading}</h2>
        <div className="row align-items-center">
          <div className={data.image ? 'col-md-6' : 'col-12'}>
            <p className="lead">{data.bodyText}</p>
          </div>
          {data.image && (
            <div className="col-md-6">
              <img
                src={`${BASE}/uploads/${data.image}`}
                alt="About"
                className="img-fluid rounded shadow"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
