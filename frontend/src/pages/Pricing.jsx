import React from 'react';
import { useMembership } from '../api/useMembership';

function Pricing() {
  const { data, isLoading } = useMembership();

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4 text-center">Pricing plans</h2>
        {isLoading && <div className="placeholder-glow" style={{ height: '100px' }}></div>}
        {!isLoading && (
          <div className="row">
            {data.map(plan => (
              <div className="col-md-4 mb-4" key={plan.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{plan.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">${plan.price}</h6>
                    <ul>
                      {plan.features.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Pricing;
