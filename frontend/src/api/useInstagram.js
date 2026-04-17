import { useQuery } from '@tanstack/react-query';
import api from './axios';

export function useInstagram() {
  return useQuery({
    queryKey: ['instagram'],
    queryFn: () => api.get('/instagram').then(res => res.data)
  });
}
