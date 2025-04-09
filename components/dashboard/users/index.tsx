// components/dashboard/UserList.tsx
"use client";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Person as PersonIcon } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
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
import { User } from "@prisma/client";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useUsers from "../../../hooks/useUsers";

interface UserModalState {
	open: boolean;
	user: User | null;
	loading: boolean;
}

type Errors = {
	name?: string;
	email?: string;
	password?: string;
	role?: string;
};

function UserList() {
	const { data: users, loading, error, deleteUser, addUser, updateUser } = useUsers();
	const searchParams = useSearchParams();
	const search = searchParams.get("action");

	// State for delete dialog
	const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; user: User | null }>({
		open: false,
		user: null,
	});

	// State for add/edit modal
	const [userModal, setUserModal] = useState<UserModalState>({
		open: false,
		user: null,
		loading: false,
	});

	// Form state
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		role: "EDITOR" as "ADMIN" | "EDITOR",
	});
	const [formErrors, setFormErrors] = useState<Errors>({});

	const handleOpenModal = (user?: User) => {
		setUserModal({
			open: true,
			user: user || null,
			loading: false,
		});
		setFormData({
			name: user?.name || "",
			email: user?.email || "",
			password: "",
			role: user?.role || "EDITOR",
		});
		setFormErrors({});
	};

	const handleCloseModal = () => {
		setUserModal({ open: false, user: null, loading: false });
		setFormData({ name: "", email: "", password: "", role: "EDITOR" });
		setFormErrors({});
	};

	const validateForm = () => {
		const errors: Errors = {};
		if (!formData.name) errors.name = "Name is required";
		if (!formData.email) errors.email = "Email is required";
		if (!userModal.user && !formData.password) errors.password = "Password is required";
		if (!formData.role) errors.role = "Role is required";

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (formData.email && !emailRegex.test(formData.email)) {
			errors.email = "Invalid email format";
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;

		setUserModal(prev => ({ ...prev, loading: true }));
		try {
			if (userModal.user) {
				await updateUser(userModal.user.id, formData);
			} else {
				await addUser(formData);
			}
			handleCloseModal();
		} catch (error) {
			// Error handling is done in the hook
		}
	};

	const handleDeleteClick = (user: User) => {
		setDeleteDialog({ open: true, user });
	};

	const handleDeleteConfirm = async () => {
		if (deleteDialog.user) {
			await deleteUser(deleteDialog.user.id);
			setDeleteDialog({ open: false, user: null });
		}
	};

	const getRoleColor = (role: string) => {
		switch (role) {
			case "ADMIN":
				return "primary";
			case "EDITOR":
				return "secondary";
			default:
				return "default";
		}
	};

	useEffect(() => {
		if (search === "new") {
			handleOpenModal();
		}
	}, [search]);
	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
				<Typography variant="h4">Users</Typography>
				<Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
					Add User
				</Button>
			</Box>
			<TableContainer component={Paper} elevation={1}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>User</TableCell>
							<TableCell>Role</TableCell>
							<TableCell>Created</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user => (
							<TableRow
								key={user.id}
								sx={{
									"&:hover": {
										backgroundColor: "action.hover",
									},
								}}>
								<TableCell>
									<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
										<Avatar sx={{ bgcolor: "primary.light" }}>
											<PersonIcon />
										</Avatar>
										<Box>
											<Typography variant="subtitle2">{user.name}</Typography>
											<Typography variant="caption" color="text.secondary">
												{user.email}
											</Typography>
										</Box>
									</Box>
								</TableCell>
								<TableCell>
									<Chip label={user.role} color={getRoleColor(user.role)} size="small" />
								</TableCell>
								<TableCell>
									<Typography variant="body2" color="text.secondary">
										{format(new Date(user.createdAt), "MMM d, yyyy")}
									</Typography>
								</TableCell>
								<TableCell align="right">
									<Tooltip title="Edit User">
										<IconButton size="small" onClick={() => handleOpenModal(user)} color="primary">
											<EditIcon fontSize="small" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete User">
										<IconButton
											size="small"
											onClick={() => setDeleteDialog({ open: true, user })}
											color="error"
											sx={{ ml: 1 }}>
											<DeleteIcon fontSize="small" />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
						{users.length === 0 && (
							<TableRow>
								<TableCell colSpan={4} align="center">
									<Typography color="text.secondary">No users found</Typography>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Add/Edit Modal */}
			<Dialog open={userModal.open} onClose={handleCloseModal} maxWidth="sm" fullWidth>
				<DialogTitle>{userModal.user ? "Edit User" : "Add User"}</DialogTitle>
				<DialogContent>
					<Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
						<TextField
							label="Name"
							fullWidth
							value={formData.name}
							onChange={e => setFormData({ ...formData, name: e.target.value })}
							error={!!formErrors.name}
							helperText={formErrors.name}
						/>
						<TextField
							label="Email"
							type="email"
							fullWidth
							value={formData.email}
							onChange={e => setFormData({ ...formData, email: e.target.value })}
							error={!!formErrors.email}
							helperText={formErrors.email}
						/>
						{!userModal.user && (
							<TextField
								label="Password"
								type="password"
								fullWidth
								value={formData.password}
								onChange={e => setFormData({ ...formData, password: e.target.value })}
								error={!!formErrors.password}
								helperText={formErrors.password}
							/>
						)}
						<FormControl fullWidth>
							<InputLabel>Role</InputLabel>
							<Select
								value={formData.role}
								label="Role"
								onChange={e => setFormData({ ...formData, role: e.target.value as "ADMIN" | "EDITOR" })}>
								<MenuItem value="ADMIN">Admin</MenuItem>
								<MenuItem value="EDITOR">Editor</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModal} disabled={userModal.loading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} loading={userModal.loading} variant="contained">
						{userModal.user ? "Update" : "Add"}
					</Button>
				</DialogActions>
			</Dialog>
			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, user: null })}>
				<DialogTitle>Delete User</DialogTitle>
				<DialogContent>
					<Typography>
						Are you sure you want to delete the user "{deleteDialog.user?.name}"? This action cannot be undone.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialog({ open: false, user: null })}>Cancel</Button>
					<Button
						onClick={() => {
							handleDeleteConfirm();
							setDeleteDialog({ open: false, user: null });
						}}
						color="error"
						variant="contained">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
export default UserList;
