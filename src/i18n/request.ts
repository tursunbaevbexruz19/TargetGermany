import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const isValidLocale = (value: string): value is (typeof routing.locales)[number] =>
    routing.locales.includes(value as (typeof routing.locales)[number]);

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !isValidLocale(locale)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
    };
});
