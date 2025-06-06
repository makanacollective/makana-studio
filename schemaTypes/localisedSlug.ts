import { defineField, defineType } from 'sanity';
import { SUPPORTED_LANGUAGES } from '../lib/languageUtils';

export const createLocalisedSlug = (
    options: {
        as?: 'field' | 'type';
        name?: string;
        title?: string;
        sourceBase?: string;
    } = {}
): any => {
    const {
        as = 'field',
        name = 'localisedSlug',
        title = 'Localised Slug',
        sourceBase,
    } = options;
    const definition = {
        name: name,
        type: 'object',
        title: title,
        fields: SUPPORTED_LANGUAGES.map((lang) => {
            return defineField({
                name: lang.id,
                type: 'slug',
                title: lang.title,
                // TODO description
                // TODO validation
                options: {
                    source: sourceBase ? `${sourceBase}.${lang.id}` : undefined,
                    // TODO isUnique
                    // TODO slugify
                },
            });
        }),
        options: {
            columns: SUPPORTED_LANGUAGES.length > 1 ? 2 : 1,
        },
    };
    return as === 'type' ? defineType(definition) : defineField(definition);
};

export default createLocalisedSlug({ as: 'type', });