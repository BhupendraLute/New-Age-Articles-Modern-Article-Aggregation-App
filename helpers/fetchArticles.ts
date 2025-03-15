import axios from "axios";
import { db } from "@/lib/prisma";

interface SerperArticle {
  title: string;
  link: string;
  source: string;
  snippet?: string | null;
  section?: string | null;
  date?: string;
}

export async function fetchArticles(category: string): Promise<void> {
  try {
    if (!process.env.SERPER_API_KEY) {
      throw new Error("SERPER_API_KEY is not defined in the environment variables.");
    }

    const response = await axios.post<{ news: SerperArticle[] }>(
      "https://google.serper.dev/news",
      { q: category },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const articles = response.data.news || [];

    // console.log("articles : " , articles)

    const insertionPromises = articles.map(async (article) => {
      const { title, link: url, source, date } = article;

      if (!title || !url) return;

      return db.article.upsert({
        where: { link: url },
        update: {},
        create: {
          title,
          link: url,
          category,
          source,
          description: article?.snippet || article?.section || null,
          date: date || null,
        },
      });
    });


    await Promise.all(insertionPromises);

    console.log(`Fetched and stored articles for category: ${category}`);
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
  }
}