"use client";

import React from "react";

export default function ArticleCardSkeleton() {
	return (
		<div className="relative block rounded-lg pb-8 border-2 shadow-md overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse">
			<div className="p-5">
				<div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>

				<div className="flex flex-wrap mt-3 text-sm">
					<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mr-2"></div>
					<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
				</div>

				<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mt-4"></div>
				<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mt-2"></div>
				<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mt-2"></div>

				<div className="flex flex-wrap mt-3 text-sm">
					<div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
				</div>
			</div>

			<div className="absolute mx-auto my-3 bg-gray-400 dark:bg-gray-500 rounded h-10 w-32 bottom-0 right-4"></div>
		</div>
	);
}
