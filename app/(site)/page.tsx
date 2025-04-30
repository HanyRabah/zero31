import { Loader } from "lucide-react";
import { Suspense } from "react";
import ContactForm from "../../components/contact/ContactForm";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import Hero from "../../components/sections/Hero";
import LocationInfo from "../../components/sections/Location";
import ProjectsNav from "../../components/sections/ProjectsNav";
import ProjectsGrid from "../../components/projects/ProjectList/ProjectsList";
import Quote from "../../components/sections/Quote";
import ProjectsFooterList from "../../components/sections/ProjectsFooterList";

// Loading component
const Loading = () => (
	<div className="flex items-center justify-center min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-72px)]">
		<Loader className="w-6 h-6 md:w-8 md:h-8 animate-spin" />
	</div>
);

export default function Home() {
	return (
		<ErrorBoundary>
			<main className="flex-grow bg-novo-blue pt-[56px] md:pt-[72px]">
				<Suspense fallback={<Loading />}>
					<ProjectsNav />
					<LocationInfo />
				</Suspense>
				{/* Hero Section */}
				<Suspense fallback={<Loading />}>
					<Hero />
				</Suspense>

				{/* Projects Grid */}
				<Suspense fallback={<Loading />}>
					<ProjectsGrid />
				</Suspense>

				{/* Quote Section */}

				<Suspense fallback={<Loading />}>
					<Quote />
				</Suspense>

				{/* Projects Section */}
				<Suspense fallback={<Loading />}>
					<ProjectsFooterList />
				</Suspense>

				{/* Contact Form */}
				<Suspense fallback={<Loading />}>
					<ContactForm />
				</Suspense>
			</main>
		</ErrorBoundary>
	);
}
