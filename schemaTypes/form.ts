import { BillIcon, BlockContentIcon, HelpCircleIcon, SelectIcon, StringIcon, UlistIcon, UnknownIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType, SortOrderingItem } from 'sanity';
import { FSI, PDI, renderLocalisedString } from '../lib/languageUtils';
import { descriptions } from '../lib/descriptionUtils';

export const FORM_ICON = BillIcon;

export const FORM_REFERENCE_NAME_ORDERING: SortOrderingItem[] = [
    {
        field: `referenceName`,
        direction: 'asc',
    },
];

// TODO validations

export default defineType({
    name: 'form',
    type: 'document',
    title: 'Form',
    description: descriptions.document('all language versions of a form'),
    icon: FORM_ICON,
    fields: [
        defineField({
            name: 'referenceName',
            type: 'string',
            title: 'Reference Name',
            description: descriptions.referenceName('form'),
        }),
        // TODO implement endpoint stuff
        defineField({
            name: 'fields',
            type: 'array',
            title: 'Fields',
            description: descriptions.formFields(),
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
                            description: descriptions.formFieldLabel(),
                        }),
                        defineField({ // TODO improve
                            name: 'uid',
                            type: 'slug',
                            title: 'Unique Identifier',
                            description: descriptions.formFieldUid(),
                            options: {
                                // @ts-ignore
                                source: (_, context) => context.parent.label?.en || context.parent.label?.ar || undefined,
                            },
                        }),
                        defineField({
                            name: 'type',
                            type: 'string',
                            title: 'Type',
                            description: descriptions.formFieldType(),
                            initialValue: 'text',
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
                            description: descriptions.formFieldOptions(),
                            hidden: ({ parent }) => !['select', 'checkbox'].includes(parent?.type),
                            of: [
                                defineArrayMember({
                                    name: 'option',
                                    type: 'object',
                                    title: 'Option',
                                    icon: HelpCircleIcon,
                                    fields: [
                                        defineField({
                                            name: 'label',
                                            type: 'localisedString',
                                            title: 'Option',
                                            description: descriptions.formFieldOptionLabel(),
                                        }),
                                        defineField({ // TODO improve
                                            name: 'uid',
                                            type: 'slug',
                                            title: 'Unique Identifier',
                                            description: descriptions.formFieldOptionUid(),
                                            options: {
                                                // @ts-ignore
                                                source: (_, context) => context.parent.label?.en || context.parent.label?.ar || undefined,
                                            },
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
                                options = [],
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
                                    : type === 'checkbox' ? UlistIcon
                                    : UnknownIcon,
                            };
                        },
                    },
                }),
            ],
        }),
    ],
    orderings: [
        {
            name: 'referenceNameAsc',
            title: 'reference name',
            by: FORM_REFERENCE_NAME_ORDERING,
        },
    ],
    preview: {
        select: {
            referenceName: 'referenceName',
            fields: 'fields',
        },
        prepare(selection) {
            const {
                referenceName,
                fields,
            } = selection;
            return {
                title: referenceName ? `${FSI}${referenceName}${PDI}` : undefined,
                subtitle: `${fields?.length || '0'} field${fields?.length === 1 ? '' : 's'}`,
            };
        },
    },
});