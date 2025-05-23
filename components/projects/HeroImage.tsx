"use client";

import Image from "next/image";

const HeroImage = ({ image, alt }: { image: string; alt: string }) => {
	return (
		<div className="hero-image w-full h-[200px] md:h-[400px] lg:h-[550px] relative">
			<Image blurDataURL={image} src={image} alt={alt} layout="fill" objectFit="cover" />
		</div>
	);
};
export default HeroImage;
	