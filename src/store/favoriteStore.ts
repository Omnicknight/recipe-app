import { makeAutoObservable } from "mobx";
import { Meal } from "../types/Meal";

class FavoriteStore {
  favorites: Meal[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFavorite(meal: Meal) {
    if (!this.isFavorite(meal.idMeal)) {
      this.favorites.push(meal);
    }
  }

  removeFavorite(id: string) {
    this.favorites = this.favorites.filter((m) => m.idMeal !== id);
  }

  isFavorite(id: string) {
    return this.favorites.some((m) => m.idMeal === id);
  }

  clearFavorites() {
    this.favorites = [];
  }
}

const favoriteStore = new FavoriteStore();
export default favoriteStore;
