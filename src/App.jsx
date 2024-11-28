import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import RecipeList from './components/RecipeList'
import RecipeForm from './components/RecipeForm'
import { useEffect } from "react";

function App() {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem('recipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const handleDelete = (recipeId) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
  }

  const handleEdit = (recipeId, newName, newIngredients, newInstructions) => {
    const updatedRecipe = recipes.map(recipe => recipe.id === recipeId ? 
      {
        ...recipe, name: newName, ingredients: newIngredients, intructions: newInstructions
      } : recipe
    );
    setRecipes(updatedRecipe);
  }

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
    console.log("Number of recipes: ", recipes.length);
  }, [recipes]);
  return (
   <div className="bg-red-100 min-h-screen">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipeList recipes={recipes} setRecipes={setRecipes} onDelete={handleDelete} onEdit={handleEdit}/>}/>
        <Route path="/RecipeForm" element={<RecipeForm recipes={recipes} setRecipes={setRecipes}/>}/>
      </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App
