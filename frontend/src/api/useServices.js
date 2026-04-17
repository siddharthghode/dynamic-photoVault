import { useQuery } from '@tanstack/react-query';
import api from './axios';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => api.get('/services').then(res => res.data)
  });
}
