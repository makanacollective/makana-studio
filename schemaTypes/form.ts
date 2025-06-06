import { BillIcon, BlockContentIcon, CheckmarkIcon, SelectIcon, StarIcon, StringIcon, UnknownIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType, SortOrderingItem } from 'sanity';
import { DEFAULT_LANGUAGE, renderLocalisedString, SUPPORTED_LANGUAGES } from '../lib/languageUtils';

export const FORM_ICON = BillIcon;

export const FORM_TITLE_ORDERING: SortOrderingItem[] = [
    {
        field: `title.${DEFAULT_LANGUAGE?.id}`,
        direction: 'asc',
    },
];

export default defineType({
    name: 'form',
    type: 'document',
    title: 'Form',
    // TODO description
    icon: FORM_ICON,
    fields: [
        defineField({
            name: 'title',
            type: 'localisedString',
            title: 'Title',
            // TODO description
            // TODO validation
        }),
        defineField({
            name: 'fields',
            type: 'array',
            title: 'Fields',
            // TODO description
            // TODO validation
            of: [
                defineArrayMember({
                    name: 'field',
                    type: 'object',
                    title: 'Field',
                    fields: [
                        defineField({
                            name: 'label',
                            type: 'localisedString',
                            title: 'Label',
                            // TODO description
                            // TODO validation
                        }),
                        defineField({
                            name: 'key',
                            type: 'string',
                            title: 'Key',
                            // TODO description
                            // TODO validation
                        }),
                        defineField({
                            name: 'type',
                            type: 'string',
                            title: 'Type',
                            // TODO description
                            // TODO validation
                            options: {
                                list: [
                                    {
                                        value: 'text',
                                        title: 'Single-line text field',
                                    },
                                    {
                                        value: 'textarea',
                                        title: 'Multi-line text field',
                                    },
                                    {
                                        value: 'select',
                                        title: 'Dropdown menu',
                                    },
                                    {
                                        value: 'checkbox',
                                        title: 'Checkbox group',
                                    },
                                ],
                            },
                        }),
                        defineField({
                            name: 'options',
                            type: 'array',
                            title: 'Options',
                            hidden: ({ parent }) => !['select', 'checkbox'].includes(parent?.type),
                            of: [
                                defineArrayMember({
                                    name: 'option',
                                    type: 'object',
                                    title: 'Option',
                                    icon: StarIcon,
                                    fields: [
                                        defineField({
                                            name: 'label',
                                            type: 'localisedString',
                                            title: 'Option',
                                            // TODO description
                                            // TODO validation
                                        }),
                                    ],
                                    preview: {
                                        select: {
                                            label: 'label',
                                        },
                                        prepare(selection) {
                                            const {
                                                label,
                                            } = selection;
                                            return {
                                                title: renderLocalisedString(label),
                                                subtitle: 'Option',
                                            };
                                        },
                                    },
                                }),
                            ],
                        }),
                    ],
                    preview: {
                        select: {
                            label: 'label',
                            type: 'type',
                            options: 'options',
                        },
                        prepare(selection) {
                            const {
                                label,
                                type,
                                options,
                            } = selection;
                            return {
                                title: renderLocalisedString(label),
                                subtitle:
                                    type === 'text' ? 'Single-line text field'
                                    : type === 'textarea' ? 'Multi-line text field'
                                    : type === 'select' ? `Dropdown menu (${options?.length || 0} option${options?.length === 1 ? '' : 's'})`
                                    : type === 'checkbox' ? `Checkbox group (${options?.length || 0} option${options?.length === 1 ? '' : 's'})`
                                    : 'No type',
                                media:
                                    type === 'text' ? StringIcon
                                    : type === 'textarea' ? BlockContentIcon
                                    : type === 'select' ? SelectIcon
                                    : type === 'checkbox' ? CheckmarkIcon
                                    : UnknownIcon,
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
            fields: 'fields',
        },
        prepare(selection) {
            const {
                title,
                fields,
            } = selection;
            return {
                title: renderLocalisedString(title),
                subtitle: `${fields?.length || '0'} field${fields?.length === 1 ? '' : 's'}`,
            };
        },
    },
});