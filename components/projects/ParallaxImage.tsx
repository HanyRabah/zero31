// components/Projects/ParallaxImage.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ParallaxImage = ({ image, imageAlt }: { image?: string; imageAlt?: string }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

	return (
		<div className="py-40 md:py-120">
			<div ref={containerRef} className="w-full h-[50vh] md:h-[90vh] overflow-hidden relative">
				<motion.div className="absolute inset-0 w-full h-[90%]" style={{ y }}>
					<div
						className="w-full h-full bg-cover bg-center"
						style={{
							backgroundImage: `url(${image})`,
							backgroundAttachment: "scroll",
							transform: "scale(1.1)",
						}}
						role="img"
						aria-label={imageAlt}
					/>
				</motion.div>
			</div>
		</div>
	);
};
