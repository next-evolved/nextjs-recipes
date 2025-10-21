// app/(auth)/login/page.tsx
"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("user@nextmail.com");
  const [password, setPassword] = useState("Passw0rd!");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,          // IMPORTANT: lets us read res?.error instead of redirecting
      // callbackUrl: "/recipes" // add this back once working
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);      // usually "CredentialsSignin"
    } else {
      // success -> navigate wherever
      window.location.href = "/recipes";
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-4">
      <h1 className="text-xl font-semibold">Sign in</h1>

      <div>
        <label className="block text-sm">Email</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          name="email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm">Password</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          name="password"
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
      </div>

      {!!error && (
        <p className="text-sm text-red-600">Sign-in failed: {error}</p>
      )}

      <button
        className="w-full rounded bg-neutral-900 px-3 py-2 text-white disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-sm text-neutral-600">
        No account? <Link className="underline" href="/register">Register</Link>
      </p>
    </form>
  );
}

