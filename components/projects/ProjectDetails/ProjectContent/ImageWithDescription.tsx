"use client";
import Image from "next/image";

const ImageWithDescription = ({
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
			<div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
				<div className="relative aspect-[4/3] overflow-hidden">
					<Image
						src={image}
						alt={imageAlt || ""}
						blurDataURL={image}
						fill
						className="object-cover transition-transform duration-700 hover:scale-105"
						sizes="(max-width: 768px) 100vw, 50vw"
					/>
				</div>
				{/* Content */}
				<div className="max-w-xl">
					<p className="text-sm md:text-sm text-novo-grey leading-relaxed text-gray-600">{description}</p>
				</div>
			</div>
		</div>
	);
};
export default ImageWithDescription;
