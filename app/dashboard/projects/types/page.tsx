import { TypeList } from "@/components/dashboard/projectsTypes";
import { Box } from "@mui/material";

export default function TypesPage() {
	return (
		<Box sx={{ px: 3, py: 4 }}>
			<TypeList />
		</Box>
	);
}
