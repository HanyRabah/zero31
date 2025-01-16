import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-blue-black text-white pt-40 md:pt-80 pb-60 md:pb-120">
			<div className="container px-40 md:px-80">
				<div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 md:gap-x-24 place-items-start md:place-items-start  mx-auto">
					{/* Logo */}
					<div className="col-span-2 md:col-span-1 mb-24 md:mb-0  md:w-auto">
						<Link href="/" className="font-title text-2xl">
							<Image src="/logo.svg" width={150} height={50} alt="Zero31 Logo" />
						</Link>
					</div>

					{/* Services */}
					<ul className="col-span-1 md:col-span-1 w-[135px] md:w-auto space-y-8 md:space-y-2 place-content-start mb-8">
						<li>
							<Link href="/services/architecture" className="hover:text-primary">
								Architecture
							</Link>
						</li>
						<li>
							<Link href="/services/interior-design" className="hover:text-primary">
								Interior Design
							</Link>
						</li>
						<li>
							<Link href="/services/lighting-design" className="hover:text-primary">
								Lighting Design
							</Link>
						</li>
						<li>
							<Link href="/services/custom-furniture" className="hover:text-primary">
								Custom Furniture
							</Link>
						</li>
					</ul>

					{/* Quick Links */}
					<ul className="col-span-1 md:col-span-1  w-[135px] md:w-auto space-y-8 md:space-y-2 place-content-start  mb-8">
						<li>
							<Link href="/services/hospitality" className="hover:text-primary">
								Hospitality
							</Link>
						</li>
						<li>
							<Link href="/services/residential" className="hover:text-primary">
								Residential
							</Link>
						</li>
						<li>
							<Link href="/services/commercial" className="hover:text-primary">
								Commercial
							</Link>
						</li>
					</ul>

					{/* Contact & Careers */}
					<ul className="col-span-1 md:col-span-1  w-[135px] md:w-auto space-y-8 md:space-y-2 place-content-start  mb-8">
						<li>
							<Link href="/contact" className="hover:text-primary">
								Contact
							</Link>
						</li>
						<li>
							<Link href="/careers" className="hover:text-primary">
								Careers
							</Link>
						</li>
						<li>
							<Link href="/terms" className="hover:text-primary">
								Terms of Use
							</Link>
						</li>
					</ul>
					{/* Social Links */}
					<ul className="col-span-1 md:col-span-1  w-[135px] md:w-auto space-y-8 md:space-y-2 place-content-start">
						<li className="flex space-x-4">
							<Link href="https://www.instagram.com/031designstudio" target="_blank" className="hover:text-primary">
								Instagram
							</Link>
						</li>
						<li className="flex space-x-4">
							<Link
								href="https://www.linkedin.com/company/031designstudio/"
								target="_blank"
								className="hover:text-primary">
								LinkedIn
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
