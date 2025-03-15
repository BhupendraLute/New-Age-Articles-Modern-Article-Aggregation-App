import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { checkUser } from "@/helpers/checkUser";

export async function GET(req: NextRequest) {
  const user = await checkUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const categories = await db.articleCategory.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}