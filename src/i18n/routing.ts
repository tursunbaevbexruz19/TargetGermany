import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'de', 'uz', 'ru', 'es', 'ar', 'zh', 'tr', 'ko'],
  defaultLocale: 'en',
  localeDetection: false // Disable auto-language detection to force English
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
