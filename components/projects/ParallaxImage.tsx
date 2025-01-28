// components/Projects/ParallaxImage.tsx
"use client";
import { Image as ImageType } from "@/types/dashboard";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ParallaxImage = ({ images }: { images: ImageType[] }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

	return (
		<>
			{images.map(image => (
				<div key={image.id} className="py-40 md:py-120">
					<div ref={containerRef} className="w-full h-[50vh] md:h-[90vh] overflow-hidden relative">
						<motion.div className="absolute inset-0 w-full h-[90%]" style={{ y }}>
							<div
								className="w-full h-full bg-cover bg-center"
								style={{
									backgroundImage: `url(${image.url})`,
									backgroundAttachment: "scroll",
									transform: "scale(1.1)",
								}}
								role="img"
								aria-label={image.alt}
							/>
						</motion.div>
					</div>
				</div>
			))}
		</>
	);
};
