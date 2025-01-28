"use client";
import ImageUpload from "@/components/ui/image-upload";
import useScopes from "@/hooks/useScopes";
import useTypes from "@/hooks/useTypes";
import { Project } from "@/types/dashboard";
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
import { Image } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { ProjectSectionForm } from "./ProjectSectionForm";

interface ProjectFormProps {
	project: Project;
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
			setFormData((prev: Project) => ({
				...prev,
				[`${fieldName}Alt`]: data.alt,
			}));
			return;
		}

		if (!data.file) {
			setFormData((prev: Project) => ({
				...prev,
				[fieldName]: "",
			}));
			return;
		}

		const formData = new FormData();
		formData.append("file", data.file);
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
			setFormData((prev: Project) => ({
				...prev,
				[fieldName]: responseData.url,
			}));
		} catch (error) {
			console.error("Upload error:", error);
		}
	};
	const handleSectionChange = (sections: any[]) => {
		setFormData((prev: Project) => ({
			...prev,
			sections: sections.map(section => ({
				description: section.description || "",
				backgroundColor: section.backgroundColor || "",
				images: section.images.map((img: Image) => ({
					url: img.url,
					alt: img.alt || "",
				})),
			})),
		}));
	};

	return (
		<Grid container spacing={3} pt={3}>
			{/* Basic Information */}
			<Grid size={{ xs: 12, sm: 6 }}>
				<TextField
					fullWidth
					label="Title"
					value={project.title}
					onChange={e => setFormData((prev: Project) => ({ ...prev, title: e.target.value }))}
					required
					error={!!formErrors.title}
					helperText={formErrors.title}
				/>
			</Grid>
			<Grid size={{ xs: 12, sm: 6 }}>
				<TextField
					fullWidth
					label="Slug"
					value={project.slug}
					onChange={e => setFormData((prev: Project) => ({ ...prev, slug: e.target.value }))}
					required
					error={!!formErrors.slug}
					helperText={formErrors.slug}
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
						onChange={e => setFormData((prev: Project) => ({ ...prev, typeId: e.target.value }))}
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
						value={project.scopes || []}
						onChange={e => setFormData((prev: Project) => ({ ...prev, scopes: e.target.value }))}
						input={<OutlinedInput label="Project Scopes" />}
						renderValue={selected => (
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
								{selected.map(id => {
									// @ts-expect-error - scopes is an array of strings
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

			<Grid size={{ xs: 12, sm: 6 }}>
				<ImageUpload
					label="Thumbnail Image"
					onChange={(data, type) => handleImageUpload(data, type, "thumbnail")}
					value={{
						file: project.thumbnail,
						alt: project.thumbnailAlt || "",
					}}
					preview={project.thumbnail}
					maxSize={5}
				/>
			</Grid>

			<Grid size={{ xs: 12, sm: 6 }}>
				<ImageUpload
					label="Hero Image"
					onChange={(data, type) => handleImageUpload(data, type, "heroImage")}
					value={{
						file: project.heroImage,
						alt: project.heroImageAlt || "",
					}}
					preview={project.heroImage}
					maxSize={5}
				/>
			</Grid>

			{/* Additional Information */}
			<Grid size={{ xs: 12, sm: 4 }}>
				<TextField
					fullWidth
					label="Area"
					value={project.area}
					onChange={e => setFormData((prev: Project) => ({ ...prev, area: e.target.value }))}
				/>
			</Grid>
			<Grid size={{ xs: 12, sm: 4 }}>
				<TextField
					fullWidth
					label="Location"
					value={project.location}
					onChange={e => setFormData((prev: Project) => ({ ...prev, location: e.target.value }))}
				/>
			</Grid>
			<Grid size={{ xs: 12, sm: 4 }}>
				<TextField
					fullWidth
					label="Year"
					value={project.year}
					onChange={e => setFormData((prev: Project) => ({ ...prev, year: e.target.value }))}
				/>
			</Grid>

			<Grid size={{ xs: 12 }}>
				<ProjectSectionForm
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
