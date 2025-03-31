"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import debounce from "lodash.debounce";
import { RecipeCard } from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/CategoryFilter";
import SearchInput from "../components/SearchInput";
import { Meal } from "@/types/Meal";

interface MealsResponse {
  meals: Meal[];
}

const PAGE_SIZE = 10;

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery<MealsResponse>({
    queryKey: ["meals", search],
    queryFn: async (): Promise<MealsResponse> => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      return res.json();
    },
  });

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 500),
    []
  );

  const meals = useMemo<Meal[]>(() => {
    if (!data?.meals) return [];
    let filtered = data.meals;
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (meal) => meal.strCategory === selectedCategory
      );
    }
    return filtered;
  }, [data, selectedCategory]);

  const paginatedMeals = meals.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(meals.length / PAGE_SIZE);

  return (
    <div className="p-4">
      <SearchInput onSearch={debouncedSetSearch} />
      <CategoryFilter
        meals={data?.meals || []}
        onSelect={setSelectedCategory}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paginatedMeals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
          <Pagination current={page} total={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
