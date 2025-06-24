import { PortableTextBlock } from 'sanity';
import { ReactNode } from 'react';

export const PortableTextHeadingStyle = (props: PortableTextBlock & { renderDefault?: (props: any) => ReactNode; children?: ReactNode; }) => {
    const {
        children,
    } = props;
    const content = children;
    return (
        <div className={'makana-pte-heading'} /* see ./style.css */>
            {content}
        </div>
    );
};