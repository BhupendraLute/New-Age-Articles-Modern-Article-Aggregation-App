import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server"; 
import { ModeToggle } from "@/components/ModeToggle";
import SignOutClient from "./SignOutClient";

export const Header = async () => {
	// Check if user is authenticated
	const { userId }: { userId: string | null } = await auth();

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
						href="/profile"
						className="font-medium hover:underline"
					>
						profile
					</Link>
				</nav>

				{/* Authentication */}
				<div className="flex items-center gap-4">
					{userId ? (
						<>
							{/* SignOutButton (Client Component) */}
							<SignOutClient />
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
