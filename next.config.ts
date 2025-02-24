import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ protocol: "https", hostname: "zero-31.com", pathname: "/**" },
			{ protocol: "https", hostname: "new.zero-31.com", pathname: "/**" },
			{ protocol: "https", hostname: "l6npf9rjvqqf6owa.public.blob.vercel-storage.com", pathname: "/**" },
		],
	},
	// Add static file serving configuration
	async rewrites() {
		return [
			{
				source: "/uploads/:path*",
				destination: "/public/uploads/:path*",
			},
		];
	},
};

export default nextConfig;
