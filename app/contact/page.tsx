import ContactForm from "@/components/contact/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact Us",
	description: "Get in touch with our team",
};

export default function ContactPage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<div className="flex-grow pt-[72px]">
				<ContactForm variant="light" />
			</div>
		</main>
	);
}
