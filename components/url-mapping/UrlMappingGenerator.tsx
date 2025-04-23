"use client";

import { Check as CheckIcon, ContentCopy as CopyIcon } from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";

// URL mapping tool that generates SQL update statements
export function UrlMappingGenerator() {
	const [oldUrls, setOldUrls] = useState("");
	const [newUrls, setNewUrls] = useState("");
	const [mappings, setMappings] = useState<{ oldUrl: string; newUrl: string }[]>([]);
	const [sqlOutput, setSqlOutput] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	// Process the URLs and generate mappings
	const processUrls = () => {
		setError(null);

		const oldUrlList = oldUrls
			.trim()
			.split("\n")
			.filter(url => url.trim());
		const newUrlList = newUrls
			.trim()
			.split("\n")
			.filter(url => url.trim());

		if (oldUrlList.length === 0 || newUrlList.length === 0) {
			setError("Please provide both old and new URLs");
			return;
		}

		if (oldUrlList.length !== newUrlList.length) {
			setError(`URL count mismatch: ${oldUrlList.length} old URLs vs ${newUrlList.length} new URLs`);
			return;
		}

		// Create mappings
		const newMappings = oldUrlList.map((oldUrl, index) => ({
			oldUrl: oldUrl.trim(),
			newUrl: newUrlList[index].trim(),
		}));

		setMappings(newMappings);

		// Generate SQL update statements
		const sqlStatements = newMappings.map(
			mapping => `UPDATE "Image" SET "url" = '${mapping.newUrl}' WHERE "url" = '${mapping.oldUrl}';`
		);

		// Combine them into a single SQL script
		const fullSql = `-- URL migration script generated on ${new Date().toISOString()}
-- Old blob storage: vercel_blob_rw_L6nPF9RjVQQf6oWA_RcQ4BD990wuwaORPO0i1KHX1efmaA4
-- New blob storage: vercel_blob_rw_7xJ9TsMqrsqlixYr_MXP7B0mpAakIaM8SyydbyGbkv0EtjY

BEGIN TRANSACTION;

${sqlStatements.join("\n")}

-- Verify the changes
SELECT COUNT(*) AS "updated_rows" FROM "Image" 
WHERE "url" LIKE 'https://7xj9tsmqrsqlixyr.public.blob.vercel-storage.com%';

COMMIT;
`;

		setSqlOutput(fullSql);
	};

	// Copy SQL to clipboard
	const copySqlToClipboard = () => {
		navigator.clipboard.writeText(sqlOutput).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<Box sx={{ maxWidth: 1000, margin: "0 auto", p: 2 }}>
			<Typography variant="h4" gutterBottom>
				URL Mapping Generator
			</Typography>

			<Typography variant="subtitle1" gutterBottom color="text.secondary">
				Generate SQL update statements to update image URLs in the database
			</Typography>

			{error && (
				<Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
					{error}
				</Alert>
			)}

			<Box sx={{ display: "flex", gap: 2, mb: 3 }}>
				<Box sx={{ flex: 1 }}>
					<Typography variant="subtitle2" gutterBottom>
						Old URLs (one per line)
					</Typography>
					<TextField
						multiline
						rows={10}
						fullWidth
						value={oldUrls}
						onChange={e => setOldUrls(e.target.value)}
						placeholder="https://l6npf9rjvqqf6owa.public.blob.vercel-storage.com/..."
						variant="outlined"
						size="small"
					/>
				</Box>

				<Box sx={{ flex: 1 }}>
					<Typography variant="subtitle2" gutterBottom>
						New URLs (one per line)
					</Typography>
					<TextField
						multiline
						rows={10}
						fullWidth
						value={newUrls}
						onChange={e => setNewUrls(e.target.value)}
						placeholder="https://7xj9tsmqrsqlixyr.public.blob.vercel-storage.com/..."
						variant="outlined"
						size="small"
					/>
				</Box>
			</Box>

			<Box sx={{ mb: 3 }}>
				<Button variant="contained" color="primary" onClick={processUrls} disabled={!oldUrls.trim() || !newUrls.trim()}>
					Generate SQL Updates
				</Button>
			</Box>

			{mappings.length > 0 && (
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6" gutterBottom>
						URL Mappings ({mappings.length})
					</Typography>

					<TableContainer component={Paper} sx={{ maxHeight: 300 }}>
						<Table stickyHeader size="small">
							<TableHead>
								<TableRow>
									<TableCell width="50%">Old URL</TableCell>
									<TableCell width="50%">New URL</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{mappings.map((mapping, index) => (
									<TableRow key={index} hover>
										<TableCell
											sx={{
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "ellipsis",
												maxWidth: 0,
											}}>
											{mapping.oldUrl}
										</TableCell>
										<TableCell
											sx={{
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "ellipsis",
												maxWidth: 0,
											}}>
											{mapping.newUrl}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			)}

			{sqlOutput && (
				<Box sx={{ mb: 3 }}>
					<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
						<Typography variant="h6">SQL Update Script</Typography>

						<IconButton color={copied ? "success" : "primary"} onClick={copySqlToClipboard}>
							{copied ? <CheckIcon /> : <CopyIcon />}
						</IconButton>
					</Box>

					<Paper sx={{ p: 2, bgcolor: "grey.900", color: "white", overflow: "auto" }}>
						<pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{sqlOutput}</pre>
					</Paper>
				</Box>
			)}

			<Alert severity="info" sx={{ mt: 3 }}>
				<Typography variant="subtitle2">How to use:</Typography>
				<ol>
					<li>After migrating files from old blob to new blob, paste the old URLs in the left box</li>
					<li>Paste the corresponding new URLs in the right box (must be in the same order)</li>
					<li>Click "Generate SQL Updates" to create the SQL statements</li>
					<li>Copy the SQL script and run it in your database management tool</li>
					<li>Always back up your database before running update scripts</li>
				</ol>
			</Alert>
		</Box>
	);
}
