"use client";
import { Volume2, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
	const [videoState, setVideoState] = useState<{ muted: boolean }>({
		muted: true,
	});
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play().catch(error => {
				console.log("Video autoplay failed:", error);
			});
		}
	}, []);

	const handleMuteToggle = () => {
		if (videoRef.current) {
			if (videoRef.current.muted) {
				videoRef.current.muted = false;
				setVideoState({ muted: false });
			} else {
				videoRef.current.muted = true;
				setVideoState({ muted: true });
			}
		}
	};

	return (
		<div className="relative w-full h-[40vh] md:h-[80vh]">
			{/* Video Background */}
			<video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
				<source src="/videos/zero31.webm" type="video/webm" />
			</video>
			{/* Mute Button */}
			<button
				className="absolute bottom-6 right-6 z-20 p-4 bg-white rounded-full shadow-md"
				onClick={handleMuteToggle}
				aria-label="Mute/Unmute Video">
				{videoState.muted ? <VolumeOff /> : <Volume2 />}
			</button>
			{/* Gradient Overlay */}
			<div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
			{/* Content */}
			{/* <motion.div
				className="absolute inset-0 z-10 flex items-center justify-center p-4"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut" }}>
				<div className="text-center text-white">
					<motion.h1
						className="font-title font-normal text-3xl md:text-4xl lg:text-5xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>
						Made by Architects
					</motion.h1>
				</div>
			</motion.div> */}
		</div>
	);
};

export default Hero;
