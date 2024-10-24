import React from 'react';
import { Meal } from "../interface";



function extractIngredients(meal: any) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient:string = meal[`strIngredient${i}`];
    const measure:string = meal[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  return ingredients;
}

function combineIngredients(selectedMeals: Meal[]) {
  const combinedIngredients: { [key: string]: { measure: string, ingredient: string } } = {};

  selectedMeals.forEach(meal => {
    const ingredients = extractIngredients(meal);
    
    ingredients.forEach(({ ingredient, measure }) => {
      if (combinedIngredients[ingredient]) {

        combinedIngredients[ingredient].measure += `, ${measure}`;
      } else {
        combinedIngredients[ingredient] = { measure, ingredient };
      }
    });
  });

  return Object.values(combinedIngredients);
}

const SelectedIngredientsList: React.FC<{ selectedMeals: Meal[] }> = ({ selectedMeals }) => {
  const ingredientList = combineIngredients(selectedMeals);

  return (
      <ul>
        {ingredientList.map(({ ingredient, measure }) => (
          <li key={ingredient}>
            {ingredient}: {measure}
          </li>
        ))}
      </ul>
  );
};

export default SelectedIngredientsList;
