// components/dashboard/DashboardNav.tsx
"use client";
import { Dashboard } from "@mui/icons-material";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import FolderIcon from "@mui/icons-material/Folder";
import GroupIcon from "@mui/icons-material/Group";
import LayersIcon from "@mui/icons-material/Layers";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: Dashboard,
	},
	{
		title: "Projects",
		href: "/dashboard/projects",
		icon: LayersIcon,
	},
	{
		title: "Project Scopes",
		href: "/dashboard/projects/scopes",
		icon: DynamicFeedIcon,
	},
	{
		title: "Project Types",
		href: "/dashboard/projects/types",
		icon: FolderIcon,
	},
	{
		title: "Users",
		href: "/dashboard/users",
		icon: GroupIcon,
	},
];

export function DashboardNav() {
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			// Call logout API endpoint
			const response = await fetch("/api/auth/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				// Redirect to login page
				router.push("/login");
			} else {
				console.error("Logout failed");
			}
		} catch (error) {
			console.error("Logout error:", error);
		}
	};
	return (
		<div className="flex flex-col h-full">
			<nav className="grid items-start gap-2 p-6">
				{navItems.map((item, index) => {
					const Icon = item.icon;

					return (
						<Link
							key={index}
							href={item.href}
							className={`flex items-center p-8 rounded-lg transition-colors duration-200 hover:bg-yellow hover:text-black ${
								pathname === item.href ? "bg-yellow text-black" : "hover:bg-primary-50"
							}`}>
							<Icon sx={{ fontSize: 28, mr: 2 }} />
							{item.title}
						</Link>
					);
				})}
			</nav>
			{/* Logout button */}
			<button
				onClick={handleLogout}
				className="flex items-center p-8 mt-auto mb-6 mx-6 rounded-lg transition-colors duration-200 hover:bg-red-500 hover:text-white">
				<LogoutIcon sx={{ fontSize: 28, mr: 2 }} />
				Logout
			</button>
		</div>
	);
}
