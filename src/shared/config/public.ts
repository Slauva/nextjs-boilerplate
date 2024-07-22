import { createSharedPathnamesNavigation } from "next-intl/navigation";

export type Locale = "ru"; //"ru" | "en";
export const locales: Locale[] = ["ru"];
export const defaultLocale: Locale = "ru";

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix: "never" });
