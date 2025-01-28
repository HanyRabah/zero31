import { Project } from "@/types/dashboard";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project }: { project: Project }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			whileHover="hover" // Add this to control all hover states
		>
			<Link href={`/work/${project.slug}`} className="group relative block">
				{/* Image Container */}
				<div className="relative aspect-square overflow-hidden mb-16">
					<Image
						src={project.thumbnail}
						alt={project.thumbnailAlt}
						fill
						className="object-contain transition-transform duration-700 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, 33vw"
					/>
				</div>

				{/* Project Info */}
				<div className="relative">
					{/* Project Type */}
					<motion.p
						className="font-mono text-[12px] mb-8 text-black"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.2 }}>
						{project.type?.name || "Project"}
					</motion.p>

					{/* Project Title with hover effect */}
					<div className="relative inline-block">
						<h3 className="text-[16px] font-mono pr-8">{project.title}</h3>
						<div className="absolute left-0 bottom-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
					</div>

					{/* Completion Year with fade effect */}
					{project.year && (
						<p className="font-mono text-[12px] mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							{project.year}
						</p>
					)}

					{/* Plus Icon with rotation */}
					<motion.span
						className="absolute top-0 right-0 text-[24px] h-[16px] leading-[14px] origin-center"
						variants={{
							hover: { rotate: 180 },
							initial: { rotate: 0 },
						}}
						transition={{ duration: 0.3 }}>
						+
					</motion.span>
				</div>
			</Link>
		</motion.div>
	);
};

export default ProjectCard;
