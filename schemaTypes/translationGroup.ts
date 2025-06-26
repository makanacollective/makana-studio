import { defineField, defineType } from 'sanity';
import { descriptions } from '../lib/descriptionUtils';
import { TranslateIcon } from '@sanity/icons';
import { localisedSchemaTypeNames } from '../lib/configUtils';
import { LANGUAGE_FIELD_NAME, renderLocalisedString, SUPPORTED_LANGUAGES } from '../lib/languageUtils';

export default defineType({
    name: 'translationGroup',
    type: 'document',
    liveEdit: true,
    title: 'Translation Group',
    description: descriptions.document('a grouping of of all language versions of a content item'),
    icon: TranslateIcon,
    fields: [
        defineField({
            name: 'type',
            type: 'string',
            title: 'Type',
            readOnly: true,
            hidden: true,
            options: {
                list: Array.from(localisedSchemaTypeNames),
                layout: 'radio',
            },
        }),
        defineField({
            name: 'translations',
            type: 'object',
            title: 'Translations',
            fields: [
                ...SUPPORTED_LANGUAGES.map((lang) => {
                    return defineField({
                        name: lang.id,
                        type: 'reference',
                        title: `${lang.title} Translation`,
                        to: Array.from(localisedSchemaTypeNames).map((schemaTypeName) => {
                            return {
                                type: schemaTypeName,
                            }
                        }),
                        options: {
                            disableNew: true,
                            filter: ({ document }) => {
                                const targetType = document?.type;
                                const schemaTypeFilter = targetType ? `_type == '${targetType}'` : undefined;
                                const languageFilter = `${LANGUAGE_FIELD_NAME} == '${lang.id}'`;
                                const alreadyReferencedIdsFilter = `!(_id in *[_type == 'translationGroup']{ 'allRefs': [${SUPPORTED_LANGUAGES.map(l => `translations.${l.id}._ref`).join(', ')}] }[].allRefs[])`;
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
            ],
            components: {
                field: (props) => {
                    const {
                        renderDefault,
                    } = props;
                    return renderDefault({
                        ...props,
                        description: descriptions.translations(),
                    });
                },
            },
        }),
    ],
    preview: {
        select: SUPPORTED_LANGUAGES.reduce((acc, lang) => {
            acc[lang.id] = `translations.${lang.id}.title`;
            return acc;
        }, {} as Record<string, string>),
        prepare(selection = {}) {
            const length = Object.values(selection)?.filter(Boolean)?.length || 0;
            return {
                title: renderLocalisedString(selection),
                subtitle: `${length} translation${length === 1 ? '' : 's'}`,
            };
        },
    },
});