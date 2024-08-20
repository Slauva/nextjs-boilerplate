import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import type { IntlConfig } from "use-intl/core";

import { locales } from "../config/i18n";

export default getRequestConfig(
  async ({ locale }): Promise<Omit<IntlConfig, "locale">> => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    if (!locales.includes(locale as any)) notFound();

    return {
      messages: (await import(`/public/locales/${locale}.json`)).default,
      timeZone: "Europe/Moscow",
    };
  },
);
