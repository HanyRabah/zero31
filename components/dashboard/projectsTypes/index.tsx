// components/dashboard/TypeList.tsx
"use client";
import useTypes from "@/hooks/useTypes";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
	Box,
	Button,
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

interface ProjectType {
	id: string;
	name: string;
	projects?: { id: string }[];
	createdAt: Date;
}

interface TypeModalState {
	open: boolean;
	type: ProjectType | null;
	loading: boolean;
}

interface ProjectType {
	id: string;
	name: string;
	projects?: { id: string }[];
	createdAt: Date;
}

export function TypeList() {
	const { data: types, loading, error, deleteType, addType, updateType } = useTypes();

	// State for delete dialog
	const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: ProjectType | null }>({
		open: false,
		type: null,
	});

	// State for add/edit modal
	const [typeModal, setTypeModal] = useState<TypeModalState>({
		open: false,
		type: null,
		loading: false,
	});

	// State for form
	const [formName, setFormName] = useState("");
	const [formError, setFormError] = useState("");

	const handleOpenModal = (type?: ProjectType) => {
		setTypeModal({
			open: true,
			type: type || null,
			loading: false,
		});
		setFormName(type?.name || "");
		setFormError("");
	};

	const handleCloseModal = () => {
		setTypeModal({ open: false, type: null, loading: false });
		setFormName("");
		setFormError("");
	};

	const handleSubmit = async () => {
		if (!formName.trim()) {
			setFormError("Type name is required");
			return;
		}

		setTypeModal(prev => ({ ...prev, loading: true }));
		try {
			if (typeModal.type) {
				// Update
				await updateType(typeModal.type.id, { name: formName });
			} else {
				// Add
				await addType({ name: formName });
			}
			handleCloseModal();
		} catch (error) {
			setFormError("Failed to save type");
		} finally {
			setTypeModal(prev => ({ ...prev, loading: false }));
		}
	};

	const handleDeleteClick = (type: ProjectType) => {
		setDeleteDialog({ open: true, type });
	};

	const handleDeleteConfirm = async () => {
		if (deleteDialog.type) {
			await deleteType(deleteDialog.type.id);
			setDeleteDialog({ open: false, type: null });
		}
	};

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
				<Typography variant="h4">Project Types</Typography>
				<Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
					Add Type
				</Button>
			</Box>

			<TableContainer component={Paper} elevation={1}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Type Name</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{types.map(type => (
							<TableRow
								key={type.id}
								sx={{
									"&:hover": {
										backgroundColor: "action.hover",
									},
								}}>
								<TableCell>
									<Typography variant="body1">{type.name}</Typography>
								</TableCell>
								<TableCell align="right">
									<Tooltip title="Edit">
										<IconButton size="small" onClick={() => handleOpenModal(type)} color="primary">
											<EditIcon fontSize="small" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete">
										<IconButton
											size="small"
											onClick={() => handleDeleteClick(type)}
											color="error"
											sx={{ ml: 1 }}
											disabled={type.projects && type.projects.length > 0}>
											<DeleteIcon fontSize="small" />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
						{types.length === 0 && (
							<TableRow>
								<TableCell colSpan={3} align="center">
									<Typography color="text.secondary">No project types found</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Add/Edit Modal */}
			<Dialog open={typeModal.open} onClose={handleCloseModal} maxWidth="sm" fullWidth>
				<DialogTitle>{typeModal.type ? "Edit Project Type" : "Add Project Type"}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Type Name"
						fullWidth
						value={formName}
						onChange={e => {
							setFormName(e.target.value);
							setFormError("");
						}}
						error={!!formError}
						helperText={formError}
						disabled={typeModal.loading}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModal} disabled={typeModal.loading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} loading={typeModal.loading} variant="contained">
						{typeModal.type ? "Update" : "Add"}
					</Button>
				</DialogActions>
			</Dialog>
			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, type: null })}>
				<DialogTitle>Delete Project Type</DialogTitle>
				<DialogContent>
					<Typography>
						Are you sure you want to delete the project type "{deleteDialog.type?.name}"? This action cannot be undone.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialog({ open: false, type: null })}>Cancel</Button>
					<Button onClick={handleDeleteConfirm} color="error" variant="contained">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
