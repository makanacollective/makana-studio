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

let cachedDefaultLanguage = undefined;

export const DEFAULT_LANGUAGE = (() => {
    if (cachedDefaultLanguage) return cachedDefaultLanguage;
    const entry = SUPPORTED_LANGUAGES.find((lang) => lang.default);
    if (!entry) throw new Error('No default language defined in SUPPORTED_LANGUAGES');
    cachedDefaultLanguage = entry;
    return cachedDefaultLanguage;
})();

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

export const filterLocalisedStringByLangId = (
    localisedString: Record<string, string> | undefined,
    langId: string | undefined,
): Record<string, string> | undefined => {
    if (!localisedString || !langId) {
        return localisedString;
    }
    return localisedString[langId]
        ? { [langId]: localisedString[langId] }
        : localisedString;
};