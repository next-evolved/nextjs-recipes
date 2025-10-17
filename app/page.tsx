import Link from "next/link";


export default function Home() {
  return (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Welcome</h1>
    <p>Sign in to create and manage your recipes. This app demonstrates Auth, Server Actions, CRUD, and streaming.</p>
    <div className="flex gap-3">
      <Link className="rounded bg-neutral-900 px-3 py-2 text-white" href="/recipes">View Recipes</Link>
      <Link className="rounded border px-3 py-2" href="/register">Create account</Link>
    </div>
  </div>
  );
}