export interface ProjectSection {
	description?: string;
	images?: string[];
	backgroundColor?: string;
}

type ProjectScope = "Architecture" | "Interior Design" | "Landscape" | "Ff&e";
type ProjectType = "Hospitality" | "Residential" | "Commercial" | "Workplace";

export interface Project {
	id: string;
	slug: string;
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
