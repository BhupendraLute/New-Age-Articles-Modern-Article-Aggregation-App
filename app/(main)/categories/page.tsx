import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import { CategoryCard } from "./components/CategoryCard";
import ArticleCard from "@/components/ArticleCard";

interface CategoriesPageProps {
  searchParams: Promise<{
    categoryPage?: string;
    articlePage?: string;
  }>;
}

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const user = await checkUser();

  if (!user) {
    return <div>Please sign in to view categories!</div>;
  }

  // Await the searchParams promise
  const params = await searchParams;
  const categoryPage = Number(params.categoryPage) || 1;
  const articlePage = Number(params.articlePage) || 1;
  const pageSize = 8;

  // Fetch user's favorite categories
  const favoriteCategories = await db.user.findUnique({
    where: { clerkUserId: user.clerkUserId },
    include: {
      favoriteCategories: true,
    },
  });

  // Fetch all categories
  const allCategories = await db.articleCategory.findMany();

  const userFavoriteCategoryIds =
    favoriteCategories?.favoriteCategories.map((cat) => cat.id) || [];

  // Filter out favorited categories
  const nonFavoriteCategories = allCategories.filter(
    (category) => !userFavoriteCategoryIds.includes(category.id)
  );

  // Paginate categories
  const paginatedCategories = nonFavoriteCategories.slice(
    (categoryPage - 1) * pageSize,
    categoryPage * pageSize
  );

  // Fetch articles from favorite categories
  const relevantArticles = await db.article.findMany({
    where: {
      category: {
        in: favoriteCategories?.favoriteCategories.map((cat) => cat.name),
      },
    },
    take: pageSize,
    skip: (articlePage - 1) * pageSize,
    orderBy: {
      date: "desc",
    },
  });

  // Calculate total pages
  const totalCategoryPages = Math.ceil(nonFavoriteCategories.length / pageSize);
  const totalArticlePages = Math.ceil(
    (await db.article.count({
      where: {
        category: {
          in: favoriteCategories?.favoriteCategories.map((cat) => cat.name),
        },
      },
    })) / pageSize
  );

  return (
    <div className="container mx-auto py-10 px-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      {/* Non-favorited categories */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Explore New Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Articles from favorite categories */}
      <section>
        <h1 className="text-2xl font-bold mb-4">
          Articles from Your Favorite Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relevantArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              url={article.link}
              date={article.date!}
              imageUrl={article.imageUrl!}
              category={article.category}
            />
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-6 space-x-2">
          {articlePage > 1 && (
            <a
              href={`?categoryPage=${categoryPage}&articlePage=${articlePage - 1}`}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Previous
            </a>
          )}
          {articlePage < totalArticlePages && (
            <a
              href={`?categoryPage=${categoryPage}&articlePage=${articlePage + 1}`}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Next
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

