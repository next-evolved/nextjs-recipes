// app/recipes/[id]/page.tsx
// @ts-nocheck
import { prisma } from "@/lib/db";
import RecipeForm from "@/components/RecipeForm";
import { updateRecipe, deleteRecipe } from "../actions";
import { DeleteButton } from "@/components/DeleteButton";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await prisma.recipe.findUnique({ where: { id: params.id } });
  if (!recipe) return notFound();

  async function update(fd: FormData) { "use server"; return updateRecipe(recipe.id, fd); }
  async function remove() { "use server"; return deleteRecipe(recipe.id); }

  const src = recipe.imageUrl
    ? `/api/proxy-image?url=${encodeURIComponent(recipe.imageUrl)}`
    : "/placeholder.jpg";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{recipe.name}</h1>
        <DeleteButton action={remove} />
      </div>

      <Image
        src={src}
        alt={recipe.name ?? "Recipe image"}
        width={1200}
        height={600}
        className="h-64 w-full rounded object-cover"
      />

      {/* …ingredients / steps / edit form… */}
      <section className="border-t pt-6">
        <h2 className="mb-3 text-lg font-semibold">Edit</h2>
        <RecipeForm initial={recipe} onSubmit={update} />
      </section>
    </div>
  );
}

