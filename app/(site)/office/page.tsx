import ComingSoonPage from "@/components/layout/ComingSoon";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Office",
	description: "Professional services offered by our company",
};

export default function OfficePage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<ComingSoonPage />
		</main>
	);
}
