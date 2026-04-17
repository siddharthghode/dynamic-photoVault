import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

/**
 * Generic carousel component wrapping Swiper.  
 * Props:
 *  - items: array of data
 *  - renderItem: function(item) => ReactNode
 *  - options: additional Swiper props
 */
function Carousel({ items = [], renderItem, options = {} }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      loop
      autoplay={{ delay: 5000 }}
      {...options}
    >
      {items.map((item, idx) => (
        <SwiperSlide key={item.id || idx}>{renderItem(item)}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
