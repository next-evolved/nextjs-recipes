import Image from "next/image";
import Link from "next/link";


export default function RecipeCard({ r }: { r: any }) {
    return (
        <div className="rounded-lg border bg-white">
            <Image src={r.imageUrl || "/placeholder.webp"} alt={r.name} width={800} height={500} className="h-48 w-full rounded-t-lg object-cover" />
            <div className="p-4">
                <h3 className="font-semibold">{r.name}</h3>
                <div className="mt-2 text-sm text-neutral-600">{(r.ingredients || "").split("\n").slice(0,3).join(", ")}{r.ingredients?.includes("\n") ? "…" : ""}</div>
                <Link href={`/recipes/${r.id}`} className="mt-3 inline-block text-sm underline">Open</Link>
            </div>
        </div>
    );
}