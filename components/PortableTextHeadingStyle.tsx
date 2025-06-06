import { PortableTextBlock, useFormValue } from 'sanity';
import { ReactNode } from 'react';
import { LANGUAGE_FIELD_NAME, SUPPORTED_LANGUAGES } from '../lib/languageUtils';

export const PortableTextHeadingStyle = (props: PortableTextBlock & { renderDefault: (props: any) => ReactNode; children?: ReactNode; }) => {
    const {
        children,
    } = props;
    const currentLanguage = useFormValue([LANGUAGE_FIELD_NAME]) as string | undefined;
    const currentLanguageInfo = SUPPORTED_LANGUAGES.find((lang) => lang.id === currentLanguage);
    const direction = currentLanguageInfo?.dir || 'auto';
    return (
        <div dir={direction} style={{ fontSize: '1.414em' }}>
            {children}
        </div>
    );
};