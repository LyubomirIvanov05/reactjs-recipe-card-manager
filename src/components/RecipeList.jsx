import { useState } from "react";
import RecipeCard from './RecipeCard';
import { Link } from "react-router-dom";
import { React } from 'react';
import { useEffect } from "react";

const RecipeList = ({ recipes, onDelete, onEdit }) => {
  const [searchItem, setSearchItem] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)



  const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    if (searchTerm === '') {
      setFilteredRecipes(recipes);
    }
    else {
    const filteredItems = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchItem.toLowerCase()));

    setFilteredRecipes(filteredItems);
    }

  };

  useEffect(() => {
    if (searchItem === '') {
      setFilteredRecipes(recipes); // Show all recipes if search is empty
    } else {
      const filteredItems = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredRecipes(filteredItems); // Filter based on the current search term
    }
  }, [recipes, searchItem]);
    return(

          <div className="w-full flex flex-col p-14 relative h-full gap-4">
          <input type="text"
            value={searchItem}
            onChange={handleInputChange}
            placeholder="Search Recipe"
            className="border border-gray-300 rounded pl-2"
          />
          <ul className="grid grid-cols-3 gap-4">
            {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.name}
              recipe={recipe}
              onDelete={onDelete}
              onEdit={onEdit}
            />
            
        ))
      ) : (
        <li>No recipes to display. Please add a recipe.</li>
      )}
        </ul>
          <button className="absolute top-2 right-2 px-8 rounded-lg bg-sky-500 hover:bg-sky-700 text-white">
              <Link to="/RecipeForm">Add Recipe</Link>
          </button>
        </div>

    )
}


export default RecipeList