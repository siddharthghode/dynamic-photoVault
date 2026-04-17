import { useQuery } from '@tanstack/react-query';
import api from './axios';

export function useSliders() {
  return useQuery({
    queryKey: ['sliders'],
    queryFn: () => api.get('/sliders').then(res => res.data)
  });
}
