"use client";
import Link from "next/link";

const NavServices = () => {
	return (
		<section className="container mx-auto px-4">
			<div className="bg-novo-blue py-80">
				<div className="hidden md:flex justify-center space-x-5 mb-5">
					<Link
						href={"/services/hospitality"}
						className="h-10 py-8 px-6 inline-flex items-center justify-center font-dm-mono rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-500 border-dotted  text-blue-black hover:bg-primary-hover hover:text-white">
						Hospitality
					</Link>
					<Link
						href={"/services/commercial"}
						className="h-10 py-8 px-6 inline-flex items-center justify-center font-dm-mono rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-500 border-dotted  text-blue-black hover:bg-primary-hover hover:text-white">
						Commercial
					</Link>

					<Link
						href={"/services/office-design"}
						className="h-10 py-8 px-6 inline-flex items-center justify-center font-dm-mono rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-500 border-dotted  text-blue-black hover:bg-primary-hover hover:text-white">
						Office Design
					</Link>

					<Link
						href={"/services/residential"}
						className="h-10 py-8 px-6 inline-flex items-center justify-center font-dm-mono rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-500 border-dotted  text-blue-black hover:bg-primary-hover hover:text-white">
						Residential
					</Link>
				</div>

				<div className="hidden md:flex justify-center space-x-5">
					<Link
						href={"/services/architecture"}
						className="h-10 py-8 px-6 inline-flex items-center justify-center font-dm-mono rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-500 border-dotted  text-blue-black hover:bg-primary-hover hover:text-white">
						Architecture
					</Link>
					<Link
						href={"/services/interior-design"}
						className="h-10 py-8 px-6 inline-flex items-center justify-center font-dm-mono rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-500 border-dotted  text-blue-black hover:bg-primary-hover hover:text-white">
						Interior Design
					</Link>

					<Link
						href={"/services/ffae-service"}
						className="h-10 py-8 px-6 inline-flex items-center justify-center font-dm-mono rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-500 border-dotted  text-blue-black hover:bg-primary-hover hover:text-white">
						FF&E Service
					</Link>
				</div>
			</div>
		</section>
	);
};
export default NavServices;
