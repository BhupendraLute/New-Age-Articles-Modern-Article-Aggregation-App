import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await db.articleCategory.findMany();
    return new Response(JSON.stringify({ categories }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
