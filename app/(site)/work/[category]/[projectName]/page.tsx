// app/work/[work]/page.tsx
import ContactForm from "@/components/contact/ContactForm";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectSection from "@/components/projects/ProjectDetails/ProjectSections";
import HeroImage from "@/components/projects/HeroImage";
import ProjectDetails from "@/components/projects/ProjectDetails/ProjectDetails";
import {  getProject } from "@/lib/projects";
import type { ProjectSection as ProjectSectionProps } from "@/types/dashboard";
import { formatString } from "@/utils/StringUtils";

type Params = Promise<{ category: string, projectName: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> { 
	const {category, projectName} = await params;
	const formatedProjectName = formatString(projectName)
	return {
		title: `Zero31 Project ${formatedProjectName}`,
		description: `${formatedProjectName} is one of our diverse portfolio from ${category} category, showcasing our expertise and commitment to excellence in every endeavor.`
	}
}

export default async function ProjectPage({ params }: { params: Params }) {
	const { projectName } = await params;
	const project = await getProject(projectName);

	if (!project) {
		return notFound();
	}

	return (
		<main className="flex-grow pt-[72px]">
			<HeroImage image={project.heroImage} alt={project.heroImageAlt} />
			<ProjectDetails project={project} />
			<ProjectSection sections={project.sections as ProjectSectionProps[]} />
			<ContactForm />
		</main>
	);
}
