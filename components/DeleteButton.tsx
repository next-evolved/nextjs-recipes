"use client";
import { useState } from "react";

export function DeleteButton({ action }: { action: () => Promise<{ error?: string } | void> }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  return (
    <form
      action={async () => {
        setPending(true);
        const res = await action();
        setPending(false);
        setError((res as any)?.error);
      }}
      className="flex flex-col items-end"
    >
      <button
        disabled={pending}
        className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-500 disabled:opacity-50"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </form>
  );
}
