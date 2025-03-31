"use client";

import React from "react";
import Link from "next/link";
import favoriteStore from "../store/favoriteStore";
import { observer } from "mobx-react-lite";
import { Meal } from "@/types/Meal";
import Image from 'next/image';

interface RecipeCardProps {
  meal: Meal;
}

export const RecipeCard = observer(({ meal }: RecipeCardProps) => {
  const isFav = favoriteStore.isFavorite(meal.idMeal);

  const toggleFavorite = () => {
    if (isFav) {
      favoriteStore.removeFavorite(meal.idMeal);
    } else {
      favoriteStore.addFavorite(meal);
    }
  };

  return (
    <div className="border rounded shadow hover:shadow-lg transition overflow-hidden h-full flex flex-col">
      <Link href={`/recipe/${meal.idMeal}`} className="block">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">{meal.strMeal}</h2>
          <p className="text-sm">Категория: {meal.strCategory}</p>
          <p className="text-sm">Регион: {meal.strArea}</p>
        </div>
      </Link>

      <div className="p-4 mt-auto">
        <button
          onClick={toggleFavorite}
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
});
