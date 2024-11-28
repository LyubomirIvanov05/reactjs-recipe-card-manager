import { useEffect, useState } from "react";
import { React } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const RecipeForm = ({ recipes, setRecipes}) => {  
    const navigate = useNavigate();


    const [currentRecipe, setCurrentRecipe] = useState({
        id: Date.now(),
        name: '',
        ingredients: '',
        instructions: ''
    });


    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes'));
        if (storedRecipes)
            setRecipes(storedRecipes)
    }, [setRecipes])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCurrentRecipe((recipe) => ({
            ...recipe,
            [name]: value
        }));
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentRecipe.name === "" || currentRecipe.instructions === '') {
            return;
        }
        // setRecipes((prevRecipes) => [...prevRecipes, currentRecipe]);
        
       const newRecipe = {
            ...currentRecipe,
            id: Date.now()
       }
        
        const updatedRecipes = [...recipes, currentRecipe];
        setRecipes(updatedRecipes);

        
        
        // Save to localStorage
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));


        setCurrentRecipe({id: Date.now(), name: '', instructions: '', ingredients: ''});
        navigate('/')

    }
 
    return(
            <div className="flex items-center justify-center h-lvh">
                <form className="flex flex-col justify-center gap-10 w-96 bg-purple-500 p-3 h-96" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold text-white bg-slate text-center">Add Recipe</h1>
                <input
                type="text" 
                name="name"
                placeholder="Recipe Name"
                value={currentRecipe.name}
                onChange={handleChange}
                className="w-full rounded-md p-1"
                />

                <textarea
                name="ingredients"
                placeholder="Ingredients"
                value={currentRecipe.ingredients}
                onChange={handleChange}
                className="w-full rounded-md p-1"
                />

                <textarea
                name="instructions"
                placeholder="Instructions"
                value={currentRecipe.instructions}
                onChange={handleChange}
                className="w-full rounded-md p-1"
                />

                <button className="w-full rounded-lg bg-sky-500 hover:bg-sky-700 text-white" type="submit">Add Recipe</button>
                
            </form>
            </div>
    )
}

export default RecipeForm