// app/dashboard/layout.tsx
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import Image from "next/image";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen">
			{/* Sidebar */}
			<aside className="hidden md:flex w-280 flex-col border-r bg-blue-black text-white">
				<div className="p-6">
					<h2 className="text-xl font-bold">
						<Image src="/logo/logo.svg" alt="Logo" width={"140"} height={"40"} />
					</h2>
				</div>
				<DashboardNav />
			</aside>

			{/* Main content */}
			<main className="flex-1 p-8">{children}</main>
		</div>
	);
}
