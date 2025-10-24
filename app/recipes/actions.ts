"use server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const RecipeSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.string().url(),
  ingredients: z.string().default(""),
  steps: z.string().default(""),
});

async function requireUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("Unauthorized");
  return user.id;
}

export async function createRecipe(fd: FormData) {
  let createdId: string | null = null;

  try {
    const userId = await requireUserId();

    const input = RecipeSchema.parse({
      name: fd.get("name")?.toString(),
      imageUrl: fd.get("imageUrl")?.toString(),
      ingredients: fd.get("ingredients")?.toString() ?? "",
      steps: fd.get("steps")?.toString() ?? "",
    });

    const created = await prisma.recipe.create({ data: { ...input, userId } });
    revalidatePath("/recipes");
    createdId = created.id;
  } catch (err) {
    console.error(err);
    return { error: "Failed to create recipe" };
  }

  // only runs if try succeeded
  redirect(`/recipes/${createdId!}`);
}


export async function updateRecipe(id: string, fd: FormData) {
  try {
    const userId = await requireUserId();
    const existing = await prisma.recipe.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) throw new Error("Forbidden");

    const input = RecipeSchema.parse({
      name: fd.get("name")?.toString(),
      imageUrl: fd.get("imageUrl")?.toString(),
      ingredients: fd.get("ingredients")?.toString() ?? "",
      steps: fd.get("steps")?.toString() ?? "",
    });

    await prisma.recipe.update({ where: { id }, data: input });

    // detail + list might both be visible elsewhere
    revalidatePath(`/recipes/${id}`);
    revalidatePath("/recipes");
    
  } catch (err) {
        console.error(err);
        return { error: "Failed to update recipe" };
  }
  redirect(`/recipes/${id}`);
}

export async function deleteRecipe(id: string) {
  try {
    const userId = await requireUserId();
    const existing = await prisma.recipe.findUnique({ where: { id } });
    if (!existing || existing.userId !== userId) throw new Error("Forbidden");

    await prisma.recipe.delete({ where: { id } });

    // list definitely changed; detail page is gone (safe to revalidate anyway)
    revalidatePath("/recipes");
    revalidatePath(`/recipes/${id}`);

  } catch (err) {
    console.error(err);
    return { error: "Failed to delete recipe" };
  }
  redirect("/recipes");
}
