"use server";
import { prisma } from "@/lib/db";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";


const RegisterSchema = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});


export async function createUser(formData: FormData) {
    try {
        const input = RegisterSchema.parse({
        name: formData.get("name")?.toString() || undefined,
        email: formData.get("email")?.toString(),
        password: formData.get("password")?.toString(),
        });


        const existing = await prisma.user.findUnique({ where: { email: input.email } });
        if (existing) throw new Error("Email already in use");


        const passwordHash = await hash(input.password, 10);
        await prisma.user.create({ data: { email: input.email, name: input.name, passwordHash } });
        } catch (err) {
        console.error(err);
                
        return { error: "Registration failed" };
    }
    redirect("/login");
}