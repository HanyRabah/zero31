// app/dashboard/projects/page.tsx
"use client";
import { ProjectPage } from "@/components/dashboard/projects";
import { Box } from "@mui/material";

export default function ProjectsPage() {
	return (
		<Box sx={{ px: 3, py: 4 }}>
			<ProjectPage />
		</Box>
	);
}
