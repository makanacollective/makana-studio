import speakingurl from 'speakingurl';

export const validateSlug = (value: { current?: string; } | undefined) => {
    if (!value || !value?.current) return true;
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(value?.current)) { return 'Invalid slug: only lowercase letters, numbers, and single hyphens allowed (no leading, trailing, or consecutive hyphens)'; }
    return true;
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