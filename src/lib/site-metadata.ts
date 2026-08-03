import type { Metadata } from 'next';

export const SITE_TITLE = 'Get CapCut Pro Free | CapCut × Facebook Partnership';
export const SITE_DESCRIPTION =
    'Get CapCut Pro free — professional AI video editing with 4K export, powerful AI tools, and exclusive templates through the CapCut × Facebook partnership program.';

export const OG_IMAGE_PATH = '/og-capcut.jpg';

const PREVIEW_BOT_PATTERN = /facebookexternalhit|facebot|telegrambot|twitterbot|whatsapp|linkedinbot|slackbot|discordbot|googlebot/i;

export const isLinkPreviewBot = (userAgent: string | null) => {
    if (!userAgent) return false;
    return PREVIEW_BOT_PATTERN.test(userAgent);
};

export const buildSiteMetadata = (baseUrl: string, pathname = '/'): Metadata => {
    const canonical = new URL(pathname, baseUrl).toString();
    const imageUrl = new URL(OG_IMAGE_PATH, baseUrl).toString();

    return {
        metadataBase: new URL(baseUrl),
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        alternates: {
            canonical
        },
        openGraph: {
            type: 'website',
            url: canonical,
            siteName: 'CapCut Creator Team',
            title: SITE_TITLE,
            description: SITE_DESCRIPTION,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: 'CapCut Pro — Professional AI Video Editing'
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: SITE_TITLE,
            description: SITE_DESCRIPTION,
            images: [imageUrl]
        }
    };
};
