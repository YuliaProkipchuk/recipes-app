import styles from "./Meal.module.css";
import { Meal } from "../interface";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { addToSaved } from "../store/saved";

interface MealCardProps {
  meal: Meal;
}
const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const dispatch = useAppDispatch();

  
  const handleAddRecipe = () => {
    dispatch(addToSaved(meal));
};
  return (
    <div className={styles.mealsCard}>
      <Link to={`/${meal.idMeal}`}>
        <img
          src={meal.strMealThumb || undefined}
          alt={meal.strMeal || undefined}
        />
        <p className={styles.title}>{meal.strMeal}</p>
        <p className={styles.category}>{meal.strCategory}</p>
        <p className={styles.area}>{meal.strArea}</p>
      </Link>
      <button onClick={handleAddRecipe}>Save</button>
    </div>
  );
};
export default MealCard;
