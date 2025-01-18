"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

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
		<section className={cn("py-60 md:py-120 mt-[60px]", backgroundColor, className)}>
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
					<motion.div
						className="relative w-full aspect-square rounded-lg overflow-hidden group"
						variants={itemVariants}>
						<motion.div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<Image
							src={image}
							alt={imageAlt}
							fill
							className="object-cover transition-transform duration-700 group-hover:scale-105"
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
							<Button
								variant="outline"
								className="group text-[16px] font-medium hover:bg-primary hover:text-black transition-all duration-300">
								Learn more
								<ChevronRight className="h-[18px] font-thin ml-2 group-hover:translate-x-1 transition-transform duration-300" />
							</Button>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default ContentSection;
