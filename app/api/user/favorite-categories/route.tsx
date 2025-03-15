import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { checkUser } from "@/helpers/checkUser";

export async function GET(req: NextRequest) {
	const user = await checkUser();

	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const userData = await db.user.findUnique({
			where: { id: user.id },
			include: { favoriteCategories: true },
		});

		if (!userData) {
			return NextResponse.json(
				{ error: "No favorite categories found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(userData.favoriteCategories);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to fetch favorite categories" },
			{ status: 500 }
		);
	}
}
