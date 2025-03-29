import Link from "next/link";

const services = [
	{ title: "Architecture", href: "/services/architecture" },
	{ title: "Exterior Design", href: "/services/exterior-design" },
	{ title: "Interior Architecture", href: "/services/interior-architecture" },
	{ title: "Interior Design", href: "/services/interior-design" },
	{ title: "Lighting Design", href: "/services/lighting-design" },
	{ title: "Custom Furniture", href: "/services/custom-furniture" },
	{ title: "FF&E Service", href: "/services/ffae-service" },
	{ title: "Landscape", href: "/services/landscape" },
	{ title: "Project Management", href: "/services/project-management" },
];

const Services = () => {
	const columnSize = Math.ceil(services.length / 3);
	const columns = [
		services.slice(0, columnSize),
		services.slice(columnSize, columnSize * 2),
		services.slice(columnSize * 2),
	];

	return (
		<section className="p-40 md:p-80 bg-novo-blue">
			<div className="container mx-auto px-4">
				<h2 className="text-[28px] md:text-[48px] font-[500] md:font-title text-center mb-32">Our services</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-6 max-w-[1000px] mx-auto text-center">
					{columns.map((column, columnIndex) => (
						<div key={columnIndex} className="space-y-6">
							{column.map(service => (
								<Link
									key={service.title}
									href={service.href}
									className="block text-[14px] md:text-left md:text-[20px] font-title hover:underline underline-offset-4 transition-colors">
									{service.title}
								</Link>
							))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
