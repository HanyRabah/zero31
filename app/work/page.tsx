import ContactForm from "@/components/sections/ContactForm";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import Quote from "@/components/sections/Quote";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Our Services",
	description: "Professional services offered by our company",
};

export default function ServicesPage() {
	return (
		<main className="flex-grow pt-[72px]">
			<Quote />
			<div className="container mx-auto">
				<ProjectsGrid />
			</div>
			<ContactForm />
		</main>
	);
}
