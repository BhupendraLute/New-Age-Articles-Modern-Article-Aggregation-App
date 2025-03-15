import { Header } from "@/components/Header";
import StoreProvider from "@/components/StoreProvider";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<StoreProvider>
			<div>
				<Header />
				<main className="mt-14">{children}</main>
				<Toaster />
			</div>
		</StoreProvider>
	);
}
