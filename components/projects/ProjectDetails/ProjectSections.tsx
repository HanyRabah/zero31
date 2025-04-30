import { cn } from "@/lib/utils";
import type { ProjectSection } from "@/types/dashboard";
import { lazy, Suspense } from "react";

// Lazy load components
const ImageWithDescription = lazy(() => import("./ProjectContent/ImageWithDescription"));
const MultipleImages = lazy(() => import("./ProjectContent/MultipleImages"));
const ParallaxImage = lazy(() => import("./ProjectContent/ParallaxImage"));

const ProjectSection = ({ sections }: { sections: ProjectSection[] }) => {
	return (
		<>
			{sections.map((section: ProjectSection, index: number) => (
				<div key={index} className={cn("flex-grow transition-colors duration-500", section.backgroundColor)}>
					<section className="container mx-auto">
						<Suspense fallback={""}>
							{section.description ? (
								<ImageWithDescription
									description={section.description}
									image={section.images?.[0]?.url}
									imageAlt={section.images?.[0]?.alt}
								/>
							) : section.images?.length === 1 ? (
								<ParallaxImage images={section.images} />
							) : (
								<MultipleImages images={section.images || []} />
							)}
						</Suspense>
					</section>
				</div>
			))}
		</>
	);
};

export default ProjectSection;
