// app/recipes/[id]/loading.tsx
export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      {/* Title */}
      <div className="h-8 w-3/4 animate-pulse rounded bg-neutral-200 mb-4" />

      {/* Image placeholder */}
      <div className="w-4/5 max-w-3xl aspect-[16/9] animate-pulse rounded bg-neutral-200 mb-8" />

      {/* "Edit" heading */}
      <div className="h-6 w-20 animate-pulse rounded bg-neutral-200 mb-4" />

      {/* Form fields */}
      <div className="space-y-4 w-4/5 max-w-3xl">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded bg-neutral-200" />
        ))}

        {/* Buttons row */}
        <div className="flex gap-3 pt-2">
          <div className="h-10 w-24 animate-pulse rounded bg-neutral-200" />
          <div className="h-10 w-24 animate-pulse rounded bg-neutral-200" />
        </div>
      </div>
    </main>
  );
}
