import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { fetchArticles } from "@/helpers/fetchArticles";
import { checkUser } from "@/helpers/checkUser";

async function fetchArticlesIfEmpty(category: string) {
  const totalArticles = await db.article.count({ where: { category } });
  if (totalArticles === 0) {
    console.log(`No articles found for category: ${category}. Fetching new articles...`);
    await fetchArticles(category);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 9;

  try {
    const user = await checkUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favoriteCategoriesData = await db.user.findUnique({
      where: { clerkUserId: user.clerkUserId },
      include: { favoriteCategories: true },
    });

    if (!favoriteCategoriesData || !favoriteCategoriesData.favoriteCategories.length) {
      return NextResponse.json({ articles: [], totalPages: 0, message:"No favorite categories found." });
    }

    const categoryNames = favoriteCategoriesData.favoriteCategories.map((cat) => cat.name);

    // Fetch articles for all categories, and fetch new articles if database is empty.
    await Promise.all(categoryNames.map(fetchArticlesIfEmpty));

    const articles = await db.article.findMany({
      where: { category: { in: categoryNames } },
      orderBy: { date: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalArticles = await db.article.count({
      where: { category: { in: categoryNames } },
    });

    const totalPages = Math.ceil(totalArticles / pageSize);

    return NextResponse.json({ articles, totalPages });
  } catch (error : any ) {
    console.error("Error in /api/articles route:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}