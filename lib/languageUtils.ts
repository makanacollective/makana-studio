export const SUPPORTED_LANGUAGES = [
    {
        id: 'ar',
        title: 'Arabic',
        dir: 'rtl',
    },
    {
        id: 'en',
        title: 'English',
        dir: 'ltr',
        default: true,
    },
];

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.find((lang) => lang.default);

export const FSI = '\u2068';

export const PDI = '\u2069';

export const SEPARATOR = ' \u00B7 ';

export const renderLocalisedString = (
    localisedString: Record<string, string> = {},
    maxLength = 100
): string | undefined => {
    return Object.entries(localisedString ?? {})
        ?.filter(([key, value]) => !key.startsWith('_') && Boolean(value))
        ?.map(([, value]) => {
            const truncated = value.length > maxLength ? value.slice(0, maxLength) + '…' : value;
            return (`${FSI}${truncated}${PDI}`);
        })
        ?.join(SEPARATOR) || undefined;
};