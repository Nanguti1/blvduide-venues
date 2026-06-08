import type { HTMLAttributes } from 'react';

const allowedTags = new Set([
    'A',
    'B',
    'BR',
    'EM',
    'I',
    'LI',
    'OL',
    'P',
    'STRONG',
    'U',
    'UL',
]);

const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function isSafeHref(href: string) {
    if (href.startsWith('#') || href.startsWith('/')) {
        return true;
    }

    try {
        return allowedProtocols.includes(new URL(href).protocol);
    } catch {
        return false;
    }
}

export function sanitizeHtml(html?: string | null) {
    if (!html) {
        return '';
    }

    if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
        return escapeHtml(html);
    }

    const document = new DOMParser().parseFromString(html, 'text/html');

    document.body.querySelectorAll('*').forEach((element) => {
        if (!allowedTags.has(element.tagName)) {
            element.replaceWith(...Array.from(element.childNodes));

            return;
        }

        const rawHref =
            element.tagName === 'A' ? (element.getAttribute('href') ?? '') : '';

        Array.from(element.attributes).forEach((attribute) => {
            element.removeAttribute(attribute.name);
        });

        if (element.tagName === 'A') {
            if (rawHref && isSafeHref(rawHref)) {
                element.setAttribute('href', rawHref);
                element.setAttribute('target', '_blank');
                element.setAttribute('rel', 'noopener noreferrer');
            }
        }
    });

    return document.body.innerHTML;
}

export function htmlToPlainText(html?: string | null) {
    if (!html) {
        return '';
    }

    if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
        return html
            .replace(/<[^>]*>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    return (
        new DOMParser()
            .parseFromString(sanitizeHtml(html), 'text/html')
            .body.textContent?.replace(/\s+/g, ' ')
            .trim() ?? ''
    );
}

export function HtmlContent({
    html,
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement> & { html?: string | null }) {
    return (
        <div
            {...props}
            className={`venue-html-content ${className}`}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
        />
    );
}
