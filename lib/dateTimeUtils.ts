import { getTimeZones } from '@vvo/tzdb';

export const DATE_FORMAT = 'DD_MM_YYYY';

export const TIME_SEPARATOR = '∶';

export const renderIsoDate = (date: string, {
    mode = 'full',
    withFallback = false,
}: {
    mode?: 'full' | 'yearAndMonth' | 'yearOnly';
    withFallback?: boolean;
} = {}) => {
    if (!date && !withFallback) { return; }
    const isValidIsoDate = /^(\d{4})-(\d{2})-(\d{2})$/.test(date);
    const safeDate = isValidIsoDate ? date : (withFallback ? '0000-00-00' : undefined);
    if (!safeDate) { return; }
    const [year, month, day] = safeDate.split('-');
    switch (mode) {
        case 'full': return `${day}_${month}_${year}`;
        case 'yearAndMonth': return `${month}_${year}`;
        case 'yearOnly': return year;
        default: return;
    }
};

const TIME_ZONES = getTimeZones();

export const DEFAULT_TIME_ZONE = 'Asia/Amman';

const formatGmtOffset = (offsetInMinutes: number) => {
    const offsetHours = Math.floor(offsetInMinutes / 60);
    const offsetMinutes = Math.abs(offsetInMinutes % 60);
    const sign = offsetHours >= 0 ? '+' : '-';
    const padded = (n: number) => String(Math.abs(n)).padStart(2, '0');
    return `GMT${sign}${padded(offsetHours)}:${padded(offsetMinutes)}`;
};

export const formattedTimeZones = TIME_ZONES
    .map((tz) => {
        const gmtOffset = formatGmtOffset(tz.currentTimeOffsetInMinutes);
        const title = `(${gmtOffset}) ${tz.name}`;
        return {
            title: title,
            value: tz.name,
        };
    }).sort((a, b) => {
        const titleA = (a.title).toLowerCase();
        const titleB = (b.title).toLowerCase();
        return titleA.localeCompare(titleB, 'en');
    });