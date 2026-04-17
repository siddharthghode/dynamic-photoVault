import { useQuery } from '@tanstack/react-query';
import api from './axios';

export function useBlogs() {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: () => api.get('/blogs').then(res => res.data)
  });
}
