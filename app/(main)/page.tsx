"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import ArticleCard from "@/components/ArticleCard";
import axios from "axios";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

interface Article {
	id: string;
	title: string;
	link: string;
	description?: string;
	source?: string;
	date?: string;
	category: string;
}

export default function HomePage() {
	const searchParams = useSearchParams();
	const [articles, setArticles] = useState<Article[]>([]);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);

	const currentPage = Number(searchParams.get("page")) || 1;

	useEffect(() => {
		const fetchArticles = async () => {
			setLoading(true);
			try {
				const response = await axios.get(`/api/articles`, {
					params: { page: currentPage },
				});

				if (response.status === 200) {
					setArticles(response.data.articles);
					setTotalPages(response.data.totalPages);
				} else {
					throw new Error("Failed to fetch articles");
				}
			} catch (err) {
				toast("Failed to fetch articles");
				console.error("Error fetching articles:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchArticles();
	}, [currentPage]);

	return (
		<div className="container mx-auto p-4 max-w-7xl">
			<section className="text-center my-8">
				<h1 className="text-3xl font-bold">
					Welcome to New Age Articles
				</h1>
				<p className="text-gray-600">
					Discover trending articles tailored for you.
				</p>
			</section>

			{articles.length === 0 && !loading ? (
				<div className="text-center my-8">
					<p className="text-gray-600">
						You need to follow any category to read articles. Please
						explore new categories from the profile page.
					</p>
					<Button variant="default" className="mt-4">
						<Link href="/profile">Explore Categories</Link>
					</Button>
				</div>
			) : (
				<h1 className="text-2xl font-bold mb-4">
					Articles from Your Favorite Categories
				</h1>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
				{loading
					? Array.from({ length: 9 }).map((_, index) => (
							<ArticleSkeleton key={index} />
					  ))
					: articles.map((article) => (
							<ArticleCard
								key={article.id}
								id={article.id}
								title={article.title}
								url={article.link}
								date={article.date || "Unknown date"}
								description={article.description}
								source={article.source}
								category={article.category}
							/>
					  ))}
			</div>

			{!loading && articles.length > 0 && (
				<Pagination currentPage={currentPage} totalPages={totalPages} />
			)}
		</div>
	);
}
