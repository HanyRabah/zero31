import { Button } from "@mui/material";

export function ScopeList({ scopes }: any) {
	return (
		<div className="grid gap-4">
			{scopes.map((scope: any) => (
				<div key={scope.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
					<span>{scope.name}</span>
					<div className="flex gap-2">
						<Button variant="outlined" size="small">
							Edit
						</Button>
						<Button variant="contained" color="error" size="small">
							Delete
						</Button>
					</div>
				</div>
			))}
		</div>
	);
}
