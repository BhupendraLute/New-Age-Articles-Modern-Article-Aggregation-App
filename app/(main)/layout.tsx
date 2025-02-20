import { Header } from "@/components/Header";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Header />
			<main className="mt-14">{children}</main>
		</div>
	);
}
