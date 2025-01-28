"use client";
import useProjects from "@/hooks/useProjects";
import { motion } from "framer-motion";
import ProjectCard from "../projects/ProjectCard";

// const projects = [
// 	{
// 		id: 1,
// 		title: "SODIC OFFICE BUILDING",
// 		type: "Projects",
// 		year: "Completed 2018",
// 		image: "/images/work/sodic-office-building.jpg",
// 		href: "/work/sherif-hamdy-stone-park",
// 	},
// 	{
// 		id: 2,
// 		title: "NEW GIZA RESIDENCE",
// 		type: "Projects",
// 		year: "Completed 2018",
// 		image: "/images/work/new-giza-residence.jpg",
// 		href: "/work/new-giza",
// 	},
// 	{
// 		id: 3,
// 		title: "NORTH BEACH HOUSE",
// 		type: "Projects",
// 		year: "Completed 2018",
// 		image: "/images/work/north-beach-house.jpg",
// 		href: "/work/north-beach",
// 	},
// 	{
// 		id: 4,
// 		title: "NEW GIZA RESIDENCE",
// 		type: "Projects",
// 		year: "Completed 2018",
// 		image: "/images/work/old-giza.jpg",
// 		href: "/work/new-giza",
// 	},
// 	{
// 		id: 5,
// 		title: "NORTH BEACH HOUSE",
// 		type: "Projects",
// 		year: "Completed 2018",
// 		image: "/images/work/new-giza-2.jpg",
// 		href: "/work/north-beach",
// 	},
// 	{
// 		id: 6,
// 		title: "NORTH BEACH HOUSE",
// 		type: "Projects",
// 		year: "Completed 2018",
// 		image: "/images/work/new-giza.jpg",
// 		href: "/work/north-beach",
// 	},
// ];

const ProjectsGrid = () => {
	const { data: projects } = useProjects();
	return (
		<section className="py-40 md:py-80 bg-white">
			<div className="container mx-auto px-24">
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-20 md:gap-y-80"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}>
					{projects.map(project => (
						<ProjectCard key={project.id} project={project} />
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default ProjectsGrid;
