// app/(auth)/login/page.tsx
import Link from "next/link";
import { getCsrfToken } from "next-auth/react";

export default async function LoginPage() {
  const csrfToken = await getCsrfToken();

  return (
    <form
      method="post"
      action="/api/auth/callback/credentials"
      className="mx-auto max-w-sm space-y-4"
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken ?? undefined} />

      <h1 className="text-xl font-semibold">Sign in</h1>

      <div>
        <label className="block text-sm">Email</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          name="email"
          type="email"
          required
        />
      </div>

      <div>
        <label className="block text-sm">Password</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          name="password"
          type="password"
          required
        />
      </div>

      <button className="w-full rounded bg-neutral-900 px-3 py-2 text-white">
        Sign in
      </button>

      <p className="text-sm text-neutral-600">
        No account? <Link className="underline" href="/register">Register</Link>
      </p>
    </form>
  );
}
