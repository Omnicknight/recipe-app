"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Meal } from "@/types/Meal";

interface MealsResponse {
  meals: Meal[];
}

export default function RecipeDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading } = useQuery<MealsResponse>({
    queryKey: ["recipe", id],
    queryFn: async (): Promise<MealsResponse> => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      return res.json();
    },
    enabled: !!id,
  });

  const meal = data?.meals?.[0];

  if (isLoading) return <p className="p-4">Загрузка...</p>;
  if (!meal) return <p className="p-4">Рецепт не найден</p>;

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ingredient = meal[`strIngredient${i + 1}`];
    const measure = meal[`strMeasure${i + 1}`];
    return ingredient ? `${ingredient} — ${measure}` : null;
  }).filter(Boolean);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link href="/" className="text-blue-600 underline block mb-4">
        ← Назад к рецептам
      </Link>
      <h1 className="text-2xl font-bold mb-2">{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full rounded mb-4"
      />
      <p className="text-sm mb-2">
        Категория: {meal.strCategory}
      </p>
      <p className="text-sm mb-4">Регион: {meal.strArea}</p>
      <h2 className="text-xl font-semibold mb-2">Ингредиенты</h2>
      <ul className="mb-4 list-disc list-inside">
        {ingredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Инструкция</h2>
      <p className="whitespace-pre-line">
        {meal.strInstructions}
      </p>
      {meal.strYoutube && (
        <div className="mt-6">
          <a
            href={meal.strYoutube}
            target="_blank"
            className="text-blue-600 underline"
          >
            Смотреть на YouTube
          </a>
        </div>
      )}
    </div>
  );
}
