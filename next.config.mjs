/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  basePath: "/my-portfolio", // Wajib: ganti dengan nama repository kamu di GitHub
  assetPrefix: "/my-portfolio/", // Kadang dibutuhkan agar asset ter-load dengan benar
};

export default nextConfig;