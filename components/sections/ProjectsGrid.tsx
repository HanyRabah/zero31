"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
	{
		id: 1,
		title: "SODIC OFFICE BUILDING",
		type: "Projects",
		year: "Completed 2018",
		image: "/images/work/sodic-office-building.jpg",
		href: "/work/sherif-hamdy-stone-park",
	},
	{
		id: 2,
		title: "NEW GIZA RESIDENCE",
		type: "Projects",
		year: "Completed 2018",
		image: "/images/work/new-giza-residence.jpg",
		href: "/work/new-giza",
	},
	{
		id: 3,
		title: "NORTH BEACH HOUSE",
		type: "Projects",
		year: "Completed 2018",
		image: "/images/work/north-beach-house.jpg",
		href: "/work/north-beach",
	},
	{
		id: 4,
		title: "NEW GIZA RESIDENCE",
		type: "Projects",
		year: "Completed 2018",
		image: "/images/work/old-giza.jpg",
		href: "/work/new-giza",
	},
	{
		id: 5,
		title: "NORTH BEACH HOUSE",
		type: "Projects",
		year: "Completed 2018",
		image: "/images/work/new-giza-2.jpg",
		href: "/work/north-beach",
	},
	{
		id: 6,
		title: "NORTH BEACH HOUSE",
		type: "Projects",
		year: "Completed 2018",
		image: "/images/work/new-giza.jpg",
		href: "/work/north-beach",
	},
];

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			whileHover="hover" // Add this to control all hover states
		>
			<Link href={project.href} className="group relative block">
				{/* Image Container */}
				<div className="relative aspect-square overflow-hidden mb-16">
					<Image
						src={project.image}
						alt={project.title}
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
						{project.type}
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
const ProjectsGrid = () => {
	return (
		<section className="py-40 md:py-80 bg-white">
			<div className="container mx-auto px-24">
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-20 md:gap-y-80"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}>
					{projects.map((project, index) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default ProjectsGrid;
