import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'link',
    type: 'object',
    fields: [
        defineField({
            name: 'type',
            type: 'string',
            title: 'Type',
            // description
            options: {
                list: [
                    {
                        value: 'external',
                        title: 'External',
                    },
                    {
                        value: 'internal',
                        title: 'Internal',
                    },
                ],
                layout: 'radio',
                direction: 'horizontal',
            },
            initialValue: 'external',
        }),
        defineField({
            name: 'internalTarget',
            type: 'reference',
            title: 'Internal Target',
            // description
            to: [
                {
                    type: 'writing',
                },
                {
                    type: 'happening',
                },
                {
                    type: 'resourceList',
                },
            ],
            options: {
                disableNew: true,
            },
            hidden: ({ parent }) => parent.type !== 'internal',
        }),
        defineField({
            name: 'externalUrl',
            type: 'url',
            title: 'External URL',
            // description
            hidden: ({ parent }) => parent.type !== 'external',
        }),
    ],
    options: {
        modal: {
            type: 'popover',
        },
    },
});