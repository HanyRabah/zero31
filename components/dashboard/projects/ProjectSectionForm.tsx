// components/ProjectSectionForm.tsx
import ImageUpload from "@/components/ui/image-upload";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
	AccordionActions,
	AccordionProps,
	AccordionSummaryProps,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	Grid2 as Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	styled,
	TextField,
	Typography,
} from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, { accordionSummaryClasses } from "@mui/material/AccordionSummary";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import { ProjectSection } from "../../../types/dashboard";

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		"&:not(:last-child)": {
			borderBottom: 0,
		},
		"&::before": {
			display: "none",
		},
	})
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: "rgba(0, 0, 0, .03)",
	flexDirection: "row-reverse",
	[`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
		transform: "rotate(90deg)",
	},
	[`& .${accordionSummaryClasses.content}`]: {
		marginLeft: theme.spacing(1),
	},
	...theme.applyStyles("dark", {
		backgroundColor: "rgba(255, 255, 255, .05)",
	}),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface ProjectSectionFormProps {
	projectName: string;
	sections: ProjectSection[];
	setSections: (sections: ProjectSection[]) => void;
	formErrors: Record<string, string>;
}
type SectionType = "Description" | "Two Images" | "One Image" | undefined;

export function ProjectSectionForm({ projectName, sections, setSections, formErrors }: ProjectSectionFormProps) {
	const [error, setError] = useState<string | null>(null);
	const [expandedSection, setExpandedSection] = useState<number | false>(0);
	const [sectionType, setSectionType] = useState<SectionType>();
	const [selectSectionOpened, setSelectSectionOpened] = useState(false);

	const handleAccordionChange = (sectionIndex: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpandedSection(isExpanded ? sectionIndex : false);
	};

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
			formData.append("projectName", projectName);
			formData.append("sectionName", `section-${sectionIndex + 1}`);
			formData.append("sectionImageIndex", `image-${imageIndex + 1}`);

			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
				cache: "no-store",
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
			};
			setSections(newSections);
		} catch (error: any) {
			setError(error.message || "Failed to upload image");
			console.error("Image upload error:", error);
		}
	};

	const handleImageDelete = async (sectionIndex: number, imageIndex: number) => {
		const image = sections[sectionIndex].images[imageIndex];
		if (!image.url) {
			const newSections = [...sections];
			newSections[sectionIndex].images.splice(imageIndex, 1);
			setSections(newSections);
			return;
		}

		try {
			setError(null);

			const formData = new FormData();
			formData.append("url", image.url);

			const response = await fetch("/api/upload", {
				method: "DELETE",
				body: formData,
				cache: "no-store",
			});

			if (!response.ok) {
				throw new Error("Failed to delete image");
			}

			const newSections = [...sections];
			//newSections[sectionIndex].images.splice(imageIndex, 1);
			setSections(newSections);
		} catch (error: any) {
			setError(error.message || "Failed to delete image");
			console.error("Image delete error:", error);
		}
	};

	const addSection = () => {
		setSelectSectionOpened(true);
	};

	const handleSetSectionType = (type: SectionType) => {
		setSectionType(type);
		switch (type) {
			case "Description":
				setSections([
					...sections,
					{ images: [{ url: "", alt: "image" }], backgroundColor: "bg-white", description: "", type },
				]);
				break;
			case "Two Images":
				setSections([
					...sections,
					{
						images: [
							{ url: "", alt: "image 1" },
							{ url: "", alt: "image 2" },
						],
						backgroundColor: "bg-white",
						description: "",
						type,
					},
				]);
				break;
			case "One Image":
				setSections([
					...sections,
					{ images: [{ url: "", alt: "image" }], backgroundColor: "bg-white", description: "", type },
				]);
				break;
		}
		setSelectSectionOpened(false);
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

			{sections.map((section, sectionIndex) => (
				<Accordion
					key={sectionIndex}
					expanded={expandedSection === sectionIndex}
					onChange={handleAccordionChange(sectionIndex)}
					className="rounded-md shadow-md">
					<AccordionSummary
						expandIcon={<KeyboardArrowDownIcon />}
						sx={{
							"& .MuiAccordionSummary-content": {
								alignItems: "center",
								justifyContent: "space-between",
							},
						}}>
						<Typography>
							Section {sectionIndex + 1} - {section.type}
						</Typography>
					</AccordionSummary>

					<AccordionDetails>
						<Grid container spacing={3}>
							{section.type === "Description" && (
								<Grid size={{ xs: 12 }}>
									<TextField
										fullWidth
										multiline
										rows={4}
										label="Description"
										value={section.description || ""}
										onChange={e => updateSection(sectionIndex, { description: e.target.value })}
									/>
								</Grid>
							)}

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
								<Grid container spacing={2}>
									{section.images.map((image, imageIndex) => (
										<Grid size={{ xs: 12, sm: 6 }} key={imageIndex}>
											<Box sx={{ position: "relative", mb: 2 }}>
												<ImageUpload
													label={``}
													onChange={(data, type) => handleImageUpload(data, type, sectionIndex, imageIndex)}
													deleteImage={() => handleImageDelete(sectionIndex, imageIndex)}
													value={{
														file: image.url,
														alt: image.alt,
													}}
													preview={image.url}
													maxSize={5}
													size="640 x 480"
													ratio="3:2"
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

									{section.type === "Two Images" && section.images.length < 2 && (
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
					</AccordionDetails>
					<AccordionActions>
						<Box sx={{ display: "flex", gap: 1, ml: 2 }}>
							<Button
								size="small"
								onClick={e => {
									e.stopPropagation();
									moveSection(sectionIndex, "up");
								}}
								disabled={sectionIndex === 0}>
								<KeyboardArrowUpIcon />
								move Section Up
							</Button>
							<Button
								size="small"
								onClick={e => {
									e.stopPropagation();
									moveSection(sectionIndex, "down");
								}}
								disabled={sectionIndex === sections.length - 1}>
								<KeyboardArrowDownIcon />
								move Section Down
							</Button>
							<Button
								size="small"
								color="error"
								onClick={async e => {
									e.stopPropagation();
									removeSection(sectionIndex);
								}}
								sx={{
									flex: 1,
									gap: 1,
									padding: "6px 12px",
									"&:hover": { bgcolor: "error.light", color: "white" },
								}}>
								<DeleteIcon fontSize="small" />
								Delete Section
							</Button>
						</Box>
					</AccordionActions>
				</Accordion>
			))}

			<Dialog open={selectSectionOpened} onClose={() => setSelectSectionOpened(false)} fullWidth>
				<DialogTitle>Select Section Type</DialogTitle>
				<DialogContent>
					<Box sx={{ display: "flex", gap: 4 }}>
						<Box
							className="hover:bg-orange-100 rounded-md p-8 cursor-pointer w-1/3"
							onClick={() => {
								handleSetSectionType("Description");
								setSelectSectionOpened(false);
							}}>
							<Image alt="Description" src="/icons/imageWithDescription.png" width="100" height="100" />
							<Typography variant="caption">Description With Image</Typography>
						</Box>
						<Box
							className="hover:bg-orange-100 rounded-md p-8 cursor-pointer w-1/3"
							onClick={() => {
								handleSetSectionType("Two Images");
								setSelectSectionOpened(false);
							}}>
							<Image alt="Two Images" src="/icons/TwoImages.png" width="100" height="100" />
							<Typography variant="caption">Two Images</Typography>
						</Box>
						<Box
							className="hover:bg-orange-100 rounded-md p-8 cursor-pointer w-1/3"
							onClick={() => {
								handleSetSectionType("One Image");
								setSelectSectionOpened(false);
							}}>
							<Image alt="One Image" src="/icons/OneImage.png" width="100" height="100" />
							<Typography variant="caption">One Image</Typography>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setSelectSectionOpened(false)}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
