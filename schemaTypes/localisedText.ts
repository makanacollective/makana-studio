import { defineField, defineType } from 'sanity';
import { SUPPORTED_LANGUAGES } from '../lib/languageUtils';
import { TEXT_FIELD_ROWS } from '../lib/miscUtils';
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
            rows: TEXT_FIELD_ROWS,
            components: {
                input: RTLCompatibleInput,
            },
            options: {
                // @ts-ignore
                inputDirection: lang.dir,
            },
        });
    }),
});