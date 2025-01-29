// components/dashboard/ScopeManagement.tsx
"use client";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { useState } from "react";
import useScopes from "../../../hooks/useScopes";
import { ProjectScope } from "../../../types/dashboard";

interface ScopeModalState {
	open: boolean;
	scope: ProjectScope | null;
	loading: boolean;
}

function ScopeList() {
	const { data: scopes, loading, error, deleteScope, addScope, updateScope } = useScopes();

	// State for delete dialog
	const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; scope: ProjectScope | null }>({
		open: false,
		scope: null,
	});

	// State for add/edit modal
	const [scopeModal, setScopeModal] = useState<ScopeModalState>({
		open: false,
		scope: null,
		loading: false,
	});

	// Form state
	const [formName, setFormName] = useState("");
	const [formError, setFormError] = useState("");

	const handleOpenModal = (scope?: ProjectScope) => {
		setScopeModal({
			open: true,
			scope: scope || null,
			loading: false,
		});
		setFormName(scope?.name || "");
		setFormError("");
	};

	const handleCloseModal = () => {
		setScopeModal({ open: false, scope: null, loading: false });
		setFormName("");
		setFormError("");
	};

	const handleSubmit = async () => {
		if (!formName.trim()) {
			setFormError("Scope name is required");
			return;
		}

		setScopeModal(prev => ({ ...prev, loading: true }));
		try {
			if (scopeModal.scope) {
				await updateScope(scopeModal.scope.id, { name: formName });
			} else {
				await addScope({ name: formName });
			}
			handleCloseModal();
		} catch (error) {
			setFormError("Failed to save scope");
		} finally {
			setScopeModal(prev => ({ ...prev, loading: false }));
		}
	};

	const handleDeleteClick = (scope: ProjectScope) => {
		setDeleteDialog({ open: true, scope });
	};

	const handleDeleteConfirm = async () => {
		if (deleteDialog.scope) {
			await deleteScope(deleteDialog.scope.id);
			setDeleteDialog({ open: false, scope: null });
		}
	};

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
				<Typography variant="h4">Project Scopes</Typography>
				<Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
					Add Scope
				</Button>
			</Box>

			<TableContainer component={Paper} elevation={1}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Scope Name</TableCell>
							<TableCell align="center">Projects Using</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{scopes.map(scope => (
							<TableRow
								key={scope.id}
								sx={{
									"&:hover": {
										backgroundColor: "action.hover",
									},
								}}>
								<TableCell>
									<Typography variant="body1">{scope.name}</Typography>
								</TableCell>
								<TableCell align="center">
									<Chip label={scope.projects?.length || 0} color="primary" variant="outlined" size="small" />
								</TableCell>
								<TableCell align="right">
									<Tooltip title="Edit Scope">
										<IconButton size="small" onClick={() => handleOpenModal(scope)} color="primary">
											<EditIcon fontSize="small" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete Scope">
										<IconButton
											size="small"
											onClick={() => handleDeleteClick(scope)}
											color="error"
											sx={{ ml: 1 }}
											disabled={scope.projects && scope.projects.length > 0}>
											<DeleteIcon fontSize="small" />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
						{scopes.length === 0 && (
							<TableRow>
								<TableCell colSpan={3} align="center">
									<Typography color="text.secondary">No project scopes found</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Add/Edit Modal */}
			<Dialog open={scopeModal.open} onClose={handleCloseModal} maxWidth="sm" fullWidth>
				<DialogTitle>{scopeModal.scope ? "Edit Project Scope" : "Add Project Scope"}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Scope Name"
						fullWidth
						value={formName}
						onChange={e => {
							setFormName(e.target.value);
							setFormError("");
						}}
						error={!!formError}
						helperText={formError}
						disabled={scopeModal.loading}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModal} disabled={scopeModal.loading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} loading={scopeModal.loading} variant="contained">
						{scopeModal.scope ? "Update" : "Add"}
					</Button>
				</DialogActions>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, scope: null })}>
				<DialogTitle>Delete Project Scope</DialogTitle>
				<DialogContent>
					<Typography>
						Are you sure you want to delete the scope "{deleteDialog.scope?.name}"? This action cannot be undone.
					</Typography>
					{deleteDialog.scope?.projects && deleteDialog.scope.projects.length > 0 && (
						<Typography color="error" sx={{ mt: 2 }}>
							This scope cannot be deleted as it is being used by {deleteDialog.scope.projects.length} project(s).
						</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialog({ open: false, scope: null })}>Cancel</Button>
					<Button
						onClick={handleDeleteConfirm}
						color="error"
						variant="contained"
						disabled={deleteDialog.scope?.projects && deleteDialog.scope.projects.length > 0}>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default ScopeList;
