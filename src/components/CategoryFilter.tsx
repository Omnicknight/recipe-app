import React, { useMemo } from "react";
import { Meal } from "@/types/Meal";

interface Props {
  meals: Meal[];
  onSelect: (category: string) => void;
}

export default function CategoryFilter({ meals, onSelect }: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    meals.forEach((meal) => {
      if (meal.strCategory) {
        set.add(meal.strCategory);
      }
    });
    return ["All", ...Array.from(set)];
  }, [meals]);

  return (
    <div className="mb-4 flex gap-2 flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className="px-3 py-1 bg-blue-100 text-black rounded hover:bg-blue-300 transition"
        >
          {category}
        </button>
      ))}
    </div>
  );
}
