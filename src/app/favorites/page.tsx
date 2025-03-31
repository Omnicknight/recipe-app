'use client';

import { getMergedIngredients } from '../../utils/parseIngredients';
import { useFavorites } from '../../hooks/useFavorites';
import { RecipeCard } from '../../components/RecipeCard';
import { Meal } from '../../types/Meal';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();

  if (favorites.length === 0) {
    return <p className="p-4">Вы еще не добавили рецепты в избранное.</p>;
  }

  const ingredientMap = getMergedIngredients(favorites as Meal[]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Избранные рецепты</h1>
        <button
          onClick={clearFavorites}
          className="text-sm px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Очистить избранное
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Объединённые ингредиенты:</h2>
        <ul className="list-disc pl-6">
          {Object.entries(ingredientMap).map(([name, measures]) => (
            <li key={name}>
              {name}: {measures.join(', ')}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {favorites.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Инструкции по приготовлению:</h2>
        <div className="space-y-6">
          {favorites.map((meal) => (
            <div key={meal.idMeal}>
              <h3 className="text-lg font-bold mb-1">{meal.strMeal}</h3>
              <p className="whitespace-pre-line text-gray-700">{meal.strInstructions}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
