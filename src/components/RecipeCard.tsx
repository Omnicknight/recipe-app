"use client";

import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "../hooks/useFavorites";
import { Meal } from "../types/Meal";

interface RecipeCardProps {
  meal: Meal;
}

export const RecipeCard = ({ meal }: RecipeCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(meal.idMeal);

  return (
    <div className="border rounded shadow hover:shadow-lg transition overflow-hidden h-full flex flex-col">
      <Link href={`/recipe/${meal.idMeal}`} className="block">
        <div className="relative w-full h-48">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{meal.strMeal}</h2>
          <p className="text-sm text-gray-600">Категория: {meal.strCategory}</p>
          <p className="text-sm text-gray-600">Регион: {meal.strArea}</p>
        </div>
      </Link>

      <div className="p-4 mt-auto">
        <button
          onClick={() => toggleFavorite(meal)}
          className={`px-4 py-2 rounded text-white w-full ${
            isFav
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isFav ? "Убрать из избранного" : "Добавить в избранное"}
        </button>
      </div>
    </div>
  );
};
