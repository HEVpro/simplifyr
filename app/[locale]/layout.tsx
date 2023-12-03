import '../globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {notFound} from "next/navigation";
import {NextIntlClientProvider, useLocale} from "next-intl";
import {ReactNode} from "react";
import {unstable_setRequestLocale} from 'next-intl/server';


const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Simplifyr',
    description: 'Decision calculator',
}

const locales = ['en', 'es'];

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params,}: {
    children: ReactNode;
    params: { locale: string };
}) {
    const locale = useLocale();

    // Show a 404 error if the user requests an unknown locale
    if (params.locale !== locale) {
        notFound();
    }
    unstable_setRequestLocale(locale);

    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }


    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                  {children}
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
