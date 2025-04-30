import { Metadata } from "next";
import ContactForm from "../../../components/contact/ContactForm";
import ProjectsGrid from "../../../components/projects/ProjectList/ProjectsList";
import Quote from "../../../components/sections/Quote";

export const metadata: Metadata = {
	title: "Our Work",
	description: "Professional work offered by our company",
};

export default function ProjectsPage() {
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
