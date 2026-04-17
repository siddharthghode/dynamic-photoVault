import React from 'react';
import HeroSlider from '../components/HeroSlider';
import PortfolioGrid from '../components/PortfolioGrid';
import TestimonialCarousel from '../components/TestimonialCarousel';
import ServiceCard from '../components/ServiceCard';
import { usePortfolio } from '../api/usePortfolio';
import { useServices } from '../api/useServices';

function Home() {
  const { data: portfolios, isLoading: loadingPortfolio } = usePortfolio();
  const { data: services, isLoading: loadingServices } = useServices();

  return (
    <>
      <HeroSlider />
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4">Portfolio</h2>
          <PortfolioGrid items={portfolios || []} isLoading={loadingPortfolio} />
        </div>
      </section>
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-center">Our Services</h2>
          <div className="row justify-content-center">
            {loadingServices
              ? [...Array(4)].map((_, idx) => (
                  <div className="col-md-3 mb-4" key={idx}>
                    <div className="placeholder-glow" style={{ height: '150px' }}></div>
                  </div>
                ))
              : (services || []).map(s => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <h2 className="mb-4 text-center">Testimonials</h2>
          <TestimonialCarousel />
        </div>
      </section>
    </>
  );
}

export default Home;
