/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
		serverActions: {
			allowedOrigins: ["http://localhost:3001", "http://localhost:3002", "https://admin-assignment-beryl.vercel.app", "https://dashboard-homepage-assignment.vercel.app"]
		},
	}
};

export default nextConfig;
