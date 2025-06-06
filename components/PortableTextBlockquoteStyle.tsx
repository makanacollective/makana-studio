import { PortableTextBlock, useFormValue } from 'sanity';
import { ReactNode } from 'react';
import { LANGUAGE_FIELD_NAME, SUPPORTED_LANGUAGES } from '../lib/languageUtils';

export const PortableTextBlockquoteStyle = (props: PortableTextBlock & { renderDefault: (props: any) => ReactNode; children?: ReactNode; }) => {
    const {
        renderDefault,
        children,
    } = props;
    const currentLanguage = useFormValue([LANGUAGE_FIELD_NAME]) as string | undefined;
    const currentLanguageInfo = SUPPORTED_LANGUAGES.find((lang) => lang.id === currentLanguage);
    const direction = currentLanguageInfo?.dir || 'auto';
    const content = renderDefault ? renderDefault(props) : (<span className='makana-pt-style-select-blockquote'>{children}</span>); // see ./style.css
    return (
        <div dir={direction}>
            {content}
        </div>
    );
};