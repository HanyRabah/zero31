import { Box } from "@mui/material";
import { Suspense } from "react";
import { TypeList } from "../../../../components/dashboard/projectsTypes";

export default function TypesPage() {
	return (
		<Box sx={{ px: 3, py: 4 }}>
			<Suspense>
				<TypeList />
			</Suspense>
		</Box>
	);
}
