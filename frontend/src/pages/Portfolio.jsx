import React from 'react';
import { usePortfolio } from '../api/usePortfolio';
import PortfolioGrid from '../components/PortfolioGrid';

function Portfolio() {
  const { data, isLoading } = usePortfolio();

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4">Portfolio</h2>
        <PortfolioGrid items={data || []} isLoading={isLoading} />
      </div>
    </section>
  );
}

export default Portfolio;
