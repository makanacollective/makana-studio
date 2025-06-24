import { ReactNode } from 'react';

export const PortableTextBdiDecorator = ({ children }: { children: ReactNode; }) => {
    return (
        <span style={{ backgroundColor: 'var(--card-badge-primary-bg-color)', }}>
            <bdi>{children}</bdi>
        </span>
    );
};