"use client";
import { motion } from "framer-motion";

export const ImageWithDescription = ({
	description,
	image,
	imageAlt,
}: {
	description: string;
	image?: string;
	imageAlt?: string;
}) => {
	const isDev = process.env.NODE_ENV === "development";
	if (isDev) image = `https://new.zero-31.com/${image}`;
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
				<div className="relative w-full  overflow-hidden">
					<img
						src={image}
						alt={imageAlt}
						className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
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
