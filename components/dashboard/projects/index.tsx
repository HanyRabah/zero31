// components/dashboard/index.tsx
"use client";
import { Add as AddIcon, Delete, DragIndicator, Edit } from "@mui/icons-material";
import {
	AlertColor,
	AlertProps,
	Avatar,
	Box,
	Button,
	Chip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Alert as MuiAlert,
	Paper,
	Snackbar,
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
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import useProjects from "../../../hooks/useProjects";
import { DragDropContextClient } from "./DragDropContextClient";
import { ProjectForm } from "./ProjectForm";
import { Project, ProjectSection, ProjectsOnScopes, ProjectType } from "@prisma/client";
import { CombinedProject } from "@/types/main";

const Droppable = dynamic(() => import("react-beautiful-dnd").then(mod => mod.Droppable), { ssr: false });

const Draggable = dynamic(() => import("react-beautiful-dnd").then(mod => mod.Draggable), { ssr: false });

interface ProjectModalState {
	open: boolean;
	project: Partial<Project> | null;
	loading: boolean;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ProjectPage() {
	const { data: projects, loading, deleteProject, addProject, updateProject, reorderProjects } = useProjects();
	const searchParams = useSearchParams();
	const search = searchParams.get("action");
	const [projectModal, setProjectModal] = useState<ProjectModalState>({
		open: false,
		project: null,
		loading: false,
	});
	const [orderedProjects, setOrderedProjects] = useState<CombinedProject[]>([]);
	console.log("🚀 ~ ProjectPage ~ orderedProjects:", orderedProjects)
	const [dragEnabled, setDragEnabled] = useState(true);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success" as AlertColor,
	});

	const [formData, setFormData] = useState<CombinedProject>({
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
		scopes: [] ,
		isCompleted: false,
		sections: [],
		type: {} 
	});

	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	const handleOpenModal = (project?: CombinedProject) => {
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
				// @ts-expect-error I don't know
				scopes: project.scopes.map(s => s.scope.id),
				isCompleted: project.isCompleted || false,
				year: project.year || "",
				area: project.area || "",
				location: project.location || "",
				type: project.type,
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
			isCompleted: false,
			year: "",
			area: "",
			location: "",
			sections: [],
			type: {},
		});
		setFormErrors({});
	};

	const validateForm = () => {
		const errors: Record<string, string> = {};
		if (!formData.title) errors.title = "Title is required";
		if (!formData.clientName) errors.clientName = "Client name is required";
		if (!formData.description) errors.description = "Description is required";
		if (!formData.heroImage) errors.heroImage = "Hero image is required";
		if (!formData.heroImageAlt) errors.heroImageAlt = "Hero image alt is required";
		if (!formData.thumbnail) errors.thumbnail = "Thumbnail is required";
		if (!formData.thumbnailAlt) errors.thumbnailAlt = "Thumbnail alt is required";
		if (!formData.typeId) errors.typeId = "Project type is required";
		if (formData?.scopes?.length === 0) errors.scopes = "At least one scope is required";

		formData?.sections?.forEach((section, index) => {
			if (section.images.length === 0) errors[`sections[${index}].images`] = "At least one image is required";
			section.images.forEach((img, imgIndex) => {
				if (!img?.url) errors[`sections[${index}].images[${imgIndex}].url`] = "Image is required";
				if (!img?.alt) errors[`sections[${index}].images[${imgIndex}].alt`] = "Image alt is required";
			});
		});

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const createSlugfromTitle = (title: string) => {
		return title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "")
			.slice(0, 50);
	};

	const handleSubmit = async () => {
		if (!validateForm()) return;
		setProjectModal(prev => ({ ...prev, loading: true }));
		try {
			const submitData: CombinedProject = {
				...formData,
				title: formData.title?.trim() || "",
				slug: createSlugfromTitle(formData.title?.trim() || ""),
				clientName: formData.clientName?.trim() || "",
				description: formData.description?.trim() || "",
				heroImage: formData.heroImage,
				heroImageAlt: formData.heroImageAlt || "",
				thumbnail: formData.thumbnail,
				thumbnailAlt: formData.thumbnailAlt || "",
				typeId: formData.typeId,
				sections: formData.sections?.map(section => ({
					...section,
					description: section.description?.trim() || "",
					backgroundColor: section.backgroundColor || "",
					images: section.images
						.filter((img: any) => img.url)
						.map((img: any) => ({
							url: img.url,
							alt: img.alt || "",
						})),
					type: section.type || "",
				})),
				scopes: formData.scopes || [],
				isCompleted: formData.isCompleted,
			};

			if (projectModal.project?.id) {
				await updateProject(projectModal.project.id, {
					...submitData,
					id: projectModal.project.id,
				});
				handleSuccessfulOperation("updated");
			} else {
				await addProject(submitData);
				handleSuccessfulOperation("added");
			}

			handleCloseModal();
		} catch (error: any) {
			console.error("Submission error:", error);
			showNotification(`Failed to submit project: ${error.message || "Unknown error"}`, "error");
			setFormErrors(prev => ({
				...prev,
				submit: error.message || "Failed to submit project",
			}));
		} finally {
			setProjectModal(prev => ({ ...prev, loading: false }));
		}
	};
	// For the delete dialog
	const handleDeleteDialogClose = () => {
		setProjectToDelete(null);
		setDeleteDialogOpen(false);
	};
	const [projectToDelete, setProjectToDelete] = useState<CombinedProject | null>(null);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

	const handleDeleteClick = (project: CombinedProject) => {
		setProjectToDelete(project);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!projectToDelete) return;

		setDeleteDialogOpen(false);
		try {
			await deleteProject(projectToDelete.id);
			handleSuccessfulOperation("deleted");
		} catch (error: any) {
			console.error(error);
			showNotification(`Failed to delete project: ${error.message || "Unknown error"}`, "error");
		}
	};

	const onDragEnd = async (result: any) => {
		if (!dragEnabled) return;

		// Dropped outside the list
		if (!result.destination) {
			return;
		}

		const reorderedItems = reorderList(orderedProjects, result.source.index, result.destination.index);

		setOrderedProjects(reorderedItems);

		// Save the new order to the backend
		try {
			if (reorderProjects) {
				await reorderProjects(reorderedItems);
				// Show success notification
				showNotification("Projects reordered successfully");
			}
		} catch (error: any) {
			console.error("Failed to save new order:", error);
			const errorMsg = error.message || "Unknown error";
			// Show error notification
			showNotification(`Failed to save new order: ${errorMsg}`, "error");

			// Reset to the original order if the API call fails
			setOrderedProjects([...projects]);
		}
	};

	// Helper function to reorder list items
	const reorderList = (list: CombinedProject[], startIndex: number, endIndex: number) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
		return result;
	};

	const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbar(prev => ({ ...prev, open: false }));
	};
	const showNotification = (message: string, severity: AlertColor = "success") => {
		setSnackbar({
			open: true,
			message,
			severity,
		});
	};

	const handleSuccessfulOperation = (operation: string) => {
		showNotification(`Project ${operation} successfully`);
	};

	useEffect(() => {
		if (search === "new") {
			handleOpenModal();
		}
	}, [search]);

	useEffect(() => {
		if (projects) {
			const projectIds = projects.map(p => p.id).join(",");
			const orderedIds = orderedProjects.map(p => p.id).join(",");

			if (projectIds !== orderedIds || projects.length !== orderedProjects.length) {
				setOrderedProjects([...projects]);
			}

			// Check if sortOrder exists on projects
			const hasSortOrder = projects.length > 0 && "sortOrder" in projects[0];
			if (!hasSortOrder && projects.length > 0) {
				setDragEnabled(false);
				showNotification(
					"Drag and drop ordering is not available. The 'sortOrder' column needs to be added to the database.",
					"warning"
				);
			} else {
				setDragEnabled(true);
			}
		}
	}, [projects, orderedProjects]);

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
				<Typography variant="h4">Projects</Typography>
				<Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>
					Add Project
				</Button>
			</Box>

			{!dragEnabled && (
				<Alert severity="warning" sx={{ mb: 2 }}>
					Drag and drop ordering is not available. The database needs to be updated with the 'sortOrder' column.
				</Alert>
			)}

			<TableContainer component={Paper} elevation={2}>
				<DragDropContextClient onDragEnd={onDragEnd}>
					<Table>
						<TableHead>
							<TableRow>
								{dragEnabled && <TableCell width="60px">Order</TableCell>}
								<TableCell>Project</TableCell>
								<TableCell>Type</TableCell>
								<TableCell>Scopes</TableCell>
								<TableCell>Year</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Last Updated</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<Droppable
							droppableId="projects-table"
							isDropDisabled={!dragEnabled}
							isCombineEnabled={false}
							ignoreContainerClipping={false}
							direction="vertical">
							{provided => (
								<TableBody ref={provided.innerRef} {...provided.droppableProps}>
									{orderedProjects.map((project, index) => (
										<Draggable
											key={project.id}
											draggableId={project?.id || String(index)}
											index={index}
											isDragDisabled={!dragEnabled}>
											{(provided, snapshot) => (
												<TableRow
													ref={provided.innerRef}
													{...provided.draggableProps}
													sx={{
														"&:hover": { backgroundColor: "action.hover" },
														backgroundColor: snapshot.isDragging ? "action.selected" : "inherit",
													}}>
													{dragEnabled && (
														<TableCell {...provided.dragHandleProps}>
															<DragIndicator color="action" />
														</TableCell>
													)}
													{/* Rest of your existing row cells */}
													<TableCell>
														<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
															<Avatar variant="rounded" sx={{ width: 56, height: 56, position: "relative" }}>
																{project.thumbnail && <Image
																	src={project.thumbnail}
																	alt={project.thumbnailAlt || ""}
																	fill
																	style={{ objectFit: "cover" }}
																/>}
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
																// @ts-expect-error should add scope to projectsOnScopes
																<Chip key={scope.scopeId} label={scope.scope.name} size="small" variant="outlined" />
															))}
														</Box>
													</TableCell>
													<TableCell>{project.year}</TableCell>
													<TableCell>
														<Chip
															label={project.isCompleted ? "Completed" : "In Progress"}
															color={project.isCompleted ? "primary" : "success"}
															className="text-xs"
														/>
													</TableCell>
													<TableCell>
														{project.updatedAt && format(new Date(project.updatedAt), "MMM d, yyyy")}
													</TableCell>
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
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</TableBody>
							)}
						</Droppable>
					</Table>
				</DragDropContextClient>
			</TableContainer>

			{/* Add/Edit Modal */}
			<Dialog open={projectModal.open} onClose={handleCloseModal} maxWidth="md" fullWidth>
				<DialogTitle>{projectModal.project ? "Edit Project" : "Add Project"}</DialogTitle>
				<DialogContent>
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
			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
				<Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
}
