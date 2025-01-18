import { ProjectSection as ProjectSectionProp } from "@/config/projects/types";
import { cn } from "@/lib/utils";
import { ImageWithDescription } from "./ImageWithDescription";
import { MultipleImages } from "./MultipleImages";
import { ParallaxImage } from "./ParallaxImage";

const ProjectSection = ({ sections }: { sections: ProjectSectionProp[] }) => {
	return (
		<>
			{sections.map((section, index) => (
				<div key={index} className={cn("flex-grow transition-colors duration-500", section.backgroundColor)}>
					<section className="container mx-auto">
						{section.description ? (
							<ImageWithDescription
								description={section.description}
								image={section.images?.[0] || undefined}
								imageAlt={section.imagesAlt?.[0] || undefined}
							/>
						) : section.images?.length === 1 ? (
							<ParallaxImage image={section.images[0]} imageAlt={section.imagesAlt?.[0]} />
						) : (
							<MultipleImages images={section.images} imagesAlt={section.imagesAlt} />
						)}
					</section>
				</div>
			))}
		</>
	);
};

export default ProjectSection;
