import { Meal } from "../types/Meal";

export function getMergedIngredients(meals: Meal[]) {
  const map: { [key: string]: string[] } = {};

  meals.forEach((meal) => {
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`]?.trim();
      const meas = meal[`strMeasure${i}`]?.trim();

      if (ing) {
        if (!map[ing]) map[ing] = [];
        if (meas) map[ing].push(meas);
      }
    }
  });

  return map;
}
