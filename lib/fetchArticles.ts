import axios from "axios";
import { db } from "@/lib/prisma";

interface SerperArticle {
  title: string;
  link: string;
  imageUrl?: string;
  date?: string;
}

export async function fetchArticles(category: string): Promise<void> {
  try {
    if (!process.env.SERPER_API_KEY) {
      throw new Error("SERPER_API_KEY is not defined in the environment variables.");
    }

    // Fetch articles
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

    // Extract articles from the response
    const articles = response.data.news || [];

    // Insert articles into the database using Prisma
    for (const article of articles) {
      const { title, link: url, imageUrl, date } = article;

      // Ensure required fields exist before inserting
      if (!title || !url) continue;

      await db.article.upsert({
        where: { link: url }, // Use the unique constraint on the link field
        update: {},
        create: {
          title,
          link: url,
          category,
          imageUrl: imageUrl || null,
          date: date || null,
        },
      });
    }

    console.log(`Fetched and stored articles for category: ${category}`);
  } catch (error) {
    console.error(`Error fetching articles for category ${category}:`, error);
  }
}
