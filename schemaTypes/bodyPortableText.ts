import { defineArrayMember, defineType } from 'sanity';
import { portableTextConfig } from '../lib/portableTextUtils';

export const bodyPortableTextBlock = {
    type: 'block',
    styles: [
        portableTextConfig.styles.normal,
        portableTextConfig.styles.heading,
        portableTextConfig.styles.blockquote,
    ],
    lists: [
        portableTextConfig.lists.bullets,
        portableTextConfig.lists.numbers,
    ],
    marks: {
        decorators: [
            portableTextConfig.decorators.strong,
            portableTextConfig.decorators.em,
            portableTextConfig.decorators.bdi,
        ],
        annotations: [
            portableTextConfig.annotations.link,
        ],
    },
};

export default defineType({
    name: 'bodyPortableText',
    type: 'array',
    of: [
        defineArrayMember(bodyPortableTextBlock),
    ],
});