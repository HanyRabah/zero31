import { cn } from "@/lib/utils";
import type { ProjectSection } from "@/types/dashboard";
import { ImageWithDescription } from "./ImageWithDescription";
import { MultipleImages } from "./MultipleImages";
import { ParallaxImage } from "./ParallaxImage";

const ProjectSection = ({ sections }: { sections: ProjectSection[] }) => {
	console.log("🚀 ~ ProjectSection ~ sections:", sections);
	return (
		<>
			{sections.map((section: ProjectSection, index: number) => {
				return (
					<div key={index} className={cn("flex-grow transition-colors duration-500", section.backgroundColor)}>
						<section className="container mx-auto">
							{section.description ? (
								<ImageWithDescription
									description={section.description}
									image={section.images?.[0].url || undefined}
									imageAlt={section.images?.[0].alt || undefined}
								/>
							) : section.images?.length === 1 ? (
								<ParallaxImage images={section.images} />
							) : (
								<MultipleImages images={section.images} />
							)}
						</section>
					</div>
				);
			})}
		</>
	);
};

export default ProjectSection;
