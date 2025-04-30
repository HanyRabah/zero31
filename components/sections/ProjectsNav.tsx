"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

const projects = [
	[
		{ href: "/work/hospitality", label: "Hospitality" },
		{ href: "/work/commercial", label: "Commercial" },
		{ href: "/work/office-design", label: "Office Design" },
		{ href: "/work/residential", label: "Residential" },
	],
	[
		{ href: "/work/architecture", label: "Architecture" },
		{ href: "/work/interior-design", label: "Interior Design" },
		{ href: "/work/landscape", label: "Landscape" },
		{ href: "/work/FF&E-services", label: "FF&E Services" },
	],
];

const ProjectLink = ({ href, label }: { href: string; label: string }) => (
	<Link
		href={href}
		className={cn(
			"h-10 py-8 px-6 inline-flex items-center justify-center",
			"font-mono rounded-full text-[12px] font-[400]",
			"transition-all duration-300",
			"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
			"disabled:pointer-events-none disabled:opacity-50",
			"border border-gray-500 border-dotted",
			"text-black hover:bg-yellow ",
			"w-full md:w-auto"
		)}>
		{label}
	</Link>
);

const ProjectsNav = () => {
	return (
		<section className="container mx-auto py-[22px]">
			<div className="bg-novo-blue">
				{/* First Row - Always visible */}
				<div className="grid grid-cols-2 md:flex md:justify-center gap-4 md:gap-5 mb-4 md:mb-5">
					{projects[0].map((project, index) => (
						<ProjectLink key={index} {...project} />
					))}
				</div>

				{/* Second Row */}
				<div className="grid grid-cols-2 md:flex md:justify-center gap-4 md:gap-5">
					{projects[1].map((project, index) => (
						<ProjectLink key={index} {...project} />
					))}
				</div>
			</div>
		</section>
	);
};

export default ProjectsNav;
