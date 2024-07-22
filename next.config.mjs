/** @type {import('next').NextConfig} */
import withNextIntl from "next-intl/plugin";

const nextConfig = {
  output: "standalone", // Docker container optimization
};

export default withNextIntl("./src/shared/lib/i18n.ts")(nextConfig);
