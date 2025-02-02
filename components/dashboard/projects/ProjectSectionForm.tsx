// components/ProjectSectionForm.tsx
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
	Box,
	Button,
	Card,
	FormControl,
	Grid2 as Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import ImageUpload from "../../../components/ui/image-upload";
import { ProjectSection } from "../../../types/dashboard";

interface ProjectSectionFormProps {
	sections: ProjectSection[];
	setSections: (sections: ProjectSection[]) => void;
	formErrors: Record<string, string>;
}

export function ProjectSectionForm({ sections, setSections, formErrors }: ProjectSectionFormProps) {
	const [error, setError] = useState<string | null>(null);

	const handleImageUpload = async (
		data: { file: File | null; alt: string },
		type: "file" | "alt",
		sectionIndex: number,
		imageIndex: number
	) => {
		if (type === "alt") {
			const newSections = [...sections];
			newSections[sectionIndex].images[imageIndex] = {
				...newSections[sectionIndex].images[imageIndex],
				alt: data.alt,
			};
			setSections(newSections);
			return;
		}

		try {
			setError(null);

			if (!data.file) {
				const newSections = [...sections];
				// @ts-expect-error - alt is not optional
				newSections[sectionIndex].images[imageIndex] = {
					url: "",
					alt: data.alt,
					sectionId: newSections[sectionIndex].id,
					section: newSections[sectionIndex],
				};
				setSections(newSections);
				return;
			}

			const formData = new FormData();
			formData.append("file", data.file);
			formData.append("projectName", `section-${sectionIndex + 1}`);

			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Failed to upload image");
			}

			const responseData = await response.json();
			const newSections = [...sections];
			newSections[sectionIndex].images[imageIndex] = {
				url: responseData.url,
				alt: data.alt,
				sectionId: newSections[sectionIndex].id,
				section: newSections[sectionIndex],
				id: responseData.id,
				createdAt: responseData.createdAt,
				updatedAt: responseData.updatedAt,
			};
			setSections(newSections);
		} catch (error: any) {
			setError(error.message || "Failed to upload image");
			console.error("Image upload error:", error);
		}
	};

	const addSection = () => {
		// @ts-expect-error - id is not optional
		setSections([...sections, { images: [], backgroundColor: "bg-white", description: "" }]);
	};

	const removeSection = (index: number) => {
		setSections(sections.filter((_, i) => i !== index));
	};

	const moveSection = (index: number, direction: "up" | "down") => {
		const newSections = [...sections];
		const newIndex = direction === "up" ? index - 1 : index + 1;
		[newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
		setSections(newSections);
	};

	const updateSection = (index: number, updates: Partial<ProjectSection>) => {
		const newSections = [...sections];
		newSections[index] = { ...newSections[index], ...updates };
		setSections(newSections);
	};

	const addImage = (sectionIndex: number) => {
		const newSections = [...sections];
		// @ts-expect-error - id is not optional
		newSections[sectionIndex].images.push({ url: "", alt: "" });
		setSections(newSections);
	};

	const removeImage = (sectionIndex: number, imageIndex: number) => {
		const newSections = [...sections];
		newSections[sectionIndex].images.splice(imageIndex, 1);
		setSections(newSections);
	};

	return (
		<Box sx={{ mt: 4 }}>
			<Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
				<Typography variant="h6">Project Sections</Typography>
				<Button variant="outlined" startIcon={<AddIcon />} onClick={addSection}>
					Add Section
				</Button>
			</Stack>

			{error && (
				<Typography color="error" sx={{ mb: 2 }}>
					{error}
				</Typography>
			)}

			{sections.map((section, sectionIndex) => {
				return (
					<Card key={sectionIndex} sx={{ p: 3, mb: 3, position: "relative" }}>
						<IconButton
							size="small"
							onClick={() => removeSection(sectionIndex)}
							color="error"
							sx={{
								position: "absolute",
								right: -8,
								top: -8,
								zIndex: 1,
								bgcolor: "background.paper",
								boxShadow: 1,
								"&:hover": { bgcolor: "error.light", color: "white" },
							}}>
							<DeleteIcon fontSize="small" />
						</IconButton>

						<Box sx={{ position: "absolute", right: 16, top: 16, display: "flex", gap: 1 }}>
							<IconButton size="small" onClick={() => moveSection(sectionIndex, "up")} disabled={sectionIndex === 0}>
								<KeyboardArrowUpIcon />
							</IconButton>
							<IconButton
								size="small"
								onClick={() => moveSection(sectionIndex, "down")}
								disabled={sectionIndex === sections.length - 1}>
								<KeyboardArrowDownIcon />
							</IconButton>
						</Box>

						<Grid container spacing={3}>
							<Grid size={{ xs: 12 }}>
								<TextField
									fullWidth
									multiline
									rows={4}
									label="Description"
									value={section.description || ""}
									onChange={e => updateSection(sectionIndex, { description: e.target.value })}
									error={!!formErrors[`sections[${sectionIndex}].description`]}
									helperText={formErrors[`sections[${sectionIndex}].description`] || ""}
								/>
							</Grid>

							<Grid size={{ xs: 12 }}>
								<FormControl fullWidth>
									<InputLabel>Background Color</InputLabel>
									<Select
										value={section.backgroundColor || "bg-white"}
										label="Background Color"
										onChange={e => updateSection(sectionIndex, { backgroundColor: e.target.value })}>
										<MenuItem value="bg-white">White</MenuItem>
										<MenuItem value="bg-novo-blue">Novo Blue</MenuItem>
										<MenuItem value="bg-gray-50">Light Gray</MenuItem>
										<MenuItem value="bg-gray-100">Gray</MenuItem>
										<MenuItem value="bg-off-white">Off White</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid size={{ xs: 12 }}>
								<Typography variant="subtitle1" gutterBottom>
									Images (Max 2 per section)
								</Typography>
								<Grid container spacing={2}>
									{section.images.map((image, imageIndex) => (
										<Grid size={{ xs: 12, sm: 6 }} key={imageIndex}>
											<Box sx={{ position: "relative", mb: 2 }}>
												<IconButton
													size="small"
													onClick={() => removeImage(sectionIndex, imageIndex)}
													color="error"
													sx={{
														position: "absolute",
														right: -8,
														top: -8,
														zIndex: 1,
														bgcolor: "background.paper",
														boxShadow: 1,
														"&:hover": { bgcolor: "error.light", color: "white" },
													}}>
													<DeleteIcon fontSize="small" />
												</IconButton>

												<ImageUpload
													label={`Section ${sectionIndex + 1} Image ${imageIndex + 1}`}
													onChange={(data, type) => handleImageUpload(data, type, sectionIndex, imageIndex)}
													value={{
														file: image.url,
														alt: image.alt,
													}}
													preview={image.url}
													maxSize={5}
												/>
												{formErrors[`sections[${sectionIndex}].images[${imageIndex}].url`] && (
													<Typography color="error" sx={{ mb: 2 }}>
														{formErrors[`sections[${sectionIndex}].images[${imageIndex}].url`]}
													</Typography>
												)}
												{formErrors[`sections[${sectionIndex}].images[${imageIndex}].alt`] && (
													<Typography color="error" sx={{ mb: 2 }}>
														{formErrors[`sections[${sectionIndex}].images[${imageIndex}].alt`]}
													</Typography>
												)}
												{formErrors[`sections[${sectionIndex}].images`] && (
													<Typography color="error" sx={{ mb: 2 }}>
														"Please upload an image"
													</Typography>
												)}
											</Box>
										</Grid>
									))}
									{section.images.length < 2 && (
										<Grid size={{ xs: 12, sm: 6 }}>
											<Button
												fullWidth
												variant="outlined"
												startIcon={<AddIcon />}
												onClick={() => addImage(sectionIndex)}
												sx={{ height: "100%", minHeight: 200 }}>
												Add Image
											</Button>
										</Grid>
									)}
								</Grid>
							</Grid>
						</Grid>
					</Card>
				);
			})}
		</Box>
	);
}
