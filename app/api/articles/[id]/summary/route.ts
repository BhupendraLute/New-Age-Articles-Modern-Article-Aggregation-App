import { checkUser } from "@/helpers/checkUser";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { scrapeData } from "@/helpers/firecrawl";
import summarizeArticle from "@/helpers/geminiapi";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const user = await checkUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const article = await db.article.findUnique({
      where: { id },
      select: { link: true },
    });

    if (!article || !article.link) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Check if summary already exists
    const existingSummary = await db.articleSummary.findUnique({
      where: { articleId: id },
    });

    if (existingSummary) {
      return NextResponse.json(
        { data: { id, articleSummary: existingSummary.summary }, message: "Article summary already exists" },
        { status: 200 }
      );
    }

    const articleData: any  = await scrapeData(article.link);

    if (!articleData || !articleData.markdown) {
      return NextResponse.json(
        { error: "Failed to scrape article content" },
        { status: 500 }
      );
    }

    const articleSummary = await summarizeArticle(articleData.markdown);

    if (!articleSummary) {
      return NextResponse.json(
        { error: "Failed to summarize article" },
        { status: 500 }
      );
    }

    // Store the summary in the database
    await db.articleSummary.create({
      data: {
        articleId: id,
        summary: articleSummary,
      },
    });

    return NextResponse.json(
      { data: { id, articleSummary }, message: "Article summary created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in /api/articles route:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
