import { InputProps, useFormValue } from 'sanity';
import { useMemo } from 'react';
import { SUPPORTED_LANGUAGES } from '../lib/languageUtils';

export const RTLCompatibleInput = (props: InputProps) => {
    const {
        schemaType,
        renderDefault,
    } = props;
    const inputDirection = schemaType.options?.inputDirection;
    const valueAtPath = useFormValue(Array.isArray(inputDirection) ? inputDirection : []);
    const direction = useMemo(() => {
        if (Array.isArray(inputDirection)) {
            const langInfo = SUPPORTED_LANGUAGES.find((lang) => lang.id === valueAtPath);
            return langInfo?.dir || 'auto';
        } else if (typeof inputDirection === 'string') {
            return inputDirection;
        }
            return 'auto';
    }, [inputDirection, valueAtPath]);
    return (
        <div dir={direction}>
            {renderDefault(props)}
        </div>
    );
};