import ContactForm from "../../../../components/contact/ContactForm";
import ProjectsGrid from "../../../../components/sections/ProjectsGrid";
import Services from "../../../../components/sections/Services";
import ServiceHeader from "../../../../components/services/ServiceHeader";
import ContentSection from "../../../../components/services/ServiceSection";
import { services } from "../../../../config/services/services";

type Params = Promise<{ service: string }>;

export default async function ServicePage({ params }: { params: Params }) {
	const { service } = await params;
	const serviceData = services[service];
	if (!serviceData) {
		return null;
	}

	return (
		<main className="flex-grow bg-novo-blue pt-[72px]">
			<ServiceHeader serviceName={serviceData.title} description={serviceData.description} />
			<ProjectsGrid />

			{/* Service-specific content sections */}
			{serviceData.sections.map((section, index) => (
				<ContentSection key={index} {...section} className={index === 0 ? "pt-0" : ""} />
			))}

			{/* Other services links - excluding current service */}
			<Services />
			{/* Contact Form */}
			<ContactForm />
		</main>
	);
}
