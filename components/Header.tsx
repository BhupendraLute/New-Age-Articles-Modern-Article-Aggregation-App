import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server"; // Use server-side auth
import { checkUser } from "@/lib/checkUser";
import { ModeToggle } from "@/components/ModeToggle";
import { SignOutButton } from "@clerk/nextjs";

export const Header = async () => {
	// Check if user is authenticated
	const { userId }: { userId: string | null } = await auth();

	// Optional: Check user in the database (if needed for roles/profile)
	if (userId) {
		await checkUser();
	}

	return (
		<header className="w-full border-b bg-background fixed top-0 z-50">
			<div className="container mx-auto px-4 py-3 flex justify-between items-center">
				{/* Title */}
				<Link href="/" className="text-xl font-bold tracking-tight">
					New Age Articles
				</Link>

				{/* Navigation */}
				<nav className="hidden md:flex gap-6">
					<Link href="/" className="font-medium hover:underline">
						Home
					</Link>
					<Link
						href="/categories"
						className="font-medium hover:underline"
					>
						Categories
					</Link>
				</nav>

				{/* Authentication / Profile */}
				<div className="flex items-center gap-4">
					{userId ? (
						<>
							{/* SignOutButton (Client Component) */}
							<SignOutButton>
								<Button variant="default">Sign Out</Button>
							</SignOutButton>
						</>
					) : (
						<>
							<Link href="/sign-in">
								<Button variant="outline">Sign In</Button>
							</Link>
							<Link href="/sign-up">
								<Button variant="default">Sign Up</Button>
							</Link>
						</>
					)}

					{/* Theme Toggle*/}
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};
