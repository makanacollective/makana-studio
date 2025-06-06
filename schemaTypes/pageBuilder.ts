import { defineArrayMember, defineField, defineType } from 'sanity';
import { BlockContentIcon, ImagesIcon, VideoIcon } from '@sanity/icons';
import { PageBuilderBlockPreview } from '../components/PageBuilderBlockPreview';
import { RTLCompatibleInput } from '../components/RTLCompatibleInput';
import { FORM_ICON } from './form';

export default defineType({
    name: 'pageBuilder',
    type: 'array',
    of: [
        defineArrayMember({
            name: 'textBlock',
            type: 'object',
            title: 'Text',
            icon: BlockContentIcon,
            components: {
                item: PageBuilderBlockPreview,
            },
            fields: [
                defineField({
                    name: 'text',
                    type: 'bodyPortableText',
                    // description
                    // validation
                }),
            ],
        }),
        defineArrayMember({
            name: 'imageBlock',
            type: 'object',
            title: 'Image(s)',
            icon: ImagesIcon,
            components: {
                item: PageBuilderBlockPreview,
            },
            fields: [
                defineField({
                    name: 'images',
                    type: 'array',
                    title: 'Image(s)',
                    // description
                    // validation
                    of: [
                        defineArrayMember({
                            type: 'image',
                            options: {
                                storeOriginalFilename: false,
                            },
                            fields: [
                                defineField({
                                    name: 'altText',
                                    type: 'string',
                                    title: 'Alt Text',
                                    description: 'Important for accessibility and SEO.',
                                    // validation
                                    components: {
                                        // input: RTLCompatibleInput,
                                    },
                                }),
                            ],
                        }),
                    ],
                }),
                defineField({
                    name: 'caption',
                    type: 'auxiliaryPortableText',
                    title: 'Caption',
                    // description
                    // validation
                }),
            ],
        }),
        defineArrayMember({
            name: 'videoEmbedBlock',
            type: 'object',
            title: 'Video',
            icon: VideoIcon,
            components: {
                item: PageBuilderBlockPreview,
            },
            fields: [
                defineField({
                    name: 'url',
                    type: 'url',
                    title: 'URL',
                    // description
                    // validation
                }),
                defineField({
                    name: 'aspectRatio',
                    type: 'string',
                    title: 'Aspect Ratio',
                    // description
                    initialValue: '16/9',
                    // validation
                }),
                defineField({
                    name: 'caption',
                    type: 'auxiliaryPortableText',
                    title: 'Caption',
                    // description
                    // validation
                }),
            ],
        }),
        defineArrayMember({
            name: 'formBlock',
            type: 'object',
            title: 'Form',
            icon: FORM_ICON,
            components: {
                item: PageBuilderBlockPreview,
            },
            fields: [
                defineField({
                    name: 'form',
                    type: 'reference',
                    title: 'Form',
                    // description
                    // validation
                    to: [
                        {
                            type: 'form',
                        },
                    ],
                    options: {
                        disableNew: true,
                    },
                }),
                // which language? arabic? english? auto (default)? both?
            ],
        }),
    ],
});