import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function SiteTemplate({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
