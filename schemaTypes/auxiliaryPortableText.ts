import { defineArrayMember, defineType } from 'sanity';
import { portableTextConfig } from '../lib/portableTextUtils';

export default defineType({
    name: 'auxiliaryPortableText',
    type: 'array',
    of: [
        defineArrayMember({
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
        }),
    ],
});