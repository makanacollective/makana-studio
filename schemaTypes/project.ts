import { StarIcon } from '@sanity/icons';
import { defineField, defineType, SortOrderingItem } from 'sanity';
import { FSI, LANGUAGE_FIELD_NAME, PDI } from '../lib/languageUtils';
import { RTLCompatibleInput } from '../components/RTLCompatibleInput';
import { DATE_FORMAT, renderIsoDate } from '../lib/dateUtils';
import { HOTSPOT_PREVIEWS } from '../lib/imageUtils';
import { createPageBuilder } from './pageBuilder';

export const PROJECT_ICON = StarIcon;

export const PROJECT_DATE_ORDERING: SortOrderingItem[] = [
    {
        field: 'date',
        direction: 'desc',
    },
    {
        field: 'title',
        direction: 'asc',
    },
];

export default defineType({
    name: 'project',
    type: 'document',
    title: 'Project',
    // TODO description
    icon: PROJECT_ICON,
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
                // documentInternationalization: {
                //     exclude: true,
                // },
            },
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
        defineField({
            name: 'summary',
            type: 'text',
            title: 'Summary',
            rows: 4,
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
        createPageBuilder({
            name: 'content',
            title: 'Content',
            inputDirection: [LANGUAGE_FIELD_NAME],
        }),
    ],
    orderings: [
        {
            name: 'dateDesc',
            title: 'date',
            by: PROJECT_DATE_ORDERING,
        },
        {
            name: 'titleAsc',
            title: 'title',
            by: [
                {
                    field: 'title',
                    direction: 'asc',
                },
                {
                    field: 'date',
                    direction: 'desc',
                },
            ],
        },
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
                title: title ? `${FSI}${title}${PDI}` : undefined,
                subtitle: renderIsoDate(date, { mode: 'yearOnly', withFallback: true }),
                description: `${FSI}${summary || 'No summary'}${PDI}`,
                media: mainImage,
            };
        },
    },
});