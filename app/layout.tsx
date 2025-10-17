import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


const inter = Inter({ subsets: ["latin"] });


export const metadata = {
title: "Recipe App",
description: "Next.js Recipe App with Auth and Server Actions",
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {
const session = await getServerSession(authOptions);


return (
<html lang="en" className={inter.className}>
  <body className="min-h-screen bg-neutral-50 text-neutral-900">
    <header className="border-b bg-white">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">🍲 Recipe App</Link>
        <nav className="flex items-center gap-4 text-sm">
        <Link href="/recipes" className="hover:underline">Recipes</Link>
        {session ? (
        <>
          <span className="text-neutral-600">Hi, {session.user?.name ?? session.user?.email}</span>
          <form action="/api/auth/signout" method="post">
          <button className="rounded bg-neutral-900 px-3 py-1.5 text-white">Sign out</button>
          </form>
        </>
        ) : (
        <Link href="/login" className="rounded bg-neutral-900 px-3 py-1.5 text-white">Sign in</Link>
        )}
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
  </body>
</html>
);
}