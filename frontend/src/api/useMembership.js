import { useQuery } from '@tanstack/react-query';
import api from './axios';

export function useMembership() {
  return useQuery({
    queryKey: ['membership'],
    queryFn: () => api.get('/membership').then(res => res.data)
  });
}
