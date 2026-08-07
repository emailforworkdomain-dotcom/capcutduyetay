import '@/assets/css/index.css';
import DisableDevtool from '@/components/disable-devtool';
import { buildSiteMetadata } from '@/lib/site-metadata';
import { Analytics } from '@vercel/analytics/next';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Roboto, Roboto_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import type { Viewport } from 'next';
config.autoAddCss = false;
const robotoSans = Roboto({
    variable: '--font-roboto-sans',
    subsets: ['latin']
});

const robotoMono = Roboto_Mono({
    variable: '--font-roboto-mono',
    subsets: ['latin']
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1
};

export const generateMetadata = async () => {
    const h = await headers();
    const host = h.get('x-forwarded-host') || h.get('host') || 'www.capcutcreatorteam.com';
    const proto = h.get('x-forwarded-proto') || 'https';
    const base = `${proto}://${host}`;

    return buildSiteMetadata(base);
};

const RootLayout = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang='en' data-scroll-behavior='smooth'>
            <body className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}>
                <DisableDevtool />
                {children}
                <Analytics />
            </body>
        </html>
    );
};

export default RootLayout;
