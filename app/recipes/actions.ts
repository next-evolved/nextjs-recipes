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
  redirect(`/recipes`);
}


export async function updateRecipe(id: string, fd: FormData) {
  try {
    const userId = await requireUserId();
    const existing = await prisma.recipe.findUnique({ where: { id } });
    if (!existing) return { error: "Recipe not found." };
    if (existing.userId !== userId) {
      return { error: "You are not authorized to change this recipe." };
    }

    const parsed = RecipeSchema.safeParse({
      name: fd.get("name")?.toString(),
      imageUrl: fd.get("imageUrl")?.toString(),
      ingredients: fd.get("ingredients")?.toString() ?? "",
      steps: fd.get("steps")?.toString() ?? "",
    });
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid form data.";
      return { error: msg };
    }

    await prisma.recipe.update({ where: { id }, data: parsed.data });
    revalidatePath(`/recipes/${id}`);
    revalidatePath("/recipes");

    // ✅ success path
    return { success: "Recipe updated successfully!" };
  } catch (err: any) {
    console.error(err);
    return { error: "Failed to update recipe." };
  }
}




export async function deleteRecipe(id: string) {
  try {
    const userId = await requireUserId();
    const existing = await prisma.recipe.findUnique({ where: { id } });

    if (!existing) {
      return { error: "Recipe not found." };
    }
    if (existing.userId !== userId) {
      return { error: "You are not authorized to delete this recipe." };
    }

    await prisma.recipe.delete({ where: { id } });

    revalidatePath("/recipes");
    revalidatePath(`/recipes/${id}`);
    
  } catch (err: any) {
    console.error(err);
    return { error: "Failed to delete recipe." };
  }
  redirect("/recipes");
}
