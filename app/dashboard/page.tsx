// app/dashboard/page.tsx
import { AddCircleOutline, Assessment, Folder, Label, People } from "@mui/icons-material";
import { Box, Grid2 as Grid, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { prisma } from "../../lib/prisma";

const statsIcons = {
	Projects: Assessment,
	"Project Scopes": Label,
	"Project Types": Folder,
	Users: People,
};

const quickActions = [
	{
		title: "Create New Project",
		description: "Add a new project to the portfolio",
		href: "/dashboard/projects/new",
		icon: AddCircleOutline,
	},
	{
		title: "Add New User",
		description: "Create a new user account",
		href: "/dashboard/users/new",
		icon: People,
	},
	{
		title: "Add Project Type",
		description: "Create a new project type",
		href: "/dashboard/projects/types/new",
		icon: Folder,
	},
];

export default async function DashboardPage() {
	// Fetch counts for dashboard stats
	const stats = await Promise.all([
		prisma.project.count(),
		prisma.projectScope.count(),
		prisma.projectType.count(),
		prisma.user.count(),
	]);

	const dashboardItems = [
		{ title: "Projects", count: stats[0], href: "/dashboard/projects", color: "#2196f3" },
		{ title: "Project Scopes", count: stats[1], href: "/dashboard/projects/scopes", color: "#4caf50" },
		{ title: "Project Types", count: stats[2], href: "/dashboard/projects/types", color: "#9c27b0" },
		{ title: "Users", count: stats[3], href: "/dashboard/users", color: "#ff9800" },
	];

	return (
		<Box sx={{ px: 3, py: 4 }}>
			<Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
				Dashboard Overview
			</Typography>

			{/* Stats Grid */}
			<Grid container spacing={3} sx={{ mb: 4 }}>
				{dashboardItems.map(item => {
					const Icon = statsIcons[item.title as keyof typeof statsIcons];
					return (
						<Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
							<Link href={item.href} style={{ textDecoration: "none" }}>
								<Paper
									elevation={1}
									sx={{
										p: 3,
										transition: "all 0.3s",
										"&:hover": {
											transform: "translateY(-4px)",
											boxShadow: 3,
										},
									}}>
									<Stack direction="row" spacing={2} alignItems="center">
										<Box
											sx={{
												backgroundColor: `${item.color}15`,
												borderRadius: "12px",
												p: 1.5,
											}}>
											<Icon sx={{ color: item.color, fontSize: 32 }} />
										</Box>
										<Box>
											<Typography color="text.secondary" variant="body2">
												{item.title}
											</Typography>
											<Typography variant="h4" sx={{ fontWeight: "bold" }}>
												{item.count}
											</Typography>
										</Box>
									</Stack>
								</Paper>
							</Link>
						</Grid>
					);
				})}
			</Grid>

			{/* Recent Activity & Quick Actions */}
			<Grid container spacing={3}>
				{/* Recent Activity */}
				<Grid size={{ xs: 12, md: 6 }}>
					<Paper sx={{ p: 3 }}>
						<Typography variant="h6" sx={{ mb: 2 }}>
							Recent Activity
						</Typography>
						<List>
							<ListItem>
								<ListItemText secondary="No recent activity" sx={{ color: "text.secondary" }} />
							</ListItem>
						</List>
					</Paper>
				</Grid>

				{/* Quick Actions */}
				<Grid size={{ xs: 12, md: 6 }}>
					<Paper sx={{ p: 3 }}>
						<Typography variant="h6" sx={{ mb: 2 }}>
							Quick Actions
						</Typography>
						<Stack spacing={2}>
							{quickActions.map(action => (
								<Link key={action.title} href={action.href} style={{ textDecoration: "none" }}>
									<Paper
										variant="outlined"
										sx={{
											p: 2,
											transition: "all 0.2s",
											"&:hover": {
												backgroundColor: "action.hover",
											},
										}}>
										<Stack direction="row" spacing={2} alignItems="center">
											<action.icon color="primary" />
											<Box>
												<Typography variant="subtitle1">{action.title}</Typography>
												<Typography variant="body2" color="text.secondary">
													{action.description}
												</Typography>
											</Box>
										</Stack>
									</Paper>
								</Link>
							))}
						</Stack>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
}
