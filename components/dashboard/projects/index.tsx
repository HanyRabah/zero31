// components/dashboard/index.tsx
"use client";
import { Add as AddIcon, Delete, Edit } from "@mui/icons-material";
import {
	Avatar,
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
	Tooltip,
	Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import useProjects from "../../../hooks/useProjects";
import { Project } from "../../../types/dashboard";
import { ProjectForm } from "./ProjectForm";

interface ProjectModalState {
	open: boolean;
	project: Partial<Project> | null;
	loading: boolean;
}

export function ProjectPage() {
	const { data: projects, loading, deleteProject, addProject, updateProject } = useProjects();
	const [projectModal, setProjectModal] = useState<ProjectModalState>({
		open: false,
		project: null,
		loading: false,
	});

	const [formData, setFormData] = useState({
		title: "",
		slug: "",
		clientName: "",
		description: "",
		heroImage: "",
		heroImageAlt: "",
		thumbnail: "",
		thumbnailAlt: "",
		year: "",
		area: "",
		location: "",
		typeId: "",
		scopes: [] as string[],
		sections: [] as {
			description?: string;
			backgroundColor?: string;
			type: string;
			images: { url: string; alt?: string }[];
		}[],
	});

	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	const handleOpenModal = (project?: Project) => {
		if (project) {
			setFormData({
				title: project.title || "",
				slug: project.slug,
				clientName: project.clientName,
				description: project.description,
				heroImage: project.heroImage,
				heroImageAlt: project.heroImageAlt,
				thumbnail: project.thumbnail,
				thumbnailAlt: project.thumbnailAlt,
				typeId: project.typeId || "",
				scopes: project.scopes.map(s => s.scope.id),
				year: project.year || "",
				area: project.area || "",
				location: project.location || "",
				sections: project.sections.map(section => ({
					description: section.description || "",
					backgroundColor: section.backgroundColor || "",
					type: section.type || "",
					images: section.images.map(img => ({
						url: img.url,
						alt: img.alt || "",
					})),
				})),
			});
		}
		setProjectModal({
			open: true,
			project: project || null,
			loading: false,
		});
		setFormErrors({});
	};

	const handleCloseModal = () => {
		setProjectModal({ open: false, project: null, loading: false });
		setFormData({
			title: "",
			slug: "",
			clientName: "",
			description: "",
			heroImage: "",
			heroImageAlt: "",
			thumbnail: "",
			thumbnailAlt: "",
			typeId: "",
			scopes: [],
			year: "",
			area: "",
			location: "",
			sections: [],
		});
		setFormErrors({});
	};

	const validateForm = () => {
		const errors: Record<string, string> = {};
		if (!formData.title) errors.title = "Title is required";
		if (!formData.slug) errors.title = "Slug is required";
		if (!formData.clientName) errors.clientName = "Client name is required";
		if (!formData.description) errors.description = "Description is required";
		if (!formData.heroImage) errors.heroImage = "Hero image is required";
		if (!formData.heroImageAlt) errors.heroImageAlt = "Hero image alt is required";
		if (!formData.thumbnail) errors.thumbnail = "Thumbnail is required";
		if (!formData.thumbnailAlt) errors.thumbnailAlt = "Thumbnail alt is required";
		if (!formData.typeId) errors.typeId = "Project type is required";
		if (formData.scopes.length === 0) errors.scopes = "At least one scope is required";
		// validate if there is a section with no description
		// validate section image and alt
		formData.sections.forEach((section, index) => {
			//if (!section.description) errors[`sections[${index}].description`] = "Description is required";
			if (section.images.length === 0) errors[`sections[${index}].images`] = "At least one image is required";
			section.images.forEach((img, imgIndex) => {
				if (!img?.url) errors[`sections[${index}].images[${imgIndex}].url`] = "Image is required";
				if (!img?.alt) errors[`sections[${index}].images[${imgIndex}].alt`] = "Image alt is required";
			});
		});

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;
		setProjectModal(prev => ({ ...prev, loading: true }));
		try {
			const submitData: Project = {
				...formData,
				// Ensure all required fields are present
				title: formData.title.trim(),
				slug: formData.slug.trim(),
				clientName: formData.clientName.trim(),
				description: formData.description.trim(),
				heroImage: formData.heroImage,
				heroImageAlt: formData.heroImageAlt || "",
				thumbnail: formData.thumbnail,
				thumbnailAlt: formData.thumbnailAlt || "",
				typeId: formData.typeId,
				// Format sections properly
				// @ts-expect-error - Ensure description is always a string
				sections: formData.sections.map(section => ({
					description: section.description?.trim() || "",
					backgroundColor: section.backgroundColor || "",
					images: section.images
						.filter(img => img.url)
						.map(img => ({
							url: img.url,
							alt: img.alt || "",
						})),
				})),
				// Ensure scopes is always an array
				// @ts-expect-error - Ensure scopes is always an array
				scopes: formData.scopes || [],
			};

			if (projectModal.project?.id) {
				// For updates, include the ID in the submission data
				await updateProject(projectModal.project.id, {
					...submitData,
					id: projectModal.project.id,
				});
			} else {
				await addProject(submitData);
			}

			handleCloseModal();
		} catch (error: any) {
			console.error("Submission error:", error);
			// Set form-level error
			setFormErrors(prev => ({
				...prev,
				submit: error.message || "Failed to submit project",
			}));
		} finally {
			setProjectModal(prev => ({ ...prev, loading: false }));
		}
	};

	// For the delete dialog, fix the setDeleteDialog reference:
	const handleDeleteDialogClose = () => {
		setProjectToDelete(null);
		setDeleteDialogOpen(false);
	};
	const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleDeleteClick = (project: Project) => {
		setProjectToDelete(project);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!projectToDelete) return;

		setDeleteDialogOpen(false);
		try {
			await deleteProject(projectToDelete.id);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteCancel = () => {
		setProjectToDelete(null);
		setDeleteDialogOpen(false);
	};

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
				<Typography variant="h4">Projects</Typography>
				<Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
					Add Project
				</Button>
			</Box>

			<TableContainer component={Paper} elevation={2}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Project</TableCell>
							<TableCell>Type</TableCell>
							<TableCell>Scopes</TableCell>
							<TableCell>Year</TableCell>
							<TableCell>Last Updated</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{projects.map(project => {
							return (
								<TableRow key={project.id} sx={{ "&:hover": { backgroundColor: "action.hover" } }}>
									<TableCell>
										<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
											<Avatar variant="rounded" sx={{ width: 56, height: 56, position: "relative" }}>
												{/* <Image src={project.thumbnail} alt={project.thumbnailAlt} fill style={{ objectFit: "cover" }} /> */}
												<img
													src={project.thumbnail}
													alt={project.thumbnailAlt || "Thumbnail Image"}
													className="object-cover w-full h-full"
												/>
											</Avatar>
											<Box>
												<Typography variant="subtitle2">{project.title}</Typography>
												<Typography variant="caption" color="text.secondary">
													{project.clientName}
												</Typography>
											</Box>
										</Box>
									</TableCell>
									<TableCell>
										{project?.type && (
											<Chip
												key={project.type.id}
												label={project.type.name}
												size="small"
												color="primary"
												variant="outlined"
											/>
										)}
									</TableCell>
									<TableCell>
										<Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
											{project.scopes?.map(scope => (
												<Chip key={scope.scope.id} label={scope.scope.name} size="small" variant="outlined" />
											))}
										</Box>
									</TableCell>
									<TableCell>{project.year}</TableCell>
									<TableCell>{format(new Date(project.updatedAt), "MMM d, yyyy")}</TableCell>
									<TableCell align="right">
										<Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
											<Tooltip title="Edit">
												<IconButton size="small" color="primary" onClick={() => handleOpenModal(project)}>
													<Edit fontSize="small" />
												</IconButton>
											</Tooltip>
											<Tooltip title="Delete">
												<IconButton size="small" color="error" onClick={() => handleDeleteClick(project)}>
													<Delete fontSize="small" />
												</IconButton>
											</Tooltip>
										</Box>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Add/Edit Modal */}

			<Dialog open={projectModal.open} onClose={handleCloseModal} maxWidth="md" fullWidth>
				<DialogTitle>{projectModal.project ? "Edit Project" : "Add Project"}</DialogTitle>
				<DialogContent>
					{/* @ts-expect-error - Need to be fixed later */}
					<ProjectForm project={formData} setFormData={setFormData} formErrors={formErrors} />
					{formErrors.submit && (
						<Typography color="error" sx={{ mt: 2 }}>
							{formErrors.submit}
						</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModal} disabled={projectModal.loading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} disabled={projectModal.loading} variant="contained">
						{projectModal.loading ? "Saving..." : projectModal.project ? "Update" : "Add"}
					</Button>
				</DialogActions>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
				<DialogTitle>Delete Project</DialogTitle>
				<DialogContent>
					Are you sure you want to delete "{projectToDelete?.title}"? This action cannot be undone.
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialogOpen(false)} disabled={loading}>
						Cancel
					</Button>
					<Button onClick={handleDeleteConfirm} color="error" disabled={loading}>
						{loading ? "Deleting..." : "Delete"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
