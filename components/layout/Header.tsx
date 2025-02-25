"use client";
import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../../components/ui/button";

const AnimatedLogo = () => {
	return (
		<Link href="/" className="relative block w-[158px] h-[72px] group">
			{/* Mini Logo - visible by default, fades out on hover */}
			<div className="absolute inset-0 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0 h-[72px] w-[115px]">
				<Image
					src="/logo/mini-logo.svg"
					width={115}
					height={26}
					alt="Zero31 Mini Logo"
					className="w-full h-full object-contain"
				/>
			</div>

			{/* Full Logo - hidden by default, fades in on hover */}
			<div className="absolute inset-0 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 h-[72px]  w-[115px]">
				<Image
					src="/logo/logo-full.svg"
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
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="w-full fixed top-0 z-20 bg-novo-blue">
			<div className="container mx-auto">
				<nav className="flex justify-between items-center">
					{/* Logo */}
					<div className="z-50">
						<AnimatedLogo />
					</div>

					{/* Burger Menu Button - Mobile Only */}
					<button className="md:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>

					{/* Mobile Menu - Slides down */}
					<div
						className={`fixed top-0 left-0 w-full bg-white transform transition-transform duration-300 ease-in-out z-10 ${
							isMenuOpen ? "translate-y-[0px]" : "-translate-y-full"
						}`}>
						<div className="container mx-auto px-4 py-40">
							<div className="flex flex-col items-center space-y-48 pt-80">
								<Link
									href="/office"
									className="text-black text-[20px] font-bold hover:opacity-80 underline underline-offset-4"
									onClick={() => setIsMenuOpen(false)}>
									OFFICE
								</Link>
								<Link
									href="/work"
									className="text-black text-[20px] font-bold hover:opacity-80 underline underline-offset-4"
									onClick={() => setIsMenuOpen(false)}>
									WORK
								</Link>
								{/* <Link
									href="/news"
									className="text-black text-[20px] font-bold hover:opacity-80 underline underline-offset-4"
									onClick={() => setIsMenuOpen(false)}>
									NEWS
								</Link> */}
								<Link
									href="/contact"
									className="text-black text-[20px] font-bold hover:opacity-80 underline underline-offset-4"
									onClick={() => setIsMenuOpen(false)}>
									CONTACT
								</Link>
								<Button
									className="font-mono bg-primary hover:bg-primary-hover text-black mt-48"
									onClick={() => setIsMenuOpen(false)}>
									Go to Shop
									<ChevronRight className="h-[18px] font-thin ml-2" />
								</Button>
							</div>
						</div>
					</div>

					{/* Main Navigation */}
					<div className="hidden md:flex space-x-64">
						<Link href="/office" className="text-black font-bold text-lg underline underline-offset-4 hover:opacity-80">
							OFFICE
						</Link>
						<Link href="/work" className="text-black font-bold text-lg underline underline-offset-4 hover:opacity-80">
							WORK
						</Link>
						{/* <Link href="/news" className="text-black font-bold text-lg underline underline-offset-4 hover:opacity-80">
							NEWS
						</Link> */}
						<Link
							href="/contact"
							className="text-black font-bold text-lg underline underline-offset-4 hover:opacity-80">
							CONTACT
						</Link>
					</div>

					{/* CTA Button */}
					<Button className="font-mono hidden md:flex bg-primary hover:bg-primary-hover text-black">
						Go To Shop
						<ChevronRight className="h-[18px] font-thin ml-2" />
					</Button>
				</nav>
			</div>
		</header>
	);
};

export default Header;
