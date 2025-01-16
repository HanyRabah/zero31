import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface ContentSectionProps {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	imageAlt: string;
	backgroundColor?: string;
	reverse?: boolean;
	className?: string;
}

const ContentSection = ({
	title,
	subtitle,
	description,
	image,
	imageAlt,
	backgroundColor = "bg-off-white",
	reverse = false,
	className,
}: ContentSectionProps) => {
	return (
		<section className={cn("py-120 mt-[60px]", backgroundColor, className)}>
			<div className="container mx-auto px-24">
				<div
					className={cn(
						"grid grid-cols-1 md:grid-cols-2 gap-80 items-center",
						reverse ? "flex md:flex-row-reverse" : ""
					)}>
					{/* Image */}
					<div className="relative w-full aspect-square">
						<Image src={image} alt={imageAlt} fill className="object-cover" />
					</div>

					{/* Content */}
					<div className="max-w-[480px]">
						<h2 className="text-[40px] font-title mb-24">{title}</h2>
						<p className="text-[20px] mb-16">{subtitle}</p>
						<p className="text-[16px] leading-[24px] mb-32 text-gray-600">{description}</p>
						<Button variant="outline" className="group text-[16px] font-medium">
							Learn more
							<ChevronRight className="h-[18px] font-thin  ml-2" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};
export default ContentSection;
