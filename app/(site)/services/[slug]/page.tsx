import ContactForm from "../../../../components/contact/ContactForm";
import ProjectsFooterList from "../../../../components/sections/ProjectsFooterList";
import ServiceHeader from "../../../../components/services/ServiceHeader";
import ContentSection from "../../../../components/services/ServiceSection";
import { services } from "../../../../config/services/services";
import ProjectsByName from "../../../../components/projects/ProjectList/ProjectByCategory";

type Params = Promise<{ slug: string }>;

export default async function ProjectPage({ params }: { params: Params }) {
	const { slug } = await params;

	const serviceData = services[slug];
	if (!serviceData) {
		return null;
	}

	return (
		<main className="flex-grow bg-novo-blue pt-[72px]">
			<ServiceHeader serviceName={serviceData.title} description={serviceData.description} />
			<ProjectsByName category={slug} />

			{/* Service-specific content sections */}
			{serviceData.sections.map((section, index) => (
				<ContentSection key={index} {...section} className={index === 0 ? "pt-0" : ""} />
			))}

			{/* Other services links - excluding current service */}
			<ProjectsFooterList />
			{/* Contact Form */}
			<ContactForm />
		</main>
	);
}
