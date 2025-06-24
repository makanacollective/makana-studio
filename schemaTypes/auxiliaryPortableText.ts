import { defineArrayMember, defineType } from 'sanity';
import { portableTextConfig } from '../lib/portableTextUtils';

export const auxiliaryPortableTextBlock = {
    type: 'block',
    styles: [
        portableTextConfig.styles.normal,
    ],
    lists: [],
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
    name: 'auxiliaryPortableText',
    type: 'array',
    of: [
        defineArrayMember(auxiliaryPortableTextBlock),
    ],
});