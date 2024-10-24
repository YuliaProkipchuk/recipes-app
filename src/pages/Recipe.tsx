import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { Meal } from "../interface";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

export default function Recipe() {
    const recipes = useSelector((state: RootState) => state.saved.recipes);
  const meal: Meal | any = useLoaderData();
  const ingredients = Object.keys(meal).filter((key) =>
    key.startsWith("strIngredient")
  );
  const measurments = Object.keys(meal).filter((key) =>
    key.startsWith("strMeasure")
  );
  console.log(meal);
  console.log(ingredients);
  console.log(recipes);


  return (
    <section>
        <Link to={'/'}>Back to all Recipes</Link>
      <h1>{meal.strMeal}</h1>
      <h3>{meal.strCategory}</h3>
      <span>{meal.strArea}</span> <br />
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h2>Ingridients:</h2>
      <ul>
        {ingredients.map((key, ind) => {
          const ingredient = meal[key];
          if (ingredient) {
            return (
              <li key={ingredient}>
                {ingredient} - {meal[measurments[ind + 1]]}
              </li>
            );
          }
          return null;
        })}
      </ul>
      <h2>Instrunctions</h2>
      <p>{meal.strInstructions}</p>
      <iframe width="420" height="315" src={meal.strYoutube}></iframe>
    </section>
  );
}

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<Meal | null> {
  const id = params.id;
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    const meal: Meal = data?.meals[0];
    return meal;
  } catch (error) {
    return null;
  }
}
