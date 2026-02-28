import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(de|en|uz|ru|fr|es|ar|zh|tr|ko)/:path*']
};
