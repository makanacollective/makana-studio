import { PortableTextInput, PortableTextInputProps, useFormValue } from 'sanity';
import { useMemo } from 'react';
import { SUPPORTED_LANGUAGES } from '../lib/languageUtils';

export const RTLCompatiblePortableTextEditor = (props: PortableTextInputProps & { schemaType: any; }) => {
    const {
        schemaType,
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
    const className = `makana-pte-${direction}`;
    return (
        <div className={className} /* see ./style.css */ style={{ minWidth: '0px', minHeight: '0px', }} >
            <PortableTextInput
                {...props}
                onFullScreenChange={(isFullscreenActive) => {
                    if (isFullscreenActive) {
                        document.body.classList.add(`${className}-fullscreen`);
                    } else {
                        document.body.classList.remove(`${className}-fullscreen`);
                    }
                }}
            />
        </div>
    );
};