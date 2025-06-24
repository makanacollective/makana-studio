import { PortableTextHeadingStyle } from '../components/PortableTextHeadingStyle';
import { TransferIcon } from '@sanity/icons';
import { PortableTextBdiDecorator } from '../components/PortableTextBdiDecorator';
import { createLink } from '../schemaTypes/link';
import { PortableTextListBlock, PortableTextSpan, PortableTextTextBlock } from 'sanity';
import { FSI, PDI } from './languageUtils';

export const portableTextConfig = {
    styles: {
        normal: {
            value: 'normal',
            title: 'Normal',
        },
        heading: {
            value: 'heading',
            title: 'Heading',
            component: PortableTextHeadingStyle,
        },
        blockquote: {
            value: 'blockquote',
            title: 'Blockquote',
        },
    },
    lists: {
        bullets: {
            value: 'bullet',
            title: 'Bulleted list',
        },
        numbers: {
            value: 'number',
            title: 'Numbered list',
        },
    },
    decorators: {
        strong: {
            value: 'strong',
            title: 'Bold',
        },
        em: {
            value: 'em',
            title: 'Italic',
        },
        bdi: {
            value: 'bdi',
            title: 'Bi-directional Isolation',
            icon: TransferIcon,
            component: PortableTextBdiDecorator,
        },
    },
    annotations: {
        link: createLink({
            name: 'link',
            title: 'Link',
            modal: 'popover',
        }),
    },
};

export const renderPortableTextAsPlainText = (blocks: (PortableTextTextBlock | PortableTextListBlock)[] = [], { withNotation = false } = {}) => {
    const getStylePrefix = (style: string | undefined) => {
        switch (style) {
            case 'heading': return '=';
            case 'blockquote': return '|>';
            default: return '>';
        }
    };
    const getListPrefix = (listItem: string | undefined, level: number | undefined) => {
        if (!listItem || !level) { return ''; }
        switch (listItem) {
            case 'number': return '#'.repeat(level);
            case 'bullet': return '*'.repeat(level);
            default: return '';
        }
    };
    const formatSpanText = (span: PortableTextSpan, blockMarkDefs: { _key: string; _type: string; }[] = []) => {
        let text = span.text;
        if (!withNotation || !span.marks || span.marks.length === 0) { return text; }
        const hasStrong = span.marks.includes('strong');
        const hasEm = span.marks.includes('em');
        const hasLink = span.marks.some((mark) => blockMarkDefs.some((def) => def._key === mark && def._type === 'link'));
        const hasBdi = span.marks.includes('bdi');
        if (hasBdi) {
            text = `${FSI}${text}${PDI}`;
        }
        if (hasEm) {
            text = `_${text}_`;
        }
        if (hasStrong) {
            text = `**${text}**`;
        }
        if (hasLink) {
            text = `[${text}]`;
        }
        if (hasBdi) {
            text = `{${text}}`;
        }
        return text;
    };
    if (!blocks || blocks.length === 0) { return ''; }
    return blocks.map((block) => {
        if (block._type !== 'block' || !Array.isArray(block.children)) {
            return '';
        }
        let prefix = '';
        if (withNotation) {
            const stylePrefix = getStylePrefix(block.style);
            const listPrefix = block.listItem && block.level ? getListPrefix(block.listItem, block.level) + ' ' : '';
            prefix = `${stylePrefix} ${listPrefix}`
        }
        const text = block.children
            .filter((child) => child._type === 'span')
            .map((span) => formatSpanText(span as PortableTextSpan, block.markDefs))
            .join('');
        return prefix + text;
    }).filter(Boolean).join('\n');
};