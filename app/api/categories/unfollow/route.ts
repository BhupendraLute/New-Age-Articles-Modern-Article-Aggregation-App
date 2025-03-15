import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { checkUser } from '@/helpers/checkUser';

export async function POST(req: NextRequest) {
  const user = await checkUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Extract categoryId from the request body
    const { categoryId } = await req.json();

    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    // remove category from user's favorites using Prisma
    await db.user.update({
      where: { clerkUserId: user.clerkUserId },
      data: {
        favoriteCategories: {
          disconnect: { id: categoryId },
        },
      },
    });



    // await db.user.update({
    //   where: { clerkUserId: user.clerkUserId },
    //   data: {
    //     favoriteCategories: {
    //       connect: { id: categoryId },
    //     },
    //   },
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error following category:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
