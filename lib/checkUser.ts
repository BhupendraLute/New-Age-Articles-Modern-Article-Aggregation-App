import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";
import { db } from "./prisma";


export const checkUser = async (): Promise<User | null> => {
  try {
    // Get the current user from Clerk
    const user = await currentUser();

    // If no user is signed in, return null
    if (!user) {
      return null;
    }

    // Check if the user already exists in the database, including favorite categories
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
      include: {
        favoriteCategories: true, // Include favorite categories in the query
      },
    });

    // If the user exists, return it
    if (loggedInUser) {
      return loggedInUser;
    }

    // Create a new user in the database if not found
    const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim();

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: name || "Unnamed User",
        email: user.emailAddresses[0]?.emailAddress || "",
        favoriteCategories: {
          connect: [], 
        },
      },
      include: {
        favoriteCategories: true,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error checking or creating user:", error);
    return null;
  }
};
