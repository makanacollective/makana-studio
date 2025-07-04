import { BookIcon } from '@sanity/icons';
import { defineField, defineType, SortOrderingItem } from 'sanity';
import { DEFAULT_LANGUAGE, FSI, PDI, renderLocalisedString, SUPPORTED_LANGUAGES } from '../lib/languageUtils';
import { descriptions } from '../lib/descriptionUtils';
import { createLocalisedSlug } from './localisedSlug';
import { DATE_FORMAT, renderIsoDate } from '../lib/dateTimeUtils';
import { HOTSPOT_PREVIEWS } from '../lib/imageUtils';
import { createPageBuilder } from './pageBuilder';

export const WRITING_ICON = BookIcon;

export const WRITING_DATE_ORDERING: SortOrderingItem[] = [
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
    name: 'writing',
    type: 'document',
    title: 'Writing',
    description: descriptions.document('all language versions of a writing, such as an article, essay, or other publication'),
    icon: WRITING_ICON,
    fields: [
        defineField({
            name: 'title',
            type: 'localisedString',
            title: 'Title',
            description: descriptions.title('writing'),
        }),
        createLocalisedSlug({
            name: 'slug',
            title: 'Slug',
            description: descriptions.slug('writing'),
            sourceBase: 'title',
        }),
        defineField({
            name: 'date',
            type: 'date',
            title: 'Date',
            description: descriptions.date('writing'),
            options: {
                dateFormat: DATE_FORMAT,
            },
        }),
        defineField({
            name: 'summary',
            type: 'localisedText',
            title: 'Summary',
            description: descriptions.summary('writing'),
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            title: 'Cover Image',
            description: descriptions.mainImage('writing'),
            options: {
                hotspot: {
                    previews: HOTSPOT_PREVIEWS,
                },
                storeOriginalFilename: false,
            },
        }),
        defineField({
            name: 'content',
            type: 'object',
            title: 'Content',
            description: descriptions.content('writing'),
            fields: SUPPORTED_LANGUAGES.map((lang) => {
                return createPageBuilder({
                    name: lang.id,
                    title: lang.title,
                    inputDirection: lang.dir,
                });
            }),
        }),
    ],
    orderings: [
        {
            name: 'dateDesc',
            title: 'date',
            by: WRITING_DATE_ORDERING,
        },
        ...SUPPORTED_LANGUAGES.map((lang) => {
            return {
                name: `titleAsc_${lang.id}`,
                title: `title (${lang.title})`,
                by: [
                    {
                        field: `title.${lang.id}`,
                        direction: 'asc',
                    },
                    {
                        field: `date`,
                        direction: 'desc',
                    },
                ] as SortOrderingItem[],
            };
        }),
    ],
    preview: {
        select: {
            title: 'title',
            date: 'date',
            summary: 'summary',
            mainImage: 'mainImage',
        },
        prepare(selection) {
            const {
                title,
                date,
                summary,
                mainImage,
            } = selection;
            return {
                title: renderLocalisedString(title),
                subtitle: renderIsoDate(date, { withFallback: true }),
                description: `${FSI}${renderLocalisedString(summary, 50) || 'No summary'}${PDI}`,
                media: mainImage,
            };
        },
    },
});