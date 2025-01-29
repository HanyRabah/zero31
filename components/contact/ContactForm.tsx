"use client";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
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
	},
	light: {
		background: "bg-transparent",
		text: "text-black",
	},
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

	const { background, text } = variantColor[variant];

	return (
		<section className={background}>
			<div className="container mx-auto py-[60px] px-[40px] md:py-80 md:px-96">
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 gap-32"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}>
					{/* Left side - Image */}
					<motion.div
						className="relative aspect-square mb-[40px] md:mb-0 overflow-hidden "
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.6, ease: "easeOut" }}>
						<Image
							className="md:px-60"
							src="/images/contact-form-image.jpg"
							layout="fill"
							objectFit="cover"
							alt="Contact us"
						/>
					</motion.div>

					{/* Right side - Form */}
					<motion.div
						className={`${text} w-full md:w-320`}
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

						<form onSubmit={handleSubmit} className="space-y-24">
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
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default ContactForm;
