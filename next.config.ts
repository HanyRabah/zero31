import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		// Disable memory-intensive features
		optimizeCss: false,
	},
	onDemandEntries: {
		maxInactiveAge: 25 * 1000,
		pagesBufferLength: 2,
	},
	// Set lower memory limit for image optimization
	images: {
		minimumCacheTTL: 60,
		deviceSizes: [640, 750, 828, 1080, 1200],
		imageSizes: [16, 32, 48, 64, 96, 128, 256],
	},
	webpack: (config, { isServer }) => {
		// Optimize webpack settings
		config.optimization = {
			...config.optimization,
			minimize: false,
		};
		return config;
	},
};

export default nextConfig;
