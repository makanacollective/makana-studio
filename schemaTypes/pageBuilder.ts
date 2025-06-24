import { defineArrayMember, defineField, defineType } from 'sanity';
import { bodyPortableTextBlock } from './bodyPortableText';
import { ImageIcon, ImagesIcon, VideoIcon } from '@sanity/icons';
import { auxiliaryPortableTextBlock } from './auxiliaryPortableText';
import { RTLCompatibleInput } from '../components/RTLCompatibleInput';
import { RTLCompatiblePortableTextEditor } from '../components/RTLCompatiblePortableTextEditor';
import { FSI, PDI, renderLocalisedString } from '../lib/languageUtils';
import { renderPortableTextAsPlainText } from '../lib/portableTextUtils';
import { FORM_ICON } from './form';

export const createPageBuilder = (
    options: {
        as?: 'field' | 'type';
        name?: string;
        title?: string;
        inputDirection?: string | string[];
    } = {}
): any => {
    const {
        as = 'field',
        name = 'pageBuilder',
        title = 'Page Builder',
        inputDirection = 'auto',
    } = options;
    const definition = {
        name: name,
        type: 'array',
        title: title,
        of: [
            defineArrayMember({
                ...bodyPortableTextBlock,
            }),
            defineArrayMember({
                name: 'imageBlock',
                type: 'object',
                title: 'Image(s)',
                icon: ImagesIcon,
                fields: [
                    defineField({
                        name: 'images',
                        type: 'array',
                        title: 'Image(s)',
                        // TODO description
                        // TODO validation
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
                                        // TODO validation
                                        components: {
                                            input: RTLCompatibleInput,
                                        },
                                        options: {
                                            // @ts-ignore
                                            inputDirection: inputDirection,
                                        },
                                    }),
                                ],
                            }),
                        ],
                    }),
                    defineField({
                        name: 'caption',
                        type: 'array',
                        title: 'Caption',
                        // TODO description
                        // TODO validation
                        of: [
                            defineArrayMember({
                                ...auxiliaryPortableTextBlock,
                                options: {
                                    oneLine: true,
                                },
                            }),
                        ],
                        components: {
                            // @ts-ignore
                            input: RTLCompatiblePortableTextEditor,
                        },
                        options: {
                            // @ts-ignore
                            inputDirection: inputDirection,
                        },
                    }),
                ],
                preview: {
                    select: {
                        images: 'images',
                        image0Asset: 'images.0.asset',
                        caption: 'caption',
                    },
                    prepare(selection) {
                        const {
                            images = {},
                            image0Asset,
                            caption,
                        } = selection;
                        return {
                            title: `${FSI}${Object.keys(images)?.length || 0} image${Object.keys(images)?.length === 1 ? '' : 's'}${PDI}`,
                            subtitle: caption ? `${FSI}${renderPortableTextAsPlainText(caption)}${PDI}` : 'No caption',
                            media: image0Asset ? image0Asset : (Object.keys(images)?.length > 1 ? ImagesIcon : ImageIcon),
                        };
                    },
                },
            }),
            defineArrayMember({
                name: 'videoEmbedBlock',
                type: 'object',
                title: 'Video',
                icon: VideoIcon,
                fields: [
                    defineField({
                        name: 'url',
                        type: 'url',
                        title: 'URL',
                        // TODO description
                        // TODO validation
                    }),
                    defineField({
                        name: 'aspectRatio',
                        type: 'string',
                        title: 'Aspect Ratio',
                        // TODO description
                        initialValue: '16/9',
                        // TODO validation
                    }),
                    defineField({
                        name: 'caption',
                        type: 'array',
                        title: 'Caption',
                        // TODO description
                        // TODO validation
                        of: [
                            defineArrayMember({
                                ...auxiliaryPortableTextBlock,
                                options: {
                                    oneLine: true,
                                },
                            }),
                        ],
                        components: {
                            // @ts-ignore
                            input: RTLCompatiblePortableTextEditor,
                        },
                        options: {
                            // @ts-ignore
                            inputDirection: inputDirection,
                        },
                    }),
                ],
                preview: {
                    select: {
                        url: 'url',
                        aspectRatio: 'aspectRatio',
                        caption: 'caption',
                    },
                    prepare(selection) {
                        const {
                            url,
                            aspectRatio,
                            caption,
                        } = selection;
                        return {
                            title: `${FSI}Video (${aspectRatio || 'No aspect ratio'}): ${url || 'No URL'}${PDI}`,
                            subtitle: caption ? `${FSI}${renderPortableTextAsPlainText(caption)}${PDI}` : 'No caption',
                        };
                    },
                },
            }),
            // TODO audio block
            defineArrayMember({
                name: 'formBlock',
                type: 'object',
                title: 'Form',
                icon: FORM_ICON,
                fields: [
                    defineField({
                        name: 'form',
                        type: 'reference',
                        title: 'Form',
                        // TODO description
                        // TODO validation
                        to: [
                            {
                                type: 'form',
                            },
                        ],
                        options: {
                            disableNew: true,
                        },
                    }),
                    // TODO which language? arabic? english? auto (default)? both?
                ],
                preview: {
                    select: {
                        form: 'form',
                        formTitle: 'form.title',
                    },
                    prepare(selection) {
                        const {
                            form,
                            formTitle,
                        } = selection;
                        return {
                            title: form && form._ref ? `${FSI}Form: ${renderLocalisedString(formTitle)}${PDI}` : 'No form selected',
                        };
                    },
                },
            }),
        ],
        components: {
            input: RTLCompatiblePortableTextEditor,
        },
        options: {
            inputDirection: inputDirection,
        },
    };
    return as === 'type' ? defineType(definition) : defineField(definition);
};

export default createPageBuilder({ as: 'type', });