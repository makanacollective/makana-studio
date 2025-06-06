import { PlugIcon, StarIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType, SortOrderingItem } from "sanity";
import { DEFAULT_LANGUAGE, renderLocalisedString, SUPPORTED_LANGUAGES } from "../lib/languageUtils";
import { createLocalisedSlug } from './localisedSlug';

export const RESOURCE_LIST_ICON = PlugIcon;

export const RESOURCE_LIST_TITLE_ORDERING: SortOrderingItem[] = [
    {
        field: `title.${DEFAULT_LANGUAGE?.id}`,
        direction: 'asc',
    },
];

export default defineType({
    name: 'resourceList',
    type: 'document',
    title: 'Resource List',
    // TODO description
    icon: RESOURCE_LIST_ICON,
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
            name: 'resourceItems',
            type: 'array',
            title: 'Resource Items',
            // TODO description
            // TODO validation
            of: [
                defineArrayMember({
                    name: 'resourceItem',
                    type: 'object',
                    title: 'Resource Item',
                    icon: StarIcon,
                    fields: [
                        defineField({
                            name: 'label',
                            type: 'localisedString',
                            title: 'Label',
                            // TODO description
                            // TODO validation
                        }),
                        defineField({
                            name: 'url',
                            type: 'url',
                            title: 'URL',
                            // TODO description
                            // TODO validation
                        }),
                    ],
                    preview: {
                        select: {
                            label: 'label',
                            url: 'url',
                        },
                        prepare(selection) {
                            const {
                                label,
                                url,
                            } = selection;
                            return {
                                title: renderLocalisedString(label),
                                subtitle: url,
                            };
                        },
                    },
                }),
            ],
        }),
    ],
    orderings: SUPPORTED_LANGUAGES.map((lang) => {
        return {
            name: `titleAsc_${lang.id}`,
            title: `title (${lang.title})`,
            by: [
                {
                    field: `title.${lang.id}`,
                    direction: 'asc',
                },
            ],
        };
    }),
    preview: {
        select: {
            title: 'title',
            resources: 'resources',
        },
        prepare(selection) {
            const {
                title,
                resources,
            } = selection;
            return {
                title: renderLocalisedString(title),
                subtitle: `${resources?.length || '0'} resource${resources?.length === 1 ? '' : 's'}`,
            };
        },
    },
});