import { useQuery } from '@tanstack/react-query';
import api from './axios';

export function usePortfolio() {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: () => api.get('/portfolios').then(res => res.data)
  });
}
