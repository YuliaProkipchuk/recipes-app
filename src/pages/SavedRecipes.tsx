import { useSelector } from "react-redux";
import { Meal } from "../interface"; 
import { RootState } from "../store/store";
import CartRecipe from "../components/CartRecipe";
import SelectedIngredientsList from "../components/AllIngredients";
import { Link } from "react-router-dom";

export default function SavedRecipes() {
  const recipes = useSelector((state: RootState) => state.saved.recipes);
  console.log("Saved recipes:", recipes); 

  return (
    <section>
        <Link to={'/'}>Back to all Recipes</Link>

      <h1>Chosen Recipes:</h1>
      <div className="savedGrid">
        {recipes.length > 0 ? (
          recipes.map((recipe: Meal) => (
            <CartRecipe key={recipe.idMeal} meal={recipe} />
          ))
        ) : (
          <p>No saved recipes.</p>
        )}
      </div>
      <h2>All Ingredients</h2>
      <SelectedIngredientsList selectedMeals={recipes}/>
    </section>
  );
}
