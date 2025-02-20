import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { categoryIds } = await req.json();

  try {
    // Update user's favorite categories
    await db.user.update({
      where: { clerkUserId: userId },
      data: {
        favoriteCategories: {
          set: categoryIds.map((id: string) => ({ id })),
        },
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating favorite categories:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
