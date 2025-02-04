import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["zero-31.com"],
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
