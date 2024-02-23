/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
		serverActions: {
			allowedOrigins: ["http://localhost:3001", "http://localhost:3002"]
		},
	}
};

export default nextConfig;
