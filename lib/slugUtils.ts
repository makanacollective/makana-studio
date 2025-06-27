import speakingurl from 'speakingurl';

export const validateSlug = (value?: { current?: string; }) => {
    if (!value || !value?.current) return true;
    const slug = value.current;
    const issues: string[] = [];
    if (/[^a-z0-9-]/.test(slug)) {
        issues.push('Use only lowercase letters, numbers, and hyphens (no uppercase letters, special characters, or spaces)');
    }
    if (/^-|-$/.test(slug)) {
        issues.push('Slug must not start or end with a hyphen');
    }
    if (/--/.test(slug)) {
        issues.push('Slug must not contain consecutive hyphens');
    }
    return issues.length > 0 ? `${issues.join('. ')}${issues.length > 1 ? '.' : ''}` : true;
};

export const customSlugify = (input: string) => {
    const slug = speakingurl(input, {
        truncate: 200,
        symbols: false,
        custom: {
            '_': '-',
        },
    });
    return slug;
};