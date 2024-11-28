import { useState } from "react";



const RecipeCard = ({ recipe, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(recipe.name);
    const [newIngredients, setNewIngredients] = useState(recipe.ingredients);
    const [newInstructions, setNewInstructions] = useState(recipe.instructions);


    const handleDelete = () => {
        onDelete(recipe.id);
    }

    const handleEdit = () => {
        onEdit(recipe.id, newName, newIngredients, newInstructions);
        setIsEditing(false);
    }


    return(
        <li className="flex flex-col justify-items-center px-3 py-6 bg-slate-400 relative max-h-fit">
            {isEditing ? 
            (
                <div>
                    <input type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Recipe Name"
                    className="w-full mb-2 p-1 border"
                    />

                    <textarea 
                    value={newIngredients}
                    onChange={(e) => setNewIngredients(e.target.value)}
                    placeholder="Ingredients"
                    className="w-full bm-2 p-1 border"
                    />

                    <textarea 
                    value={newInstructions}
                    onChange={(e) => setNewInstructions(e.target.value)}
                    placeholder="Instructions"
                    className="w-full bm-2 p-1 border"
                    />

                    <button onClick={handleEdit} className="bg-green-500 text-white p-2 mr-2">Save</button>
                    <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white p-2">Cancel</button>
                </div>
            ) : (
                <div>
                    <h2 className="text-center text-3xl	">{recipe.name}</h2>
                    <h2>Ingredients:</h2>
                    <p className="pl-3 border border-solid border-black w-full h-12 overflow-auto">{recipe.ingredients}</p>
                    <h2>Instructions:</h2>
                    <p className="pl-3 border border-solid border-black w-full h-96 overflow-auto">{recipe.instructions}</p>
                    <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-700 text-white p-2 mt-2">Edit</button>
                    <button onClick={handleDelete}><i className="fa-solid fa-trash absolute top-2 right-2"></i></button>
                </div>
            )}
        </li>
    )
}


export default RecipeCard