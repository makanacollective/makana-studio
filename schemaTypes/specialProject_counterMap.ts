import { EarthGlobeIcon } from '@sanity/icons';
import { ALL_FIELDS_GROUP, defineArrayMember, defineField, defineType } from 'sanity';
import { descriptions } from '../lib/descriptionUtils';
import { createLocalisedSlug } from './localisedSlug';
import { DATE_FORMAT } from '../lib/dateTimeUtils';
import { HOTSPOT_PREVIEWS } from '../lib/imageUtils';
import { FSI, PDI, renderLocalisedString, SUPPORTED_LANGUAGES } from '../lib/languageUtils';
import { createPageBuilder } from './pageBuilder';
import { COUNTER_MAP_INITIATIVE_ICON } from './specialProject_counterMap_initiative';
import { CounterMapMarkerTooltip } from '../components/CounterMapMarkerTooltip';

export const COUNTER_MAP_ICON = EarthGlobeIcon;

export default defineType({
    name: 'specialProject_counterMap',
    type: 'document',
    title: 'Counter-Map',
    description: descriptions.document('all localised versions of a counter-map'),
    icon: COUNTER_MAP_ICON,
    groups: [
        {
            name: 'general',
            title: 'General',
            default: true,
        },
        {
            name: 'infoAndSubmissions',
            title: 'Info & Submissions',
        },
        {
            name: 'mapAndMarkers',
            title: 'Map & Markers',
        },
        {
            ...ALL_FIELDS_GROUP,
            hidden: true,
        },
    ],
    fields: [
        defineField({
            name: 'title',
            type: 'localisedString',
            title: 'Title',
            description: descriptions.title('counter-map'),
            group: 'general',
        }),
        createLocalisedSlug({
            name: 'slug',
            title: 'Slug',
            description: descriptions.slug('counter-map'),
            sourceBase: 'title',
            group: 'general',
        }),
        defineField({
            name: 'date',
            type: 'date',
            title: 'Date',
            description: descriptions.date('counter-map'),
            options: {
                dateFormat: DATE_FORMAT,
            },
            group: 'general',
        }),
        defineField({
            name: 'summary',
            type: 'localisedText',
            title: 'Summary',
            description: descriptions.summary('counter-map'),
            group: 'general',
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
            group: 'general',
        }),
        defineField({
            name: 'submissionForm',
            type: 'reference',
            title: 'Submission Form',
            description: descriptions.submissionForm(),
            to: [
                {
                    type: 'form',
                },
            ],
            options: {
                disableNew: true,
            },
            group: 'infoAndSubmissions',
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
            group: 'infoAndSubmissions',
        }),
        defineField({
            name: 'mapAsset',
            type: 'image',
            title: 'Map Asset',
            description: descriptions.mapAsset(),
            options: {
                storeOriginalFilename: false,
                accept: '.svg',
            },
            group: 'mapAndMarkers',
        }),
        defineField({
            name: 'mapMarkers',
            type: 'array',
            title: 'Map Markers',
            description: descriptions.mapMarkers(),
            of: [
                defineArrayMember({
                    type: 'object',
                    title: 'Marker',
                    icon: COUNTER_MAP_INITIATIVE_ICON,
                    fieldsets: [
                        {
                            name: 'position',
                            title: 'Position',
                            options: {
                                columns: 2,
                            },
                        },
                    ],
                    fields: [
                        defineField({
                            name: 'x',
                            type: 'number',
                            title: 'X (Horizontal)',
                            description: descriptions.mapMarkerX(),
                            // readOnly: true,
                            initialValue: 50,
                            validation: (Rule) => Rule.required().min(0).max(100),
                            fieldset: 'position',
                        }),
                        defineField({
                            name: 'y',
                            type: 'number',
                            title: 'Y (Vertical)',
                            description: descriptions.mapMarkerY(),
                            // readOnly: true,
                            initialValue: 50,
                            validation: (Rule) => Rule.required().min(0).max(100),
                            fieldset: 'position',
                        }),
                        defineField({
                            name: 'initiative',
                            type: 'reference',
                            title: 'Initiative',
                            description: descriptions.mapMarkerInitiative(),
                            to: [
                                {
                                    type: 'specialProject_counterMap_initiative'
                                },
                            ],
                            options: {
                                disableNew: true,
                            },
                        }),
                    ],
                    preview: {
                        select: {
                            x: 'x',
                            y: 'y',
                            initiative: 'initiative',
                            initiativeTitle: 'initiative.title',
                            initiativeSummary: 'initiative.summary',
                            initiativeMainImage: 'initiative.mainImage',
                        },
                        prepare(selection) {
                            const {
                                x = 0,
                                y = 0,
                                initiative,
                                initiativeTitle,
                                initiativeSummary,
                                initiativeMainImage,
                            } = selection;
                            const initiativeRef = initiative?._ref;
                            return {
                                title: initiativeRef ? (renderLocalisedString(initiativeTitle) || 'Untitled initiative') : 'No initiative selected',
                                subtitle: `x: ${x}%, y: ${y}%`,
                                description: `${FSI}${renderLocalisedString(initiativeSummary, 50) || 'No summary'}${PDI}`,
                                media: initiativeMainImage,
                            };
                        },
                    },
                }),
            ],
            options: {
                imageHotspot: {
                    imagePath: 'mapAsset',
                    tooltip: CounterMapMarkerTooltip,
                },
            },
            group: 'mapAndMarkers',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            summary: 'summary',
            mainImage: 'mainImage',
            mapMarkers: 'mapMarkers',
        },
        prepare(selection) {
            const {
                title,
                summary,
                mainImage,
                mapMarkers = [],
            } = selection;
            return {
                title: renderLocalisedString(title),
                subtitle: `${mapMarkers?.length || 0} marker${mapMarkers?.length === 1 ? '' : 's'}`,
                description: `${FSI}${renderLocalisedString(summary, 50) || 'No summary'}${PDI}`,
                media: mainImage,
            };
        },
    },
});