import { defineArrayMember, defineField, defineType } from 'sanity';
import { bodyPortableTextBlock } from './bodyPortableText';
import { ImageIcon, ImagesIcon, PlayIcon, VideoIcon } from '@sanity/icons';
import { descriptions } from '../lib/descriptionUtils';
import { auxiliaryPortableTextBlock } from './auxiliaryPortableText';
import { RTLCompatibleInput } from '../components/RTLCompatibleInput';
import { RTLCompatiblePortableTextEditor } from '../components/RTLCompatiblePortableTextEditor';
import { FSI, PDI } from '../lib/languageUtils';
import { renderPortableTextAsPlainText } from '../lib/portableTextUtils';
import { FORM_ICON } from './form';

export const createPageBuilder = (
    options: {
        as?: 'field' | 'type';
        name?: string;
        title?: string;
        description?: string;
        inputDirection?: string | string[];
    } = {}
): any => {
    const {
        as = 'field',
        name = 'pageBuilder',
        title = 'Page Builder',
        description,
        inputDirection = 'auto',
    } = options;
    const definition = {
        name: name,
        type: 'array',
        title: title,
        description: description || undefined,
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
                        description: descriptions.pageBuilderImages(),
                        of: [
                            defineArrayMember({
                                type: 'image',
                                icon: ImageIcon,
                                options: {
                                    storeOriginalFilename: false,
                                },
                                fields: [
                                    defineField({
                                        name: 'altText',
                                        type: 'string',
                                        title: 'Alt Text',
                                        description: descriptions.pageBuilderImageAltText(),
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
                        description: descriptions.pageBuilderCaption(),
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
                        description: descriptions.pageBuilderVideoUrl(),
                        // TODO validation youtube and vimeo
                    }),
                    defineField({
                        name: 'aspectRatio',
                        type: 'string',
                        title: 'Aspect Ratio',
                        description: descriptions.pageBuilderVideoAspectRatio(),
                        initialValue: '16/9',
                        // TODO validation
                    }),
                    defineField({
                        name: 'caption',
                        type: 'array',
                        title: 'Caption',
                        description: descriptions.pageBuilderCaption(),
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
                            title: `${FSI}Video (${aspectRatio ? `${aspectRatio} aspect ratio` : 'Aspect ratio not defined'}): ${url || 'No URL'}${PDI}`,
                            subtitle: caption ? `${FSI}${renderPortableTextAsPlainText(caption)}${PDI}` : 'No caption',
                        };
                    },
                },
            }),
            defineArrayMember({
                name: 'audioBlock',
                type: 'object',
                title: 'Audio',
                icon: PlayIcon,
                fields: [
                    defineField({
                        name: 'file',
                        type: 'file',
                        title: 'File',
                        description: descriptions.pageBuilderAudioFile(),
                        options: {
                            accept: 'audio/*',
                        },
                    }),
                    defineField({
                        name: 'caption',
                        type: 'array',
                        title: 'Caption',
                        description: descriptions.pageBuilderCaption(),
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
                        file: 'file',
                        fileName: 'file.asset.originalFilename',
                        caption: 'caption',
                    },
                    prepare(selection) {
                        const {
                            file,
                            fileName,
                            caption,
                        } = selection;
                        return {
                            title: `Audio: ${FSI}${file && file._ref ? (fileName ? `${FSI}${fileName}${PDI}` : 'Untitled') : 'None selected'}${PDI}`,
                            subtitle: caption ? `${FSI}${renderPortableTextAsPlainText(caption)}${PDI}` : 'No caption',
                        };
                    },
                },
            }),
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
                        description: descriptions.pageBuilderForm(),
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
                        referenceName: 'form.referenceName',
                    },
                    prepare(selection) {
                        const {
                            form,
                            referenceName,
                        } = selection;
                        return {
                            title: `${FSI}Form: ${form && form._ref ? (referenceName ? `${FSI}${referenceName}${PDI}` : 'Untitled') : 'None selected'}${PDI}`,
                            subtitle: form && form._ref && referenceName ? '(Note that the form name is for reference only and will not be displayed)' : undefined,
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