import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { fetchArticles } from "@/lib/fetchArticles";
import { checkUser } from "@/lib/checkUser"; 

// Helper function to convert relative date strings to timestamps
function relativeDateToTimestamp(relativeDate: string): number {
  const now = new Date().getTime();

  if (relativeDate.includes("minute") || relativeDate.includes("minutes")) {
    const minutes = parseInt(relativeDate.split(" ")[0]) || 0;
    return now - minutes * 60 * 1000;
  }

  if (relativeDate.includes("hour") || relativeDate.includes("hours")) {
    const hours = parseInt(relativeDate.split(" ")[0]) || 0;
    return now - hours * 60 * 60 * 1000;
  }

  if (relativeDate.includes("day") || relativeDate.includes("days")) {
    const days = parseInt(relativeDate.split(" ")[0]) || 0;
    return now - days * 24 * 60 * 60 * 1000;
  }

  if (relativeDate.includes("week") || relativeDate.includes("weeks")) {
    const weeks = parseInt(relativeDate.split(" ")[0]) || 0;
    return now - weeks * 7 * 24 * 60 * 60 * 1000;
  }

  if (relativeDate.includes("month") || relativeDate.includes("months")) {
    const months = parseInt(relativeDate.split(" ")[0]) || 0;
    return now - months * 30 * 24 * 60 * 60 * 1000;
  }

  if (relativeDate.includes("year") || relativeDate.includes("years")) {
    const years = parseInt(relativeDate.split(" ")[0]) || 0;
    return now - years * 365 * 24 * 60 * 60 * 1000;
  }

  // Default to "now" if format isn't recognized
  return now;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = 8;

  try {
    // Get the current user
    const user = await checkUser();

    // If no user is found, return an unauthorized response
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's favorite categories
    const favoriteCategories = await db.user.findUnique({
      where: { clerkUserId: user.clerkUserId }, 
      include: {
        favoriteCategories: true,
      },
    });

    if (!favoriteCategories || !favoriteCategories.favoriteCategories.length) {
      return NextResponse.json({
        articles: [],
        totalPages: 0,
      });
    }

    // Extract category names
    const categoryNames = favoriteCategories.favoriteCategories.map((cat) => cat.name);

    // Fetch articles for each category in parallel
    const articlesByCategory = await Promise.all(
      categoryNames.map(async (category) => {
        // Check for articles in the database
        const totalArticles = await db.article.count({
          where: { category },
        });

        // If no articles, fetch new ones
        if (totalArticles === 0) {
          console.log(`No articles found for category: ${category}. Fetching new articles...`);
          await fetchArticles(category);
        }

        // Get articles without ordering by date since date is a relative string
        return db.article.findMany({
          where: { category },
        });
      })
    );

    // Flatten and sort articles by relative date
    const articles = articlesByCategory
      .flat()
      .sort((a, b) => relativeDateToTimestamp(b.date!) - relativeDateToTimestamp(a.date!));

    // Pagination logic
    const totalArticles = articles.length;
    const totalPages = Math.ceil(totalArticles / pageSize);
    const paginatedArticles = articles.slice((page - 1) * pageSize, page * pageSize);

    return NextResponse.json({
      articles: paginatedArticles,
      totalPages,
    });
  } catch (error) {
    console.error("Error in /api/articles route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
