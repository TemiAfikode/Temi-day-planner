/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  env: {
    NEXT_PROD_API_URL: "https://temi-day-planner-api.herokuapp.com/api",
    NEXT_LOCAL_API_URL: "http://localhost:9000/api",
  },
  distDir: "build",
};

