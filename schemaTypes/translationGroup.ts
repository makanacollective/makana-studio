import { TranslateIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { LANGUAGE_FIELD_NAME, renderLocalisedString, SUPPORTED_LANGUAGES } from '../lib/languageUtils';
import { localisedSchemaTypeNames } from '../lib/configUtils';

export const TRANSLATION_GROUP_ICON = TranslateIcon;

export default defineType({
    name: 'translationGroup',
    type: 'document',
    liveEdit: true,
    title: 'Translation Group',
    // description
    icon: TRANSLATION_GROUP_ICON,
    fields: [
        ...SUPPORTED_LANGUAGES.map((lang) => {
            return defineField({
                name: lang.id,
                type: 'reference',
                title: `${lang.title} Document`,
                to: Array.from(localisedSchemaTypeNames).map((schemaTypeName) => {
                    return {
                        type: schemaTypeName,
                    }
                }),
                options: {
                    disableNew: true,
                    filter: ({ document }) => {
                        const schemaTypeName = document?.contentType;
                        const schemaTypeFilter = schemaTypeName ? `_type == '${schemaTypeName}'` : undefined;
                        const languageFilter = `${LANGUAGE_FIELD_NAME} == '${lang.id}'`;
                        const alreadyReferencedIdsFilter = `!(_id in *[_type == 'translationGroup']{ 'allRefs': [${SUPPORTED_LANGUAGES.map(l => `${l.id}._ref`).join(', ')}] }[].allRefs[])`;
                        const filters = [
                            schemaTypeFilter,
                            languageFilter,
                            alreadyReferencedIdsFilter,
                        ].filter(Boolean);
                        return {
                            filter: filters.join(' && '),
                        };
                    },
                },
            });
        }),
        defineField({
            name: 'contentType',
            type: 'string',
            title: 'Content Type',
            // description
            readOnly: true,
            hidden: true,
            options: {
                list: Array.from(localisedSchemaTypeNames),
                layout: 'radio',
            },
        }),
    ],
    orderings: [
        {
            name: 'createdAtDesc',
            title: 'date created',
            by: [
                {
                    field: '_createdAt',
                    direction: 'desc',
                },
            ],
        },
    ],
    preview: {
        select: SUPPORTED_LANGUAGES.reduce((acc, lang) => {
            acc[lang.id] = `${lang.id}.title`;
            return acc;
        }, {} as Record<string, string>),
        prepare(selection = {}) {
            const length = Object.values(selection)?.filter(Boolean)?.length || 0;
            return {
                title: renderLocalisedString(selection),
                subtitle: `${length} document${length === 1 ? '' : 's'}`,
            };
        },
    },
});