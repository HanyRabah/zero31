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
export interface ProjectScope {
	id?: string;
	name: string;
	projects?: ProjectsOnScopes[];
}

// Image interface
export interface Image {
	id?: string;
	url: string;
	alt?: string;
	sectionId?: string;
	section?: ProjectSection;
}

// Project Section interface
export interface ProjectSection {
	id?: string;
	description?: string;
	backgroundColor?: string;
	type?: string;
	projectId?: string;
	project?: Project;
	images: Image[];
}

// Junction table interface
export interface ProjectsOnScopes {
	project?: Project;
	projectId: string;
	scope: ProjectScope;
	scopeId: string;
	assignedAt: Date;
}

// Main Project interface
export interface Project {
	id?: string;
	slug: string;
	title: string;
	clientName: string;
	description: string;
	heroImage: string;
	heroImageAlt: string;
	thumbnail: string;
	thumbnailAlt: string;
	typeId: string;
	year?: string;
	area?: string;
	location?: string;
	isCompleted: boolean;
	sortOrder?: number;
	createdAt?: string;
	updatedAt?: string;
	type?: ProjectType;
	images?: Image[];
	scopes: ProjectsOnScopes[];
	sections: ProjectSection[];
}
