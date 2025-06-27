import { StringInputProps } from 'sanity';
import { JSONifiedStringInput } from './JSONifiedStringInput';
import { SUPPORTED_LANGUAGES } from '../lib/languageUtils';

export const FormFieldOptionInput = (props: StringInputProps) => {
    return (
        <JSONifiedStringInput
            {...props}
            jsonifiedStringInputFields={SUPPORTED_LANGUAGES.map((lang) => {
                return {
                    name: lang.id,
                    label: lang.title,
                    dir: lang.dir,
                };
            })}
        />
    );
};