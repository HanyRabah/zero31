"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export const ImageWithDescription = ({
	description,
	image,
	imageAlt,
}: {
	description: string;
	image?: string;
	imageAlt?: string;
}) => {
	if (!image || !imageAlt) return null;

	return (
		<div className="py-10 md:py-64 px-4 md:px-16">
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}>
				{/* Image */}
				<div className="relative w-full aspect-square overflow-hidden">
					<Image
						src={image}
						alt={imageAlt}
						fill
						className="object-cover transition-transform duration-700 hover:scale-105"
					/>
				</div>

				{/* Content */}
				<div className="max-w-xl">
					<p className="text-base md:text-lg leading-relaxed text-gray-600">{description}</p>
				</div>
			</motion.div>
		</div>
	);
};
