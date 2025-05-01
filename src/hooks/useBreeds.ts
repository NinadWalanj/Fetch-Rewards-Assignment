import { useState, useEffect } from 'react';
import { api } from '../api';

export function useBreeds() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;
    api.get<string[]>('/dogs/breeds')
      .then(res => {
        if (!canceled) setBreeds(res.data);
      })
      .catch(err => {
        if (!canceled) setError(err.message || 'Failed to load breeds');
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });
    return () => { canceled = true; };
  }, []);

  return { breeds, loading, error };
}
