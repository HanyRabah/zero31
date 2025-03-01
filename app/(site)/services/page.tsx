import { Loader } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "../../../components/contact/ContactForm";
import NavServices from "../../../components/sections/NavServices";
import Services from "../../../components/sections/Services";

const Loading = () => (
	<div className="flex items-center justify-center min-h-screen">
		<Loader className="w-8 h-8 animate-spin" />
	</div>
);

export const metadata: Metadata = {
	title: "Our Services",
	description: "Professional services offered by our company",
};

export default function ServicesPage() {
	return (
		<main className="flex-grow bg-novo-blue pt-[72px]">
			<Suspense fallback={<Loading />}>
				<NavServices />
			</Suspense>

			{/* Services Section */}
			<Suspense fallback={<Loading />}>
				<Services />
			</Suspense>

			{/* Contact Form */}
			<Suspense fallback={<Loading />}>
				<ContactForm />
			</Suspense>
		</main>
	);
}
