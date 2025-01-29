import { Metadata } from "next";
import ComingSoonPage from "../../../components/layout/ComingSoon";

export const metadata: Metadata = {
	title: "Careers",
	description: "Join our team",
};

export default function CareerPage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<ComingSoonPage />
		</main>
	);
}
