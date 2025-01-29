// app/dashboard/projects/page.tsx
import { Box } from "@mui/material";
import ScopesList from "../../../../components/dashboard/projectsScopes";

export default function ProjectsPage() {
	return (
		<Box sx={{ px: 3, py: 4 }}>
			<ScopesList />
		</Box>
	);
}
