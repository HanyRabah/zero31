const HeroImage = ({ image, alt }: { image: string; alt: string }) => {
	return (
		<div className="hero-image w-full h-[200px] md:h-[400px] lg:h-[550px] relative">
			{/* <Image src={image} alt={alt} layout="fill" objectFit="cover" /> */}
			<img src={image} alt={alt} className="w-full h-full object-cover" />
		</div>
	);
};
export default HeroImage;
