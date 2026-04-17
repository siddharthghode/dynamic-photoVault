import React from 'react';
import Carousel from './Carousel';
import { useSliders } from '../api/useSlider';
import LoadingSkeleton from './LoadingSkeleton';

const BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8080';

function HeroSlider() {
  const { data, isLoading } = useSliders();

  if (isLoading) return <LoadingSkeleton height="70vh" />;

  const slides = data || [];

  if (slides.length === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center bg-dark text-white"
        style={{ height: '70vh' }}>
        <div className="text-center">
          <h1>Welcome to Photography Portfolio</h1>
          <p>Add sliders from the admin panel to display here.</p>
        </div>
      </div>
    );
  }

  return (
    <Carousel
      items={slides}
      renderItem={slide => (
        <div
          className="hero-slide d-flex align-items-center"
          style={{
            backgroundImage: slide.image ? `url(${BASE}/uploads/${slide.image})` : 'none',
            backgroundColor: slide.image ? 'transparent' : '#1a1a2e',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '70vh',
            color: '#fff',
          }}
        >
          <div className="container">
            <div style={{ background: 'rgba(0,0,0,0.4)', display: 'inline-block', padding: '20px 30px', borderRadius: '8px' }}>
              <h1>{slide.title}</h1>
              {slide.caption && <p className="mb-0">{slide.caption}</p>}
            </div>
          </div>
        </div>
      )}
    />
  );
}

export default HeroSlider;
