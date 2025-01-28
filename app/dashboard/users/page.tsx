// app/dashboard/users/page.tsx
import Users from "@/components/dashboard/users";
import { Box } from "@mui/material";

// Server Component
export default async function UsersPage() {
	return (
		<Box sx={{ p: 3 }}>
			<Users />
		</Box>
	);
}
