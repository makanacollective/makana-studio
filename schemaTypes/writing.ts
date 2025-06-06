import { BookIcon } from '@sanity/icons';
import { defineField, defineType, SortOrderingItem, } from 'sanity';
import { FSI, LANGUAGE_FIELD_NAME, PDI } from '../lib/languageUtils';
import { RTLCompatibleInput } from '../components/RTLCompatibleInput';
import { DATE_FORMAT, renderIsoDate } from '../lib/dateUtils';
import { HOTSPOT_PREVIEWS } from '../lib/imageUtils';

export const WRITING_ICON = BookIcon;

export const WRITING_TITLE_ORDERING: SortOrderingItem[] = [
    {
        field: 'title',
        direction: 'asc',
    },
    {
        field: 'date',
        direction: 'desc',
    },
];

const WRITING_DATE_ORDERING: SortOrderingItem[] = [
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
    name: 'writing',
    type: 'document',
    title: 'Writing',
    // TODO description
    icon: WRITING_ICON,
    fields: [
        defineField({
            name: LANGUAGE_FIELD_NAME,
            type: LANGUAGE_FIELD_NAME,
        }),
        // defineField({
        //     name: 'ignore',
        //     type: 'string',
        //     title: 'Translations',
        //     // description
        //     readOnly: true,
        //     components: {
        //         input: ComputedReferenceList,
        //     },
        //     options: {
        //         // @ts-ignore
        //         computedReferenceQuery: (`array::unique(*[_type == 'translation.metadata' && references($id)].translations[defined(value) && value->_id != $id].value->{_id, _type})`),
        //         computedReferenceParams: {
        //             id: ['_id'],
        //         },
        //     },
        // }),
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
            options: {
                // documentInternationalization: {
                //     exclude: true,
                // },
            },
        }),
    ],
    orderings: [
        {
            name: 'titleAsc',
            title: 'title',
            by: WRITING_TITLE_ORDERING,
        },
        {
            name: 'dateDesc',
            title: 'date',
            by: WRITING_DATE_ORDERING,
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
                subtitle: renderIsoDate(date, { mode: 'full', withFallback: true }),
                description: summary ? `${FSI}${summary}${PDI}` : undefined,
                media: mainImage,
            };
        },
    },
});