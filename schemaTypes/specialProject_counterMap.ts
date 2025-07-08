import { EarthGlobeIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { descriptions } from '../lib/descriptionUtils';
import { createLocalisedSlug } from './localisedSlug';
import { HOTSPOT_PREVIEWS } from '../lib/imageUtils';
import { FSI, PDI, renderLocalisedString, SUPPORTED_LANGUAGES } from '../lib/languageUtils';
import { createPageBuilder } from './pageBuilder';

export const COUNTER_MAP_ICON = EarthGlobeIcon;

export default defineType({
    name: 'specialProject_counterMap',
    type: 'document',
    title: 'Counter-Map',
    description: descriptions.document('all localised versions of a counter-map'),
    icon: COUNTER_MAP_ICON,
    fields: [
        defineField({
            name: 'title',
            type: 'localisedString',
            title: 'Title',
            description: descriptions.title('counter-map'),
        }),
        createLocalisedSlug({
            name: 'slug',
            title: 'Slug',
            description: descriptions.slug('counter-map'),
            sourceBase: 'title',
        }),
        defineField({
            name: 'summary',
            type: 'localisedText',
            title: 'Summary',
            description: descriptions.summary('counter-map'),
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            title: 'Cover Image',
            description: descriptions.mainImage('counter-map'),
            options: {
                hotspot: {
                    previews: HOTSPOT_PREVIEWS,
                },
                storeOriginalFilename: false,
            },
        }),
        defineField({
            name: 'content',
            type: 'object',
            title: 'Content',
            description: descriptions.content('counter-map'),
            fields: SUPPORTED_LANGUAGES.map((lang) => {
                return createPageBuilder({
                    name: lang.id,
                    title: lang.title,
                    inputDirection: lang.dir,
                });
            }),
        }),
        defineField({
            name: 'submissionForm',
            type: 'reference',
            title: 'Submission Form',
            // description TODO
            to: [
                {
                    type: 'form',
                },
            ],
            options: {
                disableNew: true,
            },
        }),
        // graphic TODO
    ],
    // orderings TODO
    preview: {
        select: {
            title: 'title',
            summary: 'summary',
            mainImage: 'mainImage',
        },
        prepare(selection) {
            const {
                title,
                summary,
                mainImage,
            } = selection;
            return {
                title: renderLocalisedString(title),
                // subtitle TODO
                description: `${FSI}${renderLocalisedString(summary, 50) || 'No summary'}${PDI}`,
                media: mainImage,
            };
        },
    },
});