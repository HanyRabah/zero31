import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="bg-blue-black text-white pt-80 pb-120">
			<div className="container px-80 ">
				<div className="grid grid-cols-1 md:grid-cols-5 ">
					{/* Logo */}
					<div>
						<Link href="/" className="font-title text-2xl">
							<Image src="/logo.svg" width={150} height={50} alt="Zero31 Logo" />
						</Link>
					</div>

					{/* Services */}
					<div>
						<ul className="space-y-2">
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
					</div>

					{/* Quick Links */}
					<div>
						<ul className="space-y-2">
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
					</div>

					{/* Contact & Careers */}
					<div>
						<ul className="space-y-2">
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
					</div>
					{/* Social Links */}
					<div>
						<ul className="space-y-2">
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
			</div>
		</footer>
	);
};

export default Footer;
