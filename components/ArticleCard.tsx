import React from "react";

interface ArticleCardProps {
	title: string;
	url: string;
	date: string;
	imageUrl: string;
	category: string;
}

export default function ArticleCard({
	title,
	url,
	date,
	imageUrl,
	category,
}: ArticleCardProps) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="block rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 bg-white dark:bg-gray-800"
		>
			{/* Article Image */}
			<img
				src={imageUrl || "/placeholder.jpg"}
				alt={title}
				className="w-full h-48 object-cover"
			/>

			{/* Article Content */}
			<div className="p-4 flex flex-col justify-between h-36">
				{/* Title - fixed height & ellipsis */}
				<h3
					className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2"
					style={{
						display: "-webkit-box",
						WebkitBoxOrient: "vertical",
						WebkitLineClamp: 2,
						overflow: "hidden",
					}}
				>
					{title}
				</h3>

				{/* Category */}
				<p className="text-base text-gray-500 dark:text-gray-400 mt-1">
					• {category}
				</p>

				{/* Date */}
				<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
					{date}
				</p>
			</div>
		</a>
	);
}
