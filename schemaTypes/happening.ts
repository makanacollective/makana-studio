import { CalendarIcon } from '@sanity/icons';
import { defineField, defineType, SortOrderingItem } from 'sanity';
import { DEFAULT_LANGUAGE, renderLocalisedString, SUPPORTED_LANGUAGES } from '../lib/languageUtils';
import { createLocalisedSlug } from './localisedSlug';
import { DATE_FORMAT, renderIsoDate } from '../lib/dateUtils';

export const HAPPENING_ICON = CalendarIcon;

export const HAPPENING_DATE_ORDERING: SortOrderingItem[] = [
    {
        field: 'date',
        direction: 'desc',
    },
    {
        field: `title.${DEFAULT_LANGUAGE?.id}`,
        direction: 'asc',
    },
];

export default defineType({
    name: 'happening',
    type: 'document',
    title: 'Happening',
    // TODO description
    icon: HAPPENING_ICON,
    fields: [
        defineField({
            name: 'title',
            type: 'localisedString',
            title: 'Title',
            // TODO description
            // TODO validation
        }),
        createLocalisedSlug({
            name: 'slug',
            title: 'Slug',
            sourceBase: 'title',
        }),
        defineField({
            name: 'date',
            type: 'date',
            title: 'Date',
            // TODO description
            // TODO validation
            options: {
                dateFormat: DATE_FORMAT,
            },
        }),
    ],
    orderings: [
        {
            name: 'dateDesc',
            title: 'date',
            by: HAPPENING_DATE_ORDERING,
        },
        ...SUPPORTED_LANGUAGES.map((lang) => {
            return {
                name: `titleAsc_${lang.id}`,
                title: `title (${lang.title})`,
                by: [
                    {
                        field: `title.${lang.id}`,
                        direction: 'asc' as const,
                    },
                ],
            };
        }),
    ],
    preview: {
        select: {
            title: 'title',
            date: 'date',
        },
        prepare(selection) {
            const {
                title,
                date,
            } = selection;
            return {
                title: renderLocalisedString(title),
                subtitle: renderIsoDate(date, { mode: 'full', withFallback: true }),
                // TODO description
                // TODO media
            };
        },
    },
});