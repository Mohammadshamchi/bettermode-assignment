export function SearchSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
                <div key={n} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg" />
                    <div className="p-4 space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}
