export interface ProjectSection {
	description?: string;
	images?: string[]; // min 1 image with description, max 2 images without description
	imagesAlt?: string[];
	backgroundColor?: string;
}

type ProjectScope = "Architecture" | "Interior Design" | "Landscape" | "Ff&e";
type ProjectType = "Hospitality" | "Residential" | "Commercial" | "Workplace";

export interface Project {
	id: string;
	title?: string;
	clientName: string;
	heroImage: string;
	heroImageAlt: string;
	thumbnail: string;
	thumbnailAlt: string;
	description: string;
	type?: ProjectType;
	scope?: ProjectScope[];
	area?: string;
	location?: string;
	year?: string;
	sections: ProjectSection[];
}
