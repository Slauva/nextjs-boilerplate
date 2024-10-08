import withNextIntl from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Docker container optimization
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
};

export default withNextIntl("./src/shared/lib/i18n.ts")(nextConfig);
