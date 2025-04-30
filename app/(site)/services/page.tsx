import { Loader } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "../../../components/contact/ContactForm";
import ProjectsNav from "../../../components/sections/ProjectsNav";
import ProjectsFooterList from "../../../components/sections/ProjectsFooterList";
import ProjectsGrid from "../../../components/projects/ProjectList/ProjectsList";

const Loading = () => (
	<div className="flex items-center justify-center min-h-screen">
		<Loader className="w-8 h-8 animate-spin" />
	</div>
);

export const metadata: Metadata = {
	title: "Our Services",
	description: "Professional services offered by our company",
};

export default function ProjectsPage() {
	return (
		<main className="flex-grow bg-novo-blue pt-[72px]">
			<Suspense fallback={<Loading />}>
				<ProjectsNav />
			</Suspense>

			<Suspense fallback={<Loading />}>
				<ProjectsGrid />
			</Suspense>
			{/* Services Section */}
			<Suspense fallback={<Loading />}>
				<ProjectsFooterList />
			</Suspense>

			{/* Contact Form */}
			<Suspense fallback={<Loading />}>
				<ContactForm />
			</Suspense>
		</main>
	);
}
