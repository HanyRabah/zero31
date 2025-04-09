// app/dashboard/users/page.tsx
import { Box } from "@mui/material";
import { Suspense } from "react";
import Users from "../../../components/dashboard/users";

// Server Component
export default async function UsersPage() {
	return (
		<Box sx={{ p: 3 }}>
			<Suspense>
				<Users />
			</Suspense>
		</Box>
	);
}
