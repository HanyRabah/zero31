// app/dashboard/projects/page.tsx
import ScopesList from "@/components/dashboard/projectsScopes";
import { Box } from "@mui/material";

export default function ProjectsPage() {
	return (
		<Box sx={{ px: 3, py: 4 }}>
			<ScopesList />
		</Box>
	);
}
