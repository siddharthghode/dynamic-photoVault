import { useQuery } from '@tanstack/react-query';
import api from './axios';

export function useAbout() {
  return useQuery({
    queryKey: ['about'],
    queryFn: () => api.get('/about').then(res => res.data[0] || {})
  });
}
