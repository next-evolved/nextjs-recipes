export default function Loading() {
    return (
        <div className="space-y-2">
            <div className="h-6 w-48 animate-pulse rounded bg-neutral-200" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-64 animate-pulse rounded bg-neutral-200" />
                ))}
            </div>
        </div>
    );
}