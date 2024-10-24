import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Meal } from "../interface";


export interface SavedState {
  recipes: Meal[];
}

const initialState: SavedState = {
  recipes: [],
};

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    addToSaved: (state, action: PayloadAction<Meal>) => {
      const index = state.recipes.findIndex(
        (recipe) => recipe.idMeal === action.payload.idMeal
      );

     
      if (index === -1 && action.payload.idMeal) {
        state.recipes.push(action.payload);
      
      }
    },
    deleteFromSaved: (state, action: PayloadAction<Meal>) => {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.idMeal !== action.payload.idMeal
      );
    },
  },
});

export const { addToSaved, deleteFromSaved } = savedSlice.actions;
export default savedSlice.reducer;
