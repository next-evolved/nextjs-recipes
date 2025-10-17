import { prisma } from "@/lib/db";
import Image from "next/image";
import RecipeForm from "@/components/RecipeForm";
import { updateRecipe, deleteRecipe } from "../actions";


export default async function RecipeDetail({ params }: { params: { id: string } }) {
    const r = await prisma.recipe.findUnique({ where: { id: params.id } });
    if (!r) return <div>Not found</div>;


    async function update(fd: FormData) {
        "use server";
        return updateRecipe(r.id, fd);
    }


    async function remove() {
        "use server";
        return deleteRecipe(r.id);
    }


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{r.name}</h1>
                <form action={remove}><button className="rounded border px-3 py-2">Delete</button></form>
            </div>

            <Image src={r.imageUrl} alt={r.name} width={1200} height={600} className="h-64 w-full rounded object-cover" />

            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    <h2 className="mb-2 font-semibold">Ingredients</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        {r.ingredients.split("\n").filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                    </ul>
                </div>
                <div>
                    <h2 className="mb-2 font-semibold">Steps</h2>
                    <ol className="list-decimal pl-6 space-y-1">
                        {r.steps.split("\n").filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
                    </ol>
                </div>
            </div>


            <section className="pt-6 border-t">
                <h2 className="mb-3 text-lg font-semibold">Edit</h2>
                <RecipeForm initial={r} onSubmit={update} />
            </section>
        </div>
    );
}