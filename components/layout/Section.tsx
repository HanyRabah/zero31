import { cn } from "@/lib/utils";

type SectionProps = {
	backgroundColor: string;
	className: string;
	children: React.ReactNode;
};

const Section = ({ backgroundColor, className, children }: SectionProps) => {
	return (
		<section className={cn("py-120", backgroundColor, className)}>
			<div className="container mx-auto px-24">{children}</div>
		</section>
	);
};
export default Section;
