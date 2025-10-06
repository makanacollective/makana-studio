import { UserIcon } from '@sanity/icons';
import { defineField, defineType, SortOrderingItem } from 'sanity';
import { descriptions } from '../lib/descriptionUtils';
import { createLocalisedSlug } from './localisedSlug';
import { HOTSPOT_PREVIEWS } from '../lib/imageUtils';
import { DEFAULT_LANGUAGE, FSI, PDI, renderLocalisedString, SUPPORTED_LANGUAGES } from '../lib/languageUtils';
import { createPageBuilder } from './pageBuilder';

export const COUNTER_MAP_INITIATIVE_ICON = UserIcon;

export const INITIATIVE_DEFAULT_TITLE_ORDERING: SortOrderingItem[] = [
    {
        field: `title.${DEFAULT_LANGUAGE?.id}`,
        direction: 'asc',
    },
];

export default defineType({
    name: 'specialProject_counterMap_initiative',
    type: 'document',
    title: 'Initiative',
    description: descriptions.document('all localised versions of a counter-map initiative'),
    icon: COUNTER_MAP_INITIATIVE_ICON,
    fields: [
        defineField({
            name: 'title',
            type: 'localisedString',
            title: 'Title',
            description: descriptions.title('counter-map initiative'),
        }),
        createLocalisedSlug({
            name: 'slug',
            title: 'Slug',
            description: descriptions.slug('counter-map initiative'),
            sourceBase: 'title',
        }),
        // no date
        defineField({
            name: 'summary',
            type: 'localisedText',
            title: 'Summary',
            description: descriptions.summary('counter-map initiative'),
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            title: 'Cover Image',
            description: descriptions.mainImage('counter-map initiative'),
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
            description: descriptions.content('counter-map initiative'),
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
        ...SUPPORTED_LANGUAGES.map((lang) => {
            return {
                name: `titleAsc_${lang.id}`,
                title: `title (${lang.title})`,
                by: [
                    {
                        field: `title.${lang.id}`,
                        direction: 'asc',
                    },
                ] as SortOrderingItem[],
            };
        }),
    ],
    preview: {
        select: {
            title: 'title',
            summary: 'summary',
            mainImage: 'mainImage',
        },
        prepare(selection) {
            const {
                title,
                summary,
                mainImage,
            } = selection;
            return {
                title: renderLocalisedString(title),
                description: `${FSI}${renderLocalisedString(summary, 50) || 'No summary'}${PDI}`,
                media: mainImage,
            };
        },
    },
});