import { defineField, defineType } from 'sanity';
import { SUPPORTED_LANGUAGES } from '../lib/languageUtils';
import { RTLCompatibleInput } from '../components/RTLCompatibleInput';

export default defineType({
    name: 'localisedText',
    type: 'object',
    title: 'Localised Text',
    fields: SUPPORTED_LANGUAGES.map((lang) => {
        return defineField({
            name: lang.id,
            type: 'text',
            title: lang.title,
            // TODO description
            // TODO validation
            rows: 5,
            components: {
                input: RTLCompatibleInput,
            },
            options: {
                // @ts-ignore
                inputDirection: lang.dir,
            },
        });
    }),
    options: {
        columns: SUPPORTED_LANGUAGES.length > 1 ? 2 : 1,
    },
});