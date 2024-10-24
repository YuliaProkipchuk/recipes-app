import styles from "../components/Meal.module.css";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Meal } from "../interface";
import MealCard from "../components/MealCard";
import { useEffect, useState } from "react";
import SearchRecipe from "../components/SearchRecipe";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

interface AllMeals {
  meals: Meal[];
}

export default function AllRecipesPage() {
  const meals: any = useLoaderData() || [];
  
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
   
  };
  const categories: Set<string> = new Set(
    meals.map((meal: Meal) => meal.strCategory)
  );

  useEffect(() => {
    if (filter) {
      setAllMeals(() =>
        meals.filter((meal: Meal) => meal.strCategory === filter)
      );
    } else {
      setAllMeals(meals);
    }
  }, [filter, meals]);

  return (
    <>
      <div>
        <select name="" id="" onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Categories</option>
          {Array.from(categories).map((c: string) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <SearchRecipe />
        <Link to={'/s'}>Saved Recipes</Link>
      </div>
      <section className="main">
      <div className={styles.mealsGrid}>
        {allMeals.slice((currentPage-1)*9, currentPage*9).map((meal: Meal) => (
          <MealCard
            key={meal.idMeal}
            meal={meal}
          />
        ))}
      </div>
      <Pagination recipesPerPage={9} totalRecipes={meals.length} onPageChange={handlePageChange} currentPage={currentPage}/>
      </section>
    </>
  );
}

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<Meal[] | null> {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("q");

  try {
    if (searchTerm) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data: AllMeals = await response.json();
      return data.meals || [];
    } else {
      const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
      const fetchAll = alphabet.map(async (l) => {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`
        );
        const data: AllMeals = await res.json();
        return data.meals || [];
      });

      const allMeals = await Promise.all(fetchAll);
      return allMeals.flat();
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
