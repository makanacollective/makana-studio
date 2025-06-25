import { defineField, defineType } from 'sanity';
import { SUPPORTED_LANGUAGES } from '../lib/languageUtils';
import { customSlugify, validateSlug } from '../lib/slugUtils';

export const createLocalisedSlug = (
    options: {
        as?: 'field' | 'type';
        name?: string;
        title?: string;
        description?: string;
        sourceBase?: string;
    } = {}
): any => {
    const {
        as = 'field',
        name = 'localisedSlug',
        title = 'Localised Slug',
        description,
        sourceBase,
    } = options;
    const definition = {
        name: name,
        type: 'object',
        title: title,
        description: description || undefined,
        fields: SUPPORTED_LANGUAGES.map((lang) => {
            return defineField({
                name: lang.id,
                type: 'slug',
                title: lang.title,
                validation: (Rule) => Rule.custom(validateSlug),
                options: {
                    source: sourceBase ? `${sourceBase}.${lang.id}` : undefined,
                    slugify: customSlugify,
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