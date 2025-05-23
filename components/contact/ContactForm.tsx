"use client";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";

const variantColor = {
	dark: {
		background: "bg-blue-black",
		text: "text-white",
		contactCardBg: "bg-blue-black/80",
		borderColor: "border-white/20",
	},
	light: {
		background: "bg-transparent",
		text: "text-black",
		contactCardBg: "bg-gray-100/80",
		borderColor: "border-black/20",
	},
};

const ContactInfo = ({
	title,
	content,
	secondaryContent,
	link,
	secondaryLink,
	className,
	type = "two-line",
}: {
	title: string;
	content: string;
	secondaryContent?: string;
	link?: string;
	secondaryLink?: string;
	className?: string;
	type?: "one-line" | "two-line";
}) => {
	if (link) {
		return (
			<div
				className={cn(
					"flex",
					type === "two-line" ? "items-start flex-col gap-4" : "flex-row align-baseline items-center gap-4",
					className
				)}>
				<p className="font-bold text-xs">{title}</p>
				<a
					href={link}
					target="_blank"
					rel="noopener noreferrer"
					className="text-xs transition-colors rounded-sm p-2  group hover:bg-primary">
					{content}
				</a>
				{secondaryContent && (
					<a
						href={secondaryLink}
						target="_blank"
						rel="noopener noreferrer"
						className="text-xs transition-colors rounded-sm p-2  group hover:bg-primary">
						{secondaryContent}
					</a>
				)}
				{title === "Location" && <ExternalLink className="h-3 w-3 mt-1 opacity-70 group-hover:opacity-100" />}
			</div>
		);
	}

	return (
		<div
			className={cn(
				"flex",
				type === "two-line" ? "items-start flex-col gap-3 group" : "flex-row align-baseline items-center gap-4",
				className
			)}>
			<p className="font-bold text-xs">{title}</p>
			<p className="text-xs ">{content}</p>
		</div>
	);
};

const ContactForm = ({ variant = "dark" }: { variant?: "dark" | "light" }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) throw new Error("Failed to send message");

			toast.success("Message sent successfully!");
			setFormData({ name: "", email: "", phone: "" });
		} catch (error) {
			toast.error("Failed to send message. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const { background, text, contactCardBg, borderColor } = variantColor[variant];

	return (
		<section className={background}>
			<div className="container mx-auto py-[60px] px-[20px] md:py-80 md:px-96">
				<motion.div
					className="grid grid-cols-1 lg:grid-cols-12 gap-32" // Changed from lg:grid-cols-2 to lg:grid-cols-12
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}>
					{/* Left side - Image & Contact Info (spans 5 columns) */}
					<motion.div
						className="flex flex-col gap-6 align-middle justify-center items-center lg:items-center lg:justify-center lg:col-span-5" // Added lg:col-span-5
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}>
						{/* Image */}
						<motion.div
							className="relative mb-[20px]  overflow-hidden rounded-lg w-full h-full"
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.6, ease: "easeOut" }}>
							<Image src="/images/contact-form-image.jpg" layout="fill" objectFit="cover" alt="Contact us" />
						</motion.div>
					</motion.div>

					{/* Right side - Form (spans 7 columns) */}
					<motion.div
						className={`${text} w-full lg:col-span-7`} // Added lg:col-span-7
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}>
						<h2 className="text-[22px] md:text-[32px] leading-[22px] md:leading-[32px] tracking-tight font-title mb-[32px]">
							Let us talk
						</h2>
						<p className="text-base md:text-sm mb-[32px]">
							We are always happy to hear of conversation with people. Let us hear from you and we get in touch with you
							very soon.
						</p>

						<form onSubmit={handleSubmit} className="space-y-24 mb-10">
							{/* Form inputs remain unchanged */}
							<Input
								type="text"
								placeholder="Name"
								value={formData.name}
								onChange={e => setFormData({ ...formData, name: e.target.value })}
								required
								className={cn(
									"flex h-[35px] w-full rounded-[32px] bg-transparent px-24 py-16 bg-blue-black",
									"border border-white text-white placeholder:text-white/40",
									"focus:outline-none focus:border-white/40 focus:ring-0",
									"font-mono text-[12px] transition-colors"
								)}
							/>
							<Input
								type="email"
								placeholder="Email"
								value={formData.email}
								onChange={e => setFormData({ ...formData, email: e.target.value })}
								required
								className={cn(
									"flex h-[35px] w-full rounded-[32px] bg-transparent px-24 py-16 bg-blue-black",
									"border border-white text-white placeholder:text-white/40",
									"focus:outline-none focus:border-white/40 focus:ring-0",
									"font-mono text-[12px] transition-colors"
								)}
							/>
							<Input
								type="tel"
								placeholder="Phone"
								value={formData.phone}
								onChange={e => setFormData({ ...formData, phone: e.target.value })}
								required
								className={cn(
									"flex h-[35px] w-full rounded-[32px] bg-transparent px-24 py-16 bg-blue-black",
									"border border-white text-white placeholder:text-white/40",
									"focus:outline-none focus:border-white/40 focus:ring-0",
									"font-mono text-[12px] transition-colors"
								)}
							/>
							<Button
								type="submit"
								className="bg-primary hover:bg-primary-hover text-blue-black w-full md:w-auto transition-all duration-300"
								disabled={isLoading}>
								{isLoading ? "Sending..." : "Send"}
								<ChevronRight className="h-[18px] font-thin ml-2 group-hover:translate-x-1" />
							</Button>
						</form>
						<ContactCard />
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default ContactForm;

{
	/* Contact Info Card */
}
const ContactCard = ({
	variant = "dark",
	contactCardBg,
	borderColor,
	text,
}: {
	variant?: "dark" | "light";
	contactCardBg?: string;
	borderColor?: string;
	text?: string;
}) => {
	return (
		<motion.div
			className={cn("p-6  backdrop-blur-sm", text)}
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay: 0.3 }}>
			<div className="space-y-5">
				{/* Email Contacts */}
				<div className="space-y-3 flex flex-row justify-between items-center">
					<ContactInfo title="Projects:" content="reach@zero-31.com" link="mailto:reach@zero-31.com" />

					<ContactInfo title="Brand & Marketing:" content="brand@zero-31.com" link="mailto:brand@zero-31.com" />

					<ContactInfo
						title="Management:"
						content="ss@zero-31.com"
						secondaryContent="kz@zero-31.com"
						link="mailto:ss@zero-31.com"
						secondaryLink="mailto:kz@zero-31.com"
					/>
				</div>

				{/* Address */}
				<div className="pt-6 border-current/20">
					<ContactInfo title="Office:" content="34 El-Safa Street, Sheikh Zayed, Giza, Egypt" type="one-line" />

					<ContactInfo
						title="Location:"
						content="View on Google Maps"
						link="https://maps.app.goo.gl/Kvf1GRWu9NuGowYf9"
						type="one-line"
					/>
				</div>
			</div>
		</motion.div>
	);
};
