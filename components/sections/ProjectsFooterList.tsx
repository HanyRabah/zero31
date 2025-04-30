import Link from "next/link";

const projects = [
	{ title: "Architecture", href: "/projects/architecture" },
	{ title: "Exterior Design", href: "/projects/exterior-design" },
	{ title: "Interior Architecture", href: "/projects/interior-architecture" },
	{ title: "Interior Design", href: "/projects/interior-design" },
	{ title: "Lighting Design", href: "/projects/lighting-design" },
	{ title: "Custom Furniture", href: "/projects/custom-furniture" },
	{ title: "FF&E Service", href: "/projects/ffae-service" },
	{ title: "Landscape", href: "/projects/landscape" },
	{ title: "Project Management", href: "/projects/project-management" },
];

const ProjectsFooterList = () => {
	const columnSize = Math.ceil(projects.length / 3);
	const columns = [
		projects.slice(0, columnSize),
		projects.slice(columnSize, columnSize * 2),
		projects.slice(columnSize * 2),
	];

	return (
		<section className="p-40 md:p-80 bg-novo-blue">
			<div className="container mx-auto px-4">
				<h2 className="text-[28px] md:text-[48px] font-[500] md:font-title text-center mb-32">Our Services</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-6 max-w-[1000px] mx-auto text-center">
					{columns.map((column, columnIndex) => (
						<div key={columnIndex} className="space-y-6">
							{column.map(project => (
								<Link
									key={project.title}
									href={'#'}
									className="block text-[14px] md:text-left md:text-[20px] font-title hover:underline underline-offset-4 transition-colors">
									{project.title}
								</Link>
							))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default ProjectsFooterList;
