import { Meal } from '../types/Meal';

export function getMergedIngredients(meals: Meal[]) {
  const map: { [ingredient: string]: string[] } = {};

  meals.forEach((meal) => {
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]?.trim();
      const measure = meal[`strMeasure${i}`]?.trim();

      if (ingredient) {
        if (!map[ingredient]) {
          map[ingredient] = [];
        }
        if (measure) {
          map[ingredient].push(measure);
        }
      }
    }
  });

  return map;
}
