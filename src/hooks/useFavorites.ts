import { useState, useCallback } from 'react';
import type { Dog } from '../types';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Dog[]>([]);

  const add = useCallback((dog: Dog) => {
    setFavorites(prev => prev.find(d => d.id === dog.id) ? prev : [...prev, dog]);
  }, []);

  const remove = useCallback((id: string) => {
    setFavorites(prev => prev.filter(d => d.id !== id));
  }, []);

  const toggle = useCallback((dog: Dog) => {
    setFavorites(prev =>
      prev.find(d => d.id === dog.id)
        ? prev.filter(d => d.id !== dog.id)
        : [...prev, dog]
    );
  }, []);

  const clear = useCallback(() => {
    setFavorites([]);
  }, []);

  const ids = favorites.map(d => d.id);

  return { favorites, ids, add, remove, toggle, clear };
}
