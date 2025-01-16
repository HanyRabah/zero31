import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AnimatedLogo = () => {
	return (
		<Link href="/" className="relative block w-[115px] h-[72px] group">
			{/* Mini Logo - visible by default, fades out on hover */}
			<div className="absolute inset-0 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0 h-[72px] ">
				<Image
					src="/mini-logo.svg"
					width={115}
					height={26}
					alt="Zero31 Mini Logo"
					className="w-full h-full object-contain"
				/>
			</div>

			{/* Full Logo - hidden by default, fades in on hover */}
			<div className="absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 h-[72px] ">
				<Image
					src="/logo-full.svg"
					width={115}
					height={26}
					alt="Zero31 Full Logo"
					className="w-full h-full object-contain"
				/>
			</div>
		</Link>
	);
};

const Header = () => {
	return (
		<header className="w-full p-5 fixed top-0 z-20">
			<div className="container mx-auto px-4">
				<nav className="flex justify-between items-center">
					{/* Logo */}
					<AnimatedLogo />

					{/* Main Navigation */}
					<div className="hidden md:flex space-x-64">
						<Link href="/office" className="text-black font-bold text-lg underline underline-offset-4 hover:opacity-80">
							OFFICE
						</Link>
						<Link href="/work" className="text-black font-bold text-lg underline underline-offset-4 hover:opacity-80">
							WORK
						</Link>
						<Link href="/news" className="text-black font-bold text-lg underline underline-offset-4 hover:opacity-80">
							NEWS
						</Link>
						<Link
							href="/contact"
							className="text-black font-bold text-lg underline underline-offset-4 hover:opacity-80">
							CONTACT
						</Link>
					</div>

					{/* CTA Button */}
					<Button className="bg-primary hover:bg-primary-hover text-black">
						Go To Shop
						<ChevronRight className="h-[18px] font-thin ml-2" />
					</Button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
