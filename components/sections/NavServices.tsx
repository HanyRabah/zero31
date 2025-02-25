"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";

const services = [
	// First row
	[
		{ href: "/services/hospitality", label: "Hospitality" },
		{ href: "/services/commercial", label: "Commercial" },
		{ href: "/services/office-design", label: "Office Design" },
		{ href: "/services/residential", label: "Residential" },
	],
	// Second row
	[
		{ href: "/services/architecture", label: "Architecture" },
		{ href: "/services/interior-design", label: "Interior Design" },
		{ href: "/services/landscape", label: "Landscape" },
		{ href: "/services/ffae-service", label: "FF&E Service" },
	],
];

const ServiceLink = ({ href, label }: { href: string; label: string }) => (
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

const NavServices = () => {
	return (
		<section className="container mx-auto py-[22px]">
			<div className="bg-novo-blue">
				{/* First Row - Always visible */}
				<div className="grid grid-cols-2 md:flex md:justify-center gap-4 md:gap-5 mb-4 md:mb-5">
					{services[0].map((service, index) => (
						<ServiceLink key={index} {...service} />
					))}
				</div>

				{/* Second Row */}
				<div className="grid grid-cols-2 md:flex md:justify-center gap-4 md:gap-5">
					{services[1].map((service, index) => (
						<ServiceLink key={index} {...service} />
					))}
				</div>
			</div>
		</section>
	);
};

export default NavServices;
