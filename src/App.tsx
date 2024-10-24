import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AllRecipesPage, { loader as allLoader } from "./pages/AllRecipes";
import Recipe, { loader as recipeLoader } from "./pages/Recipe";
import SavedRecipes from "./pages/SavedRecipes";
import { Provider } from "react-redux";
import {store} from "./store/store";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AllRecipesPage />,
    loader: allLoader,
  },
  {
    path: "/search",
    element: <AllRecipesPage />,
    loader: allLoader,
  },
  { path: "/s", element: <SavedRecipes /> },
  { path: "/:id", element: <Recipe />, loader: recipeLoader },
]);
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
