import { prisma } from "@/lib/db";
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";


export default async function RecipesPage() {
    const recipes = await prisma.recipe.findMany({ orderBy: { createdAt: "desc" } });
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Recipes</h1>
                <Link href="/recipes/new" className="rounded bg-neutral-900 px-3 py-2 text-white">New</Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recipes.map((r) => (<RecipeCard key={r.id} r={r} />))}
            </div>
        </div>
    );
}