"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ArticleSkeleton from "@/components/ArticleSkeleton";
import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { Pagination } from "@/components/ui/pagination";

interface Article {
  id: string;
  title: string;
  link: string;
  imageUrl?: string;
  date?: string;
  category: string;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<string>("Technology");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  // Get the current page from URL query params (default to 1)
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`/api/articles`, {
          params: {
            category,
            page: currentPage,
          },
        });

        if (response.status === 200) {
          setArticles(response.data.articles);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Error fetching articles:", response.data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, currentPage]);

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="text-center my-8">
        <h1 className="text-3xl font-bold">Welcome to New Age Articles</h1>
        <p className="text-gray-600">Discover trending articles tailored for you.</p>

        <Button className="mt-4">
          <Link href="/categories">Explore New Categories</Link>
        </Button>
      </section>

      {/* Articles Section */}
      <h1 className="text-2xl font-bold mb-4">Articles from Your Favorite Categories</h1>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => <ArticleSkeleton key={index} />)
          : articles.map((article) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                url={article.link}
                date={article.date || "Unknown date"}
                imageUrl={article.imageUrl || "/placeholder-image.jpg"}
                category={article.category}
              />
            ))}
      </div>

      {/* Pagination */}
      {!loading && articles.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
