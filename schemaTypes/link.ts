import { defineField, defineType } from 'sanity';

export const createLink = (
    options: {
        as?: 'field' | 'type';
        name?: string;
        title?: string;
        modal?: string;
    } = {}
): any => {
    const {
        as = 'field',
        name = 'link',
        title = 'Link',
        modal,
    } = options;
    const definition = {
        name: name,
        type: 'object',
        title: title,
        fields: [
            defineField({
                name: 'type',
                type: 'string',
                title: 'Type',
                // TODO description
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
                // TODO description
                to: [
                    {
                        type: 'happening',
                    },
                    {
                        type: 'project',
                    },
                    {
                        type: 'resource',
                    },
                    {
                        type: 'writing',
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
                // TODO description
                hidden: ({ parent }) => parent.type !== 'external',
                validation: (Rule) => Rule.uri({
                    scheme: ['http', 'https', 'tel', 'mailto'],
                    allowRelative: false,
                }),
            }),
        ],
        options: {
            modal: modal ? {
                type: modal,
            } : undefined,
        },
    };
    return as === 'type' ? defineType(definition) : defineField(definition);
};

export default createLink({ as: 'type', });