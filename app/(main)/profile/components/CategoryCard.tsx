"use client";
import { Button } from "@/components/ui/button";
import { ArticleCategory } from "@prisma/client";

export const CategoryCard = ({
	category,
	onClick,
	buttonText,
  isLoading
}: {
	category: ArticleCategory;
	onClick: () => void;
	buttonText: string;
  isLoading?: boolean
}) => {
	return (
		<div className="border p-4 mb-1 rounded-lg shadow-sm flex items-center justify-between gap-1">
			<h3 className="text-xl font-medium">{category.name}</h3>
			<Button className="" onClick={onClick} disabled={isLoading}>
				{buttonText}
			</Button>
		</div>
	);
};
