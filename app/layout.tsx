import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { Metadata } from "next";
import { DM_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-inter",
});

const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
	display: "swap",
	variable: "--font-dm-mono",
});

const neueHaas = localFont({
	src: [
		{
			path: "../public/fonts/NeueHaasPro.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/NeueHaasPro.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/fonts/NeueHaasPro.woff2",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-neue-haas",
});

export const metadata: Metadata = {
	title: "ZERO31° - Architecture & Design Studio",
	description: "We think of design is a human instinct to make things better, and enjoy the good things in life.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.variable} ${neueHaas.variable} ${dmMono.variable}`}>
			<body className="min-h-screen min-h-[100dvh] flex flex-col overflow-x-hidden antialiased">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
