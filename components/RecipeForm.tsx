// components/RecipeForm.tsx
"use client";
import { useState } from "react";

export default function RecipeForm({
  onSubmit,
  initial,
}: {
  onSubmit: (data: FormData) => Promise<{ error?: string } | void>;
  initial?: any;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  return (
    <form
      action={async (fd) => {
        setPending(true);
        setError(undefined);
        setSuccess(undefined);
        const res = await onSubmit(fd);
        setPending(false);
        if (res && "error" in res) setError(res.error);
        if (res && "success" in res) setSuccess(res.success);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm">Name</label>
        <input
          name="name"
          defaultValue={initial?.name}
          className="mt-1 w-full rounded border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm">Image URL</label>
        <input
          name="imageUrl"
          type="url"                // tiny UX boost
          inputMode="url"
          defaultValue={initial?.imageUrl}
          className="mt-1 w-full rounded border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm">Ingredients (one per line)</label>
        <textarea
          name="ingredients"
          defaultValue={initial?.ingredients}
          className="mt-1 w-full rounded border px-3 py-2 h-32"
        />
      </div>

      <div>
        <label className="block text-sm">Steps (one per line)</label>
        <textarea
          name="steps"
          defaultValue={initial?.steps}
          className="mt-1 w-full rounded border px-3 py-2 h-32"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && <p className="text-sm text-green-500">{success}</p>}

      <button
        disabled={pending}
        className="rounded bg-neutral-900 px-4 py-2 text-white"
      >
        {pending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}




