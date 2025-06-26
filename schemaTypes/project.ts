import { StarIcon } from '@sanity/icons';
import { defineField, defineType, SortOrderingItem } from 'sanity';
import { descriptions } from '../lib/descriptionUtils';
import { FSI, LANGUAGE_FIELD_NAME, PDI } from '../lib/languageUtils';
import { RTLCompatibleInput } from '../components/RTLCompatibleInput';
import { customSlugify, validateSlug } from '../lib/slugUtils';
import { DATE_FORMAT, renderIsoDate } from '../lib/dateTimeUtils';
import { TEXT_FIELD_ROWS } from '../lib/miscUtils';
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
    description: descriptions.document('a single-language version of a project page'),
    icon: PROJECT_ICON,
    fields: [
        // TODO add note about language
        defineField({
            name: LANGUAGE_FIELD_NAME,
            type: LANGUAGE_FIELD_NAME,
        }),
        // TODO signifiy whether translations for this document exist
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            description: descriptions.title(true, 'project'),
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
            description: descriptions.slug(true, 'project'),
            validation: (Rule) => Rule.custom(validateSlug),
            options: {
                source: 'title',
                slugify: customSlugify,
            },
        }),
        defineField({
            name: 'date',
            type: 'date',
            title: 'Date',
            description: descriptions.date('project'),
            options: {
                dateFormat: DATE_FORMAT,
            },
        }),
        defineField({
            name: 'summary',
            type: 'text',
            title: 'Summary',
            rows: TEXT_FIELD_ROWS,
            description: descriptions.summary(true, 'project'),
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
            description: descriptions.mainImage('project'),
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
            description: descriptions.content(true, 'project'),
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