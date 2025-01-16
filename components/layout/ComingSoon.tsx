import Image from "next/image";

export default function ComingSoonPage() {
	return (
		<main className="relative min-h-screen flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="relative w-[800px] h-[400px]">
					<Image
						src="/big-logo.svg"
						alt="Z31 Background"
						fill
						className="object-contain select-none pointer-events-none"
						priority
					/>
				</div>
			</div>

			<div className="relative z-10 text-center  px-24 ">
				<h1 className="text-[48px] font-title mb-2 font-medium">Coming soon.</h1>
				<p className="text-[16px] leading-[24px] text-gray-600">
					Get ready! We're working hard on something amazing and can't wait to share it with you.
				</p>
			</div>
		</main>
	);
}
