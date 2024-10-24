import styles from "./Meal.module.css";
import { Meal } from "../interface";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { deleteFromSaved } from "../store/saved";
import { useState } from "react";

interface MealCardProps {
  meal: Meal;
}
const CartRecipe: React.FC<MealCardProps> = ({ meal }) => {
  const dispatch = useAppDispatch();
  const [openInstructions, setOpenInstructions] = useState(false);

  const handleRemoveRecipe = () => {
    dispatch(deleteFromSaved(meal));
  };
  return (
    <div className={styles.mealsCard}>
      <Link to={`/${meal.idMeal}`}>
        <img
          src={meal.strMealThumb || undefined}
          alt={meal.strMeal || undefined}
        />
        <p className={styles.title}>{meal.strMeal}</p>
      </Link>
      <p className={styles.category}>{meal.strCategory}</p>
      <p className={styles.area}>{meal.strArea}</p>
      <p onClick={() => setOpenInstructions((prev) => !prev)}>Read Instructions</p>
      {openInstructions && <p>{meal.strInstructions}</p>}

      <button onClick={handleRemoveRecipe}>Remove</button>
    </div>
  );
};
export default CartRecipe;
