import { CalendarIcon } from '@sanity/icons';
import { defineField, defineType, SortOrderingItem } from 'sanity';
import { DEFAULT_LANGUAGE, FSI, PDI, renderLocalisedString, SEPARATOR, SUPPORTED_LANGUAGES, } from '../lib/languageUtils';
import { descriptions } from '../lib/descriptionUtils';
import { createLocalisedSlug } from './localisedSlug';
import { DATE_FORMAT, renderIsoDate } from '../lib/dateUtils';
import { HOTSPOT_PREVIEWS } from '../lib/imageUtils';
import { createPageBuilder } from './pageBuilder';

export const HAPPENING_ICON = CalendarIcon;

export const HAPPENING_DATE_ORDERING: SortOrderingItem[] = [
    {
        field: 'startDate',
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
    description: descriptions.document('all language versions of a happening, such as an event or programme'),
    icon: HAPPENING_ICON,
    fields: [
        // TODO add note about language
        defineField({
            name: 'title',
            type: 'localisedString',
            title: 'Title',
            description: descriptions.title(false, 'happening'),
        }),
        createLocalisedSlug({
            name: 'slug',
            title: 'Slug',
            description: descriptions.slug(false, 'happening'),
            sourceBase: 'title',
        }),
        defineField({ // TODO improve
            name: 'startDate',
            type: 'date',
            title: 'Date',
            description: descriptions.startDate('happening'),
            // TODO validation
            options: {
                dateFormat: DATE_FORMAT,
            },
        }),
        defineField({ // TODO improve
            name: 'startTime',
            type: 'string',
            title: 'Time',
            description: descriptions.startDate('happening'),
            validation: (Rule) => Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
                name: '24-hour time format (HH:mm)',
                invert: false,
            }),
            placeholder: 'e.g. 19:30',
        }),
        defineField({ // TODO improve
            name: 'timezone',
            type: 'string',
            title: 'Time Zone',
            description: descriptions.timezone('happening'),
            // TODO validation
            // TODO initialValue
            options: {
                list: [
                    { title: 'New York (EST/EDT)', value: 'America/New_York' },
                    { title: 'London (GMT/BST)', value: 'Europe/London' },
                    { title: 'Amman (Jordan)', value: 'Asia/Amman' },
                ],
            },
        }),
        defineField({
            name: 'location',
            type: 'localisedString',
            title: 'Location',
            description: descriptions.location('happening'),
        }),
        defineField({
            name: 'summary',
            type: 'localisedText',
            title: 'Summary',
            description: descriptions.summary(false, 'happening'),
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            title: 'Cover Image',
            description: descriptions.mainImage('happening'),
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
            description: descriptions.content(false, 'happening'),
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
            by: HAPPENING_DATE_ORDERING,
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
                        field: 'startDate',
                        direction: 'desc',
                    },
                ] as SortOrderingItem[],
            };
        }),
    ],
    preview: {
        select: {
            title: 'title',
            startDate: 'startDate',
            startTime: 'startTime',
            location: 'location',
            summary: 'summary',
            mainImage: 'mainImage',
        },
        prepare(selection) {
            const {
                title,
                startDate,
                startTime,
                location,
                summary,
                mainImage,
            } = selection;
            return {
                title: renderLocalisedString(title),
                subtitle: [renderIsoDate(startDate, { mode: 'full', withFallback: true }), startTime, renderLocalisedString(location)].filter(Boolean)?.join(SEPARATOR),
                description: `${FSI}${renderLocalisedString(summary, 50) || 'No summary'}${PDI}`,
                media: mainImage,
            };
        },
    },
});