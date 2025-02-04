const HeroImage = ({ image, alt }: { image: string; alt: string }) => {
	const isDev = process.env.NODE_ENV === "development";

	return (
		<div className="hero-image w-full h-[200px] md:h-[400px] lg:h-[550px] relative">
			{/* <Image src={image} alt={alt} layout="fill" objectFit="cover" /> */}
			<img src={isDev ? `https://new.zero-31.com/${image}` : image} alt={alt} className="w-full h-full object-cover" />
		</div>
	);
};
export default HeroImage;
