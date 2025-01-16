import Image from "next/image";
import Link from "next/link";

const projects = [
	{
		id: 1,
		title: "SODIC OFFICE BUILDING",
		type: "Projects",
		completionYear: "Completed 2018",
		image: "/images/work/sodic-office-building.jpg",
		href: "/work/sodic-office",
	},
	{
		id: 2,
		title: "NEW GIZA RESIDENCE",
		type: "Projects",
		completionYear: "Completed 2018",
		image: "/images/work/new-giza-residence.jpg",
		href: "/work/new-giza",
	},
	{
		id: 3,
		title: "NORTH BEACH HOUSE",
		type: "Projects",
		completionYear: "Completed 2018",
		image: "/images/work/north-beach-house.jpg",
		href: "/work/north-beach",
	},
	{
		id: 4,
		title: "NEW GIZA RESIDENCE",
		type: "Projects",
		completionYear: "Completed 2018",
		image: "/images/work/old-giza.jpg",
		href: "/work/new-giza",
	},
	{
		id: 5,
		title: "NORTH BEACH HOUSE",
		type: "Projects",
		completionYear: "Completed 2018",
		image: "/images/work/new-giza-2.jpg",
		href: "/work/north-beach",
	},
	{
		id: 6,
		title: "NORTH BEACH HOUSE",
		type: "Projects",
		completionYear: "Completed 2018",
		image: "/images/work/new-giza.jpg",
		href: "/work/north-beach",
	},
];

const ProjectsGrid = () => {
	return (
		<section className="py-80">
			<div className="container mx-auto px-24">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-x-24 gap-y-80">
					{projects.map(project => (
						<Link href={project.href} key={project.id} className="group relative block">
							{/* Image Container */}
							<div className="relative aspect-[3/3] overflow-hidden mb-16">
								<Image src={project.image} alt={project.title} fill className="object-contain" />
							</div>

							{/* Project Info */}
							<div className="relative">
								{/* Project Type */}
								<p className="font-mono text-[12px] mb-8">{project.type}</p>

								{/* Project Title - underline appears on hover */}
								<div className="relative inline-block">
									<h3 className="text-[16px] font-title">{project.title}</h3>
									<div className="absolute left-0 bottom-0 w-full h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
								</div>

								{/* Completion Year - Only shown for specific projects */}
								{project.completionYear && (
									<p className="font-mono text-[12px] mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										{project.completionYear}
									</p>
								)}

								{/* Plus Icon */}
								<span className="absolute top-0 right-0 text-[24px] h-[16px] leading-[14px] group-hover:rotate-180 duration-300">
									+
								</span>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProjectsGrid;
