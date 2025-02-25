// types/project.ts

// Enums
export enum Role {
	ADMIN = "ADMIN",
	EDITOR = "EDITOR",
}

// Base interfaces
export interface BaseModel {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}

// User interface
export interface User extends BaseModel {
	email: string;
	name?: string;
	password: string;
	role: Role;
}

// Project Type interface
export interface ProjectType extends BaseModel {
	name: string;
	projects?: Project[];
}

// Project Scope interface
export interface ProjectScope extends BaseModel {
	name: string;
	projects?: ProjectsOnScopes[];
}

// Image interface
export interface Image extends BaseModel {
	url: string;
	alt?: string;
	sectionId: string;
	section: ProjectSection;
}

// Project Section interface
export interface ProjectSection extends BaseModel {
	description?: string;
	type: string;
	backgroundColor?: string;
	projectId: string;
	project: Project;
	images: Image[];
}

// Junction table interface
export interface ProjectsOnScopes {
	project: Project;
	projectId: string;
	scope: ProjectScope;
	scopeId: string;
	assignedAt: Date;
}

// Main Project interface
export interface Project extends BaseModel {
	title?: string;
	slug: string;
	clientName: string;
	heroImage: string;
	heroImageAlt: string;
	thumbnail: string;
	thumbnailAlt: string;
	description: string;
	area?: string;
	location?: string;
	year?: string;
	isCompleted?: boolean;
	// Relations
	type?: ProjectType;
	typeId?: string;
	scopes: ProjectsOnScopes[];
	sections: ProjectSection[];
}
