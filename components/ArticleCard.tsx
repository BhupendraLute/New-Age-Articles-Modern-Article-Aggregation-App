"use client"

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import { toast } from "sonner";

interface ArticleCardProps {
	id: string;
	title: string;
	url: string;
	source?: string;
	description?: string;
	date?: string;
	category: string;
}

export default function ArticleCard({
	id,
	title,
	url,
	date,
	source,
	description,
	category,
}: ArticleCardProps) {
	const [summary, setSummary] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchSummary = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`/api/articles/${id}/summary`);
			if (response.ok) {
				const data = await response.json();
				setSummary(data.data.articleSummary);
				toast("Summary fetched successfully.");
			} else {
				console.error("Failed to fetch summary:", response?.statusText);
				setSummary("Failed to load summary.");
				throw new Error("Failed to fetch summary");
			}
		} catch (error) {
			toast("Failed to fetch summary. Please try again.");
			console.error("Error fetching summary:", error);
			setSummary("Failed to load summary.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="relative block rounded-lg pb-8 border-2 shadow-md overflow-hidden hover:border-black dark:hover:border-white bg-white dark:bg-gray-800">
			<div className="p-5 flex flex-col justify-between">
				<h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
					{title}
				</h3>

				<div className="flex flex-wrap mt-3 text-sm text-gray-500 dark:text-gray-400">
					{source && <span className="mr-2">• {source}</span>}
					{category && <span className="mr-2">• {category}</span>}
				</div>

				{description && (
					<p className="text-sm text-gray-600 dark:text-gray-300 mt-4 line-clamp-3">
						{description}
					</p>
				)}

				<div className="flex flex-wrap mt-3 text-sm text-gray-500 dark:text-gray-400">
					{date && <span>• {date}</span>}
				</div>
			</div>

			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant={"outline"}
						className="absolute mx-auto my-3 bg-black dark:bg-white dark:hover:bg-transparent hover:border-black text-white dark:text-black dark:hover:text-white dark:hover:border-white bottom-0 right-4 transition-transform transform hover:scale-105"
						onClick={fetchSummary}
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "View Summary"}
					</Button>
				</SheetTrigger>
				<SheetContent side={"bottom"} className="w-full max-h-screen overflow-y-scroll mx-auto p-8">
					<SheetHeader className="mx-auto sm:mx-4 md:mx-10">
						<SheetTitle className="text-center text-3xl">Article Summary</SheetTitle>
						<SheetDescription className="text-xl text-[#140f13] dark:text-white mt-4 text-justify">
							{summary || "Loading summary..."}
						</SheetDescription>
					</SheetHeader>
					<div className="w-full flex items-center justify-center mt-4">
						<Button
							variant={"outline"}
							className=" border-black dark:border-white"
							onClick={() => window.open(url, "_blank")}
						>
							Read More
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
