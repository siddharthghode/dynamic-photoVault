import React from 'react';
import Carousel from './Carousel';
import { useTestimonials } from '../api/useTestimonials';
import LoadingSkeleton from './LoadingSkeleton';

function TestimonialCarousel() {
  const { data, isLoading } = useTestimonials();

  if (isLoading) return <LoadingSkeleton height="150px" />;

  const items = data || [];

  if (items.length === 0) return <p className="text-muted text-center">No testimonials yet.</p>;

  return (
    <Carousel
      items={items}
      options={{ spaceBetween: 50, slidesPerView: 1 }}
      renderItem={t => (
        <div className="testimonial text-center p-4">
          {t.rating && (
            <div className="mb-2" style={{ color: '#f59e0b', fontSize: '1.2rem' }}>
              {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
            </div>
          )}
          <p className="fst-italic fs-5">"{t.quoteText}"</p>
          <p className="fw-bold mt-2">— {t.authorName}</p>
        </div>
      )}
    />
  );
}

export default TestimonialCarousel;
