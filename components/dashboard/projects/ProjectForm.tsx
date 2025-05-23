"use client";
import {
	Box,
	Chip,
	FormControl,
	FormHelperText,
	Grid2 as Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import { Dispatch, SetStateAction } from "react";
import ImageUpload from "../../../components/ui/image-upload";
import useScopes from "../../../hooks/useScopes";
import useTypes from "../../../hooks/useTypes";
import { ProjectSectionForm } from "./ProjectSectionForm";
import { Project, ProjectsOnScopes } from "@prisma/client";

interface ProjectFormProps {
	project: Partial<Project>;
	setFormData: Dispatch<SetStateAction<any>>;
	formErrors: Record<string, string>;
}

export function ProjectForm({ project, setFormData, formErrors }: ProjectFormProps) {
	const { data: scopes } = useScopes();
	const { data: types } = useTypes();

	const handleImageUpload = async (
		data: { file: File | null; alt: string },
		type: "file" | "alt",
		fieldName: "thumbnail" | "heroImage"
	) => {
		if (type === "alt") {
			setFormData((prev: Partial<Project>) => ({
				...prev,
				[`${fieldName}Alt`]: data.alt,
			}));
			return;
		}

		if (!data.file) {
			setFormData((prev: Partial<Project>) => ({
				...prev,
				[fieldName]: "",
			}));
			return;
		}

		const formData = new FormData();
		formData.append("file", data.file);
		formData.append("fieldName", fieldName || "");
		formData.append("projectName", project.title || "");

		try {
			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Failed to upload image");
			}

			const responseData = await response.json();
			setFormData((prev: Partial<Project>) => ({
				...prev,
				[fieldName]: responseData.url,
			}));
		} catch (error) {
			console.error("Upload error:", error);
		}
	};

	const handleDeleteImage = async (url: string, fieldName: "thumbnail" | "heroImage") => {
		const formData = new FormData();
		formData.append("url", url);

		try {
			const response = await fetch("/api/upload", {
				method: "DELETE",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Failed to delete image");
			}

			setFormData((prev: Partial<Project>) => ({
				...prev,
				[fieldName]: "",
			}));
		} catch (error) {
			console.error("Delete error:", error);
		}
	};

	return (
		<Grid container spacing={3} pt={3}>
			{/* Basic Information */}
			<Grid size={{ xs: 12, sm: 6 }}>
				<TextField
					fullWidth
					label="Project Title"
					value={project.title}
					onChange={e => {
						setFormData((prev: Project) => ({ ...prev, title: e.target.value }));
						// set slug automaticly
						if (!project.slug) {
							setFormData((prev: Project) => ({ ...prev, slug: e.target.value.toLowerCase().replace(/ /g, "-") }));
						}
					}}
					required
					error={!!formErrors.title}
					helperText={formErrors.title}
				/>
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }}>
				<TextField
					fullWidth
					label="Client Name"
					value={project.clientName}
					onChange={e => setFormData((prev: Project) => ({ ...prev, clientName: e.target.value }))}
					required
					error={!!formErrors.clientName}
					helperText={formErrors.clientName}
				/>
			</Grid>

			{/* Project Type and Scopes */}
			<Grid size={{ xs: 12, sm: 6 }}>
				<FormControl fullWidth error={!!formErrors.typeId}>
					<InputLabel>Project Type</InputLabel>
					<Select
						value={project.typeId}
						onChange={e =>
							setFormData((prev: Project) => ({
								...prev,
								typeId: e.target.value,
								type: types.find(t => t.id === e.target.value),
							}))
						}
						input={<OutlinedInput label="Project Type" />}
						required
						renderValue={selected => {
							const type = types?.find(t => t.id === selected);
							return type ? type.name : "";
						}}>
						{types?.map(type => (
							<MenuItem key={type.id} value={type.id}>
								{type.name}
							</MenuItem>
						))}
					</Select>
					{formErrors.typeId && <FormHelperText>{formErrors.typeId}</FormHelperText>}
				</FormControl>
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }}>
				<FormControl fullWidth error={!!formErrors.scopes}>
					<InputLabel>Project Scopes</InputLabel>
					<Select
						multiple
						// @ts-expect-error scopes is an array of strings
						value={project.scopes || []}
						onChange={e => setFormData((prev: Project) => ({ ...prev, scopes: e.target.value }))}
						input={<OutlinedInput label="Project Scopes" />}
						renderValue={selected => (
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
								{selected.map((id: string) => {
									const scope = scopes?.find(s => s.id === id);
									return scope ? <Chip key={scope.id} label={scope.name} /> : null;
								})}
							</Box>
						)}>
						{scopes?.map(scope => (
							<MenuItem key={scope.id} value={scope.id}>
								{scope.name}
							</MenuItem>
						))}
					</Select>
					{formErrors.scopes && <FormHelperText>{formErrors.scopes}</FormHelperText>}
				</FormControl>
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }}>
				<TextField
					fullWidth
					label="Area"
					value={project.area}
					onChange={e => setFormData((prev: Project) => ({ ...prev, area: e.target.value }))}
				/>
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }}>
				<TextField
					fullWidth
					label="Location"
					value={project.location}
					onChange={e => setFormData((prev: Project) => ({ ...prev, location: e.target.value }))}
				/>
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }}>
				<TextField
					fullWidth
					label="Year"
					value={project.year}
					onChange={e => setFormData((prev: Project) => ({ ...prev, year: e.target.value }))}
				/>
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }}>
				<FormControl component="fieldset">
					<FormGroup aria-label="position" row>
						<FormControlLabel
							value={project.isCompleted}
							control={<Switch color="primary" checked={project.isCompleted} />}
							label={project.isCompleted ? "Completed" : "In Progress"}
							onChange={() => setFormData((prev: Project) => ({ ...prev, isCompleted: !project.isCompleted }))}
						/>
					</FormGroup>
				</FormControl>
			</Grid>

			{/* Description */}
			<Grid size={{ xs: 12 }}>
				<TextField
					fullWidth
					multiline
					rows={4}
					label="Description"
					value={project.description}
					onChange={e => setFormData((prev: Project) => ({ ...prev, description: e.target.value }))}
					required
					error={!!formErrors.description}
					helperText={formErrors.description}
				/>
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }} className={`${project.title ? "" : "hidden"}`}>
				<ImageUpload
					label="Thumbnail Image"
					onChange={(data, type) => handleImageUpload(data, type, "thumbnail")}
					deleteImage={() => project.thumbnail && handleDeleteImage(project.thumbnail, "thumbnail")}
					value={{
						file: project.thumbnail,
						alt: project.thumbnailAlt || "",
					}}
					preview={project.thumbnail}
					maxSize={5}
					size="600 x 400 px landscape or 400 x 600 portrait"
					ratio="3:2 landscape or 2:3 portrait"
				/>
				{formErrors.thumbnail && <FormHelperText error>{formErrors.thumbnail}</FormHelperText>}
				{formErrors.thumbnailAlt && <FormHelperText error>{formErrors.thumbnailAlt}</FormHelperText>}
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }} className={`${project.title ? "" : "hidden"}`}>
				<ImageUpload
					label="Hero Image"
					onChange={(data, type) => handleImageUpload(data, type, "heroImage")}
					deleteImage={() => project.heroImage && handleDeleteImage(project.heroImage, "heroImage")}
					value={{
						file: project.heroImage,
						alt: project.heroImageAlt || "",
					}}
					preview={project.heroImage}
					maxSize={5}
					size="1500 x 500"
					ratio="3:1"
				/>
				{formErrors.heroImage && <FormHelperText error>{formErrors.heroImage}</FormHelperText>}
				{formErrors.heroImageAlt && <FormHelperText error>{formErrors.heroImageAlt}</FormHelperText>}
			</Grid>

			<Grid size={{ xs: 12 }} className={`${project.title ? "" : "hidden"}`}>
				<ProjectSectionForm
					projectName={project.title || ""}
					formErrors={formErrors}
					// @ts-expect-error sections is not defined in Project
					sections={project.sections || []}
					setSections={newSections =>
						setFormData((prev: Project) => ({
							...prev,
							sections: newSections,
						}))
					}
				/>
			</Grid>
		</Grid>
	);
}
