"use client";
import { useEffect, useRef } from "react";

const Quote = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play();
		}
	}, []);

	return (
		<section className="p-40 md:p-60 bg-off-white">
			<div className="container mx-auto px-4">
				<blockquote className="text-[30px] leading-[30px] md:text-[60px] md:leading-[60px] font-title max-w-[1200px] mx-auto text-blue-black font-medium tracking-tighter">
					We think of design is a human instinct to make things better, and enjoy the good things in life.
				</blockquote>
			</div>
		</section>
	);
};

export default Quote;
