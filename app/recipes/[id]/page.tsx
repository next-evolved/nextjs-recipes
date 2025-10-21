// app/recipes/[id]/page.tsx
import { prisma } from "@/lib/db";
import Image from "next/image";
import RecipeForm from "@/components/RecipeForm";
import { updateRecipe, deleteRecipe } from "../actions";
import { notFound } from "next/navigation";

type PageProps = {
  params: { id: string }; 
};

export default async function Page({ params }: PageProps) {
  const r = await prisma.recipe.findUnique({ where: { id: params.id } });
  if (!r) return notFound();

  // Server actions scoped to this page
  async function update(fd: FormData) {
    "use server";
    return updateRecipe(r.id, fd);
  }

  async function remove() {
    "use server";
    return deleteRecipe(r.id);
  }

  const imageSrc = r.imageUrl ?? "/placeholder.webp"; // make sure you have this in /public

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{r.name}</h1>
        <form action={remove}>
          <button className="rounded border px-3 py-2">Delete</button>
        </form>
      </div>

      <Image
        src={imageSrc}
        alt={r.name ?? "Recipe image"}
        width={1200}
        height={600}
        className="h-64 w-full rounded object-cover"
        priority
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-2 font-semibold">Ingredients</h2>
          <ul className="list-disc space-y-1 pl-6">
            {r.ingredients
              .split("\n")
              .filter(Boolean)
              .map((line, i) => (
                <li key={i}>{line}</li>
              ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 font-semibold">Steps</h2>
          <ol className="list-decimal space-y-1 pl-6">
            {r.steps
              .split("\n")
              .filter(Boolean)
              .map((line, i) => (
                <li key={i}>{line}</li>
              ))}
          </ol>
        </div>
      </div>

      <section className="border-t pt-6">
        <h2 className="mb-3 text-lg font-semibold">Edit</h2>
        <RecipeForm initial={r} onSubmit={update} />
      </section>
    </div>
  );
}
