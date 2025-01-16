import ContactForm from "@/components/sections/ContactForm";
import ContentSection from "@/components/sections/ContentSection";
import ServiceHeader from "@/components/sections/ServiceHeader";
import Services from "@/components/sections/Services";
import { services } from "@/config/services/services";

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
			{/* Service-specific content sections */}
			<>
				{serviceData.sections.map((section, index) => (
					<ContentSection key={index} {...section} className={index === 0 ? "pt-0" : ""} />
				))}
			</>

			{/* Other services links - excluding current service */}
			<Services />
			{/* Contact Form */}
			<ContactForm />
		</main>
	);
}
