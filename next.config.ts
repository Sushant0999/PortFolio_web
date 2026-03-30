import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Required to deploy static HTML to GitHub Pages
  images: {
    unoptimized: true, // Required because GitHub Pages lacks an image optimization server
  },
  // IMPORTANT:
  // If your GitHub repository is NOT named exactly "PortFolio_web", 
  // you MUST change this basePath and assetPrefix to match your actual repository name!
  // If you are deploying to "Sushant0999.github.io" (a User Page), completely DELETE these two lines.
  basePath: "/PortFolio_web",
  assetPrefix: "/PortFolio_web/",
};

export default nextConfig;
