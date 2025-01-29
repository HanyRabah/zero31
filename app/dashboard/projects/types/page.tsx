import { Box } from "@mui/material";
import { TypeList } from "../../../../components/dashboard/projectsTypes";

export default function TypesPage() {
	return (
		<Box sx={{ px: 3, py: 4 }}>
			<TypeList />
		</Box>
	);
}
