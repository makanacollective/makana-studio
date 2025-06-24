import { defineType } from 'sanity';
import { LANGUAGE_FIELD_NAME, SUPPORTED_LANGUAGES } from '../lib/languageUtils';

export default defineType({
    name: LANGUAGE_FIELD_NAME,
    type: 'string',
    title: 'Language',
    // TODO description
    readOnly: ({ value }) => Boolean(value),
    // hidden: ({ value }) => Boolean(value),
    options: {
        list: SUPPORTED_LANGUAGES.map((lang) => {
            return {
                value: lang.id,
                title: lang.title,
            };
        }),
        layout: 'radio',
        direction: 'horizontal',
    },
});