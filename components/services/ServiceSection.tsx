"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface ContentSectionProps {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	imageAlt: string;
	backgroundColor?: string;
	reverse?: boolean;
	className?: string;
}

const ContentLink = ({ href, label }: { href: string; label: string }) => (
	<Link
		href={href}
		className={cn(
			"h-[36px] py-[12px] px-[20px] inline-flex items-center justify-center",
			"font-mono rounded-full text-[12px] tracking-tighter",
			"transition-all duration-300",
			"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
			"disabled:pointer-events-none disabled:opacity-50",
			"border border-black border-dotted",
			"text-black hover:bg-black hover:text-white "
		)}>
		{label}
		<ChevronRight className="h-[18px] font-thin  group-hover:translate-x-1 transition-transform duration-300" />
	</Link>
);

const ContentSection = ({
	title,
	subtitle,
	description,
	image,
	imageAlt,
	backgroundColor = "bg-off-white",
	reverse = false,
	className,
}: ContentSectionProps) => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	return (
		<section className={cn("py-60 md:py-120", backgroundColor, className)}>
			<div className="container mx-auto px-4 md:px-24">
				<motion.div
					className={cn(
						"grid grid-cols-1 md:grid-cols-2 gap-40 md:gap-80 items-center",
						reverse ? "md:flex md:flex-row-reverse" : ""
					)}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={containerVariants}>
					{/* Image */}
					<motion.div className="relative aspect-square overflow-hidden group" variants={itemVariants}>
						<motion.div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<img
							src={image}
							alt={imageAlt}
							className="object-cover h-full transition-transform duration-700 group-hover:scale-105"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</motion.div>

					{/* Content */}
					<div className="max-w-[480px] md:px-8">
						<motion.h2 className="text-[32px] md:text-[40px] font-title mb-16 md:mb-24" variants={itemVariants}>
							{title}
						</motion.h2>
						<motion.p className="text-[18px] md:text-[20px] mb-8 md:mb-16" variants={itemVariants}>
							{subtitle}
						</motion.p>
						<motion.p className="text-[16px] leading-[24px] mb-24 md:mb-32 text-gray-600" variants={itemVariants}>
							{description}
						</motion.p>
						<motion.div variants={itemVariants}>
							<ContentLink href="/services" label="Learn more" />
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default ContentSection;
