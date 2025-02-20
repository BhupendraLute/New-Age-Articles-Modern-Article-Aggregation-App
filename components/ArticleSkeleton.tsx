export default function ArticleSkeleton() {
    return (
      <div className="animate-pulse space-y-4 rounded-lg shadow-md overflow-hidden bg-gray-200 dark:bg-gray-700">
        <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  