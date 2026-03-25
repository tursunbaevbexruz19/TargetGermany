import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import CookieConsentMount from "@/components/CookieConsentMount";

const isValidLocale = (value: string): value is (typeof routing.locales)[number] =>
    routing.locales.includes(value as (typeof routing.locales)[number]);

export const metadata: Metadata = {
    title: "Target International School",
    description: "Target International School German Branch - Excellence in Education. Creating future leaders.",
    icons: {
        icon: "/favicon.png",
        shortcut: "/favicon.png",
        apple: "/favicon.png",
    },
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className="min-h-screen bg-[#0a0f1e] font-[family-name:var(--font-inter)] text-white antialiased">
                <NextIntlClientProvider messages={messages}>
                    {children}
                    <CookieConsentMount />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
