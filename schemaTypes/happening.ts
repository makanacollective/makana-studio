import { CalendarIcon } from '@sanity/icons';
import { defineField, defineType, SortOrderingItem } from 'sanity';
import { FSI, LANGUAGE_FIELD_NAME, PDI, } from '../lib/languageUtils';
import { RTLCompatibleInput } from '../components/RTLCompatibleInput';
import { DATE_FORMAT, renderIsoDate } from '../lib/dateUtils';
import { HOTSPOT_PREVIEWS } from '../lib/imageUtils';

export const HAPPENING_ICON = CalendarIcon;

export const HAPPENING_DATE_ORDERING: SortOrderingItem[] = [
    {
        field: 'startDate',
        direction: 'desc',
    },
    {
        field: 'startTime',
        direction: 'desc',
    },
    {
        field: 'title',
        direction: 'asc',
    },
];

const HAPPENING_TITLE_ORDERING: SortOrderingItem[] = [
    {
        field: 'title',
        direction: 'asc',
    },
    {
        field: 'startDate',
        direction: 'desc',
    },
    {
        field: 'startTime',
        direction: 'desc',
    },
];

export default defineType({
    name: 'happening',
    type: 'document',
    title: 'Happening',
    // TODO description
    icon: HAPPENING_ICON,
    fieldsets: [
        {
            name: 'dateTime',
            title: 'Date & Time',
            // TODO description
            options: {
                columns: 2,
            },
        },
    ],
    fields: [
        defineField({
            name: LANGUAGE_FIELD_NAME,
            type: LANGUAGE_FIELD_NAME,
        }),
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            // TODO description
            // TODO validation
            components: {
                input: RTLCompatibleInput,
            },
            options: {
                // @ts-ignore
                inputDirection: [LANGUAGE_FIELD_NAME],
            },
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            // TODO description
            // TODO validation
            options: {
                source: 'title',
                // TODO isUnique
                // TODO slugify
                // documentInternationalization: {
                //     exclude: true,
                // },
            },
        }),
        defineField({
            name: 'startDate',
            type: 'date',
            title: 'Date',
            description: 'The local date when the happening occurs',
            // TODO validation
            options: {
                dateFormat: DATE_FORMAT,
            },
            fieldset: 'dateTime',
        }),
        defineField({
            name: 'startTime',
            type: 'string',
            title: 'Time',
            description: 'The local time when the happening occurs (24-hrs)',
            validation: (Rule) => Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { // TODO improve
                name: '24-hour time format (HH:mm)',
                invert: false,
            }),
            fieldset: 'dateTime',
            placeholder: 'e.g. 19:30',
        }),
        defineField({
            name: 'timezone',
            type: 'string',
            title: 'Time Zone',
            description: 'The local time zone where the happening occurs',
            // TODO validation
            options: {
                list: [
                    { title: 'New York (EST/EDT)', value: 'America/New_York' },
                    { title: 'London (GMT/BST)', value: 'Europe/London' },
                    { title: 'Amman (Jordan)', value: 'Asia/Amman' },
                    // TODO make dynamic
                ],
            },
            fieldset: 'dateTime',
        }),
        defineField({
            name: 'location',
            type: 'string',
            title: 'Location',
            // TODO description
            // TODO validation
            components: {
                input: RTLCompatibleInput,
            },
            options: {
                // @ts-ignore
                inputDirection: [LANGUAGE_FIELD_NAME],
            },
        }),
        defineField({
            name: 'summary',
            type: 'text',
            title: 'Summary',
            rows: 3,
            // TODO description
            // TODO validation
            components: {
                input: RTLCompatibleInput,
            },
            options: {
                // @ts-ignore
                inputDirection: [LANGUAGE_FIELD_NAME],
            },
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            title: 'Cover Image',
            // TODO description
            // TODO validation
            options: {
                hotspot: {
                    previews: HOTSPOT_PREVIEWS,
                },
                storeOriginalFilename: false,
            },
        }),
        defineField({
            name: 'content',
            type: 'pageBuilder',
            title: 'Content',
            // TODO description
            // TODO validation
            options: {
                // documentInternationalization: {
                //     exclude: true,
                // },
            },
        }),
    ],
    orderings: [
        {
            name: 'dateDesc',
            title: 'date',
            by: HAPPENING_DATE_ORDERING,
        },
        {
            name: 'titleAsc',
            title: 'title',
            by: HAPPENING_TITLE_ORDERING,
        },
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
                title: title ? `${FSI}${title}${PDI}` : undefined,
                subtitle: [renderIsoDate(startDate, { mode: 'full', withFallback: true }), startTime, location].filter(Boolean)?.join(', '),
                description: summary ? `${FSI}${summary}${PDI}` : undefined,
                media: mainImage,
            };
        },
    },
});