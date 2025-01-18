import ProjectSection from "@/components/projects";
import HeroImage from "@/components/projects/HeroImage";
import ProjectDetails from "@/components/projects/ProjectDetails";
import { projects } from "@/config/projects/projects";
import { Metadata } from "next";

type Params = Promise<{ work: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { work } = await params;
	const projectData = projects[work];

	return {
		title: projectData?.title || projectData?.clientName || "Work",
		description:
			projectData?.description ||
			"Explore our diverse portfolio of projects, showcasing our expertise and commitment to excellence in every endeavor.",
	};
}

export default async function ProjectPage({ params }: { params: Params }) {
	const { work } = await params;
	const projectData = projects[work];
	if (!projectData) {
		return null;
	}
	return (
		<main className="flex-grow pt-[72px]">
			<HeroImage image={projectData.heroImage} alt={projectData.heroImageAlt} />
			{/* Project-specific content */}
			<ProjectDetails projectData={projectData} />
			<ProjectSection sections={projectData.sections} />
		</main>
	);
}
