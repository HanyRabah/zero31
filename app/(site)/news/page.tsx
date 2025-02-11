import { Metadata } from "next";
import ComingSoonPage from "../../../components/layout/ComingSoon";

export const metadata: Metadata = {
	title: "News",
	description: "Get the latest news from our company",
};

export default function NewsPage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<ComingSoonPage />
		</main>
	);
}
