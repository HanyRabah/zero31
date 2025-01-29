"use client";
import { Image as ImageType } from "@/types/dashboard";
import { motion } from "framer-motion";

export const MultipleImages = ({ images }: { images: ImageType[] }) => {
	return (
		<div className="py-10 md:py-64 px-4 md:px-16">
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}>
				{images.map((image, index) => (
					<motion.div
						key={index}
						className="relative aspect-[4/3] overflow-hidden"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: index * 0.2 }}>
						{/* <Image
							src={image.url}
							alt={image.alt || ""}
							fill
							className="object-cover transition-transform duration-700 hover:scale-105"
							sizes="(max-width: 768px) 100vw, 50vw"
						/> */}
						<img
							src={image.url}
							alt={image.alt || ""}
							className="object-cover transition-transform duration-700 hover:scale-105"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
};
