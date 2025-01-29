// app/dashboard/projects/page.tsx
"use client";
import { Box } from "@mui/material";
import { ProjectPage } from "../../../components/dashboard/projects";

export default function ProjectsPage() {
	return (
		<Box sx={{ px: 3, py: 4 }}>
			<ProjectPage />
		</Box>
	);
}
