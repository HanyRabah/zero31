"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Add form submission logic here
	};

	const { background, text } = variantColor[variant];

	return (
		<section className={background}>
			<div className="container mx-auto py-[40px] px-[48px] md:py-80 md:px-96">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* Left side - Image */}
					<div className="relative aspect-square mb-[60px] md:mb-0">
						<Image src="/images/contact-form-image.jpg" layout="fill" objectFit="contain" alt="Contact us" />
					</div>

					{/* Right side - Form */}
					<div className={`${text} w-320`}>
						<h2 className="text-3xl font-title mb-6">Let us talk</h2>
						<p className="mb-32 text-xs">
							We are always happy to hear of conversation with people. Let us hear from you and we get in touch with you
							very soon.
						</p>

						<form onSubmit={handleSubmit}>
							<div className="space-y-24">
								<Input
									type="text"
									placeholder="Name"
									value={formData.name}
									onChange={e => setFormData({ ...formData, name: e.target.value })}
								/>
								<Input
									type="email"
									placeholder="Email"
									value={formData.email}
									onChange={e => setFormData({ ...formData, email: e.target.value })}
								/>
								<Input
									type="tel"
									placeholder="Phone"
									value={formData.phone}
									onChange={e => setFormData({ ...formData, phone: e.target.value })}
								/>
								<Button type="submit" className="bg-primary hover:bg-primary-hover text-blue-black">
									Send <ChevronRight className="h-[18px] font-thin  ml-2" />
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactForm;
