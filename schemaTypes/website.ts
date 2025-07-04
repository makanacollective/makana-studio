import { CogIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { descriptions } from '../lib/descriptionUtils';
import { MonospaceStringInput } from '../components/MonospaceStringInput';

export const WEBSITE_ICON = CogIcon;

export default defineType({
    name: 'website',
    type: 'document',
    title: 'Website Settings',
    icon: WEBSITE_ICON,
    fields: [
        defineField({
            name: 'title',
            type: 'localisedString',
            title: 'Website Title',
            description: descriptions.title('website'),
        }),
        defineField({
            name: 'summary',
            type: 'localisedText',
            title: 'Website Summary',
            description: descriptions.summary('website'),
        }),
        defineField({
            name: 'keywords',
            type: 'array',
            title: 'Website Keywords',
            description: descriptions.keywords('website'),
            of: [
                defineArrayMember({
                    type: 'string',
                }),
            ],
            options: {
                layout: 'tags',
            },
        }),
        defineField({
            name: 'logo',
            type: 'image',
            title: 'Logo',
            description: descriptions.logo(),
            options: {
                storeOriginalFilename: false,
                accept: '.svg',
            },
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            title: 'Cover Image',
            description: descriptions.mainImage('website', true),
            options: {
                storeOriginalFilename: false,
                accept: 'image/png, image/jpeg',
            },
        }),
        defineField({
            name: 'analytics',
            type: 'string',
            title: 'Analytics Script',
            description: descriptions.analytics(),
            components: {
                input: MonospaceStringInput,
            },
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Website Settings',
            };
        },
    },
});