import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useSyncExternalStore } from "react";
import { Meal } from "../types/Meal";

const FAVORITES_KEY = ["favorites"];
const STORAGE_KEY = "favorite-recipes";

export function useFavorites() {
  const client = useQueryClient();

  const favorites = useSyncExternalStore(
    (callback) => {
      const unsubscribe = client.getQueryCache().subscribe(callback);
      return () => unsubscribe();
    },
    () => client.getQueryData<Meal[]>(FAVORITES_KEY) || [],
    () => []
  );

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          client.setQueryData(FAVORITES_KEY, parsed);
        }
      } catch {
        console.warn("Ошибка чтения localStorage избранного");
      }
    }
  }, [client]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: string) => favorites.some((m) => m.idMeal === id);

  const toggleFavorite = (meal: Meal) => {
    const updated = isFavorite(meal.idMeal)
      ? favorites.filter((m) => m.idMeal !== meal.idMeal)
      : [...favorites, meal];

    client.setQueryData(FAVORITES_KEY, updated);
  };

  const clearFavorites = () => {
    client.setQueryData(FAVORITES_KEY, []);
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
}
