import RecipeForm from "@/components/RecipeForm";
import { createRecipe } from "../actions";


export default function NewRecipePage() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">New recipe</h1>
            <RecipeForm onSubmit={createRecipe} />
        </div>
    );
}