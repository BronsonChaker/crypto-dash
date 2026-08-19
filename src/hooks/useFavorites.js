import { useState, useEffect } from 'react';

const STORAGE_KEY = 'crypto-dash-favorites';

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // localStorage unavailable (private browsing / quota exceeded) — ignore
    }
  }, [favorites]);

  const isFavorite = (id) => favorites.includes(id);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return { favorites, isFavorite, toggleFavorite };
};

export default useFavorites;
