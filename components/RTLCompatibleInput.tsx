import { InputProps, useFormValue } from 'sanity';
import { SUPPORTED_LANGUAGES } from '../lib/languageUtils';

export const RTLCompatibleInput = (props: InputProps) => {
    const {
        schemaType,
        renderDefault,
    } = props;
    let direction = 'auto';
    if (Array.isArray(schemaType.options?.inputDirection)) {
        const valueAtPath = useFormValue(schemaType.options?.inputDirection);
        const langInfo = SUPPORTED_LANGUAGES.find((lang) => lang.id === valueAtPath);
        direction = langInfo?.dir || 'auto';
    } else if (typeof schemaType.options?.inputDirection === 'string') {
        direction = schemaType.options?.inputDirection;
    }
    return (
        <div dir={direction}>
            {renderDefault(props)}
        </div>
    );
};