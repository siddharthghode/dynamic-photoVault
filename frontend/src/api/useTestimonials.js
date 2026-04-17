import { useQuery } from '@tanstack/react-query';
import api from './axios';

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: () => api.get('/testimonials').then(res => res.data)
  });
}
