"use client";

import { Check as CheckIcon, ContentCopy as CopyIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	Chip,
	CircularProgress,
	IconButton,
	Paper,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";

// API endpoint to generate SQL
const GENERATE_SQL_API = "/api/blobs/generate-sql";

interface UrlMapping {
	oldUrl: string;
	newUrl: string;
	path: string;
}

export function SqlGeneratorPage() {
	const [oldBlobSecret, setOldBlobSecret] = useState("vercel_blob_rw_L6nPF9RjVQQf6oWA_RcQ4BD990wuwaORPO0i1KHX1efmaA4");
	const [newBlobSecret, setNewBlobSecret] = useState("vercel_blob_rw_7xJ9TsMqrsqlixYr_MXP7B0mpAakIaM8SyydbyGbkv0EtjY");
	const [loading, setLoading] = useState(false);
	const [sqlScript, setSqlScript] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	const [activeTab, setActiveTab] = useState(0);
	const [mappings, setMappings] = useState<UrlMapping[]>([]);
	const [unmappedFiles, setUnmappedFiles] = useState<UrlMapping[]>([]);
	const [stats, setStats] = useState({ total: 0, matched: 0, unmatched: 0 });

	// Generate SQL
	const generateSql = async () => {
		if (!oldBlobSecret || !newBlobSecret) {
			setError("Both blob secrets are required");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await fetch(GENERATE_SQL_API, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					oldBlobSecret,
					newBlobSecret,
				}),
			});

			if (!response.ok) {
				throw new Error(`Error ${response.status}: ${await response.text()}`);
			}

			const data = await response.json();

			setSqlScript(data.sqlScript);
			setMappings(data.mappings);
			setUnmappedFiles(data.unmappedFiles);
			setStats(data.stats);
		} catch (error: any) {
			console.error("Failed to generate SQL:", error);
			setError(error.message || "Failed to generate SQL");
		} finally {
			setLoading(false);
		}
	};

	// Copy SQL to clipboard
	const copySqlToClipboard = () => {
		navigator.clipboard.writeText(sqlScript).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	// Handle tab change
	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setActiveTab(newValue);
	};

	return (
		<Box sx={{ maxWidth: 1200, margin: "0 auto", p: 2 }}>
			<Typography variant="h4" gutterBottom>
				SQL Update Generator
			</Typography>

			<Typography variant="subtitle1" gutterBottom color="text.secondary">
				Generate SQL statements to update image URLs after blob migration
			</Typography>

			{error && (
				<Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
					{error}
				</Alert>
			)}

			<Paper sx={{ p: 3, mb: 3 }}>
				<Typography variant="h6" gutterBottom>
					Blob Storage Configuration
				</Typography>

				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
					<TextField
						label="Old Blob Secret"
						fullWidth
						value={oldBlobSecret}
						onChange={e => setOldBlobSecret(e.target.value)}
						placeholder="vercel_blob_rw_..."
						size="small"
					/>

					<TextField
						label="New Blob Secret"
						fullWidth
						value={newBlobSecret}
						onChange={e => setNewBlobSecret(e.target.value)}
						placeholder="vercel_blob_rw_..."
						size="small"
					/>
				</Box>

				<Button
					variant="contained"
					color="primary"
					onClick={generateSql}
					disabled={loading || !oldBlobSecret || !newBlobSecret}
					startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}>
					{loading ? "Generating..." : "Generate SQL Updates"}
				</Button>
			</Paper>

			{stats.total > 0 && (
				<Box sx={{ mb: 3 }}>
					<Typography variant="h6" gutterBottom>
						Results
					</Typography>

					<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
						<Chip label={`Total Files: ${stats.total}`} color="default" variant="outlined" />
						<Chip label={`Matched: ${stats.matched}`} color="success" variant="outlined" />
						<Chip
							label={`Unmatched: ${stats.unmatched}`}
							color={stats.unmatched > 0 ? "warning" : "default"}
							variant="outlined"
						/>
					</Box>

					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs value={activeTab} onChange={handleTabChange}>
							<Tab label="SQL Script" />
							<Tab label={`Matched Files (${mappings.length})`} />
							<Tab label={`Unmatched Files (${unmappedFiles.length})`} />
						</Tabs>
					</Box>

					<Box sx={{ pt: 2 }}>
						{activeTab === 0 && (
							<Box>
								<Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
									<IconButton color={copied ? "success" : "primary"} onClick={copySqlToClipboard} disabled={!sqlScript}>
										{copied ? <CheckIcon /> : <CopyIcon />}
									</IconButton>
								</Box>

								<Paper sx={{ p: 2, bgcolor: "grey.900", color: "white", overflow: "auto", maxHeight: 400 }}>
									{sqlScript ? (
										<pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{sqlScript}</pre>
									) : (
										<Typography color="text.secondary" align="center" sx={{ py: 4 }}>
											Generate SQL updates to see the script
										</Typography>
									)}
								</Paper>
							</Box>
						)}

						{activeTab === 1 && (
							<TableContainer component={Paper} sx={{ maxHeight: 400 }}>
								<Table stickyHeader size="small">
									<TableHead>
										<TableRow>
											<TableCell>Path</TableCell>
											<TableCell>Old URL</TableCell>
											<TableCell>New URL</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{mappings.length > 0 ? (
											mappings.map((mapping, index) => (
												<TableRow key={index} hover>
													<TableCell
														sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
														{mapping.path}
													</TableCell>
													<TableCell
														sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
														{mapping.oldUrl}
													</TableCell>
													<TableCell
														sx={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
														{mapping.newUrl}
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={3} align="center">
													No matched files found
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						)}

						{activeTab === 2 && (
							<TableContainer component={Paper} sx={{ maxHeight: 400 }}>
								<Table stickyHeader size="small">
									<TableHead>
										<TableRow>
											<TableCell>Path</TableCell>
											<TableCell>Old URL</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{unmappedFiles.length > 0 ? (
											unmappedFiles.map((file, index) => (
												<TableRow key={index} hover>
													<TableCell
														sx={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
														{file.path}
													</TableCell>
													<TableCell
														sx={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
														{file.oldUrl}
													</TableCell>
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={2} align="center">
													No unmatched files found
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</TableContainer>
						)}
					</Box>
				</Box>
			)}

			<Alert severity="info" sx={{ mt: 3 }}>
				<Typography variant="subtitle2">Instructions:</Typography>
				<ol>
					<li>Enter your old and new Vercel Blob secrets</li>
					<li>Click "Generate SQL Updates" to analyze both blob storages and create SQL statements</li>
					<li>Review the matched and unmatched files</li>
					<li>Copy the SQL script and run it in your database management tool</li>
					<li>Always back up your database before running update scripts</li>
				</ol>
			</Alert>
		</Box>
	);
}
