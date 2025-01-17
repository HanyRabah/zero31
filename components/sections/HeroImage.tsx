import Image from "next/image";

const HeroImage = ({ image, alt }: { image: string; alt: string }) => {
	return (
		<div className="hero-image">
			<Image src={image} alt={alt} layout="fit" />
		</div>
	);
};
export default HeroImage;
