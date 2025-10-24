import Image from "next/image";
import Link from "next/link";

export default function RecipeCard({ r }: { r: any }) {
  const src = r.imageUrl
    ? `/api/proxy-image?url=${encodeURIComponent(r.imageUrl)}`
    : "/placeholder.jpg"; // ensure this exists in /public

  return (
    <div className="rounded-lg border bg-white">
      <Image
        src={src}
        alt={r.name ?? "Recipe image"}
        width={800}
        height={600}
        className="h-64 w-full rounded object-cover"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        priority={false}
      />
      <div className="p-4">
        <h3 className="font-semibold">{r.name}</h3>
        <div className="mt-2 text-sm text-neutral-600">
          {(r.ingredients ?? "").split("\n").slice(0, 3).join(", ")}
          {r.ingredients?.includes("\n") ? "…" : ""}
        </div>
        <Link href={`/recipes/${r.id}`} className="mt-3 inline-block text-sm underline">
          Open
        </Link>
      </div>
    </div>
  );
}
