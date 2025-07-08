import { CalendarIcon } from '@sanity/icons';
import { defineField, defineType, SortOrderingItem } from 'sanity';
import { DEFAULT_LANGUAGE, FSI, PDI, renderLocalisedString, SEPARATOR, SUPPORTED_LANGUAGES, } from '../lib/languageUtils';
import { descriptions } from '../lib/descriptionUtils';
import { createLocalisedSlug } from './localisedSlug';
import { DATE_FORMAT, DEFAULT_TIME_ZONE, formattedTimeZones, renderIsoDate, TIME_SEPARATOR } from '../lib/dateTimeUtils';
import { ControlledTimeField, ControlledTimeInput, PaddedAndSanitisedTimeInput } from '../components/ControlledTimeFieldsAndInputs';
import { FullGridSpanField } from '../components/FullGridSpanField';
import { HOTSPOT_PREVIEWS } from '../lib/imageUtils';
import { createPageBuilder } from './pageBuilder';

export const HAPPENING_ICON = CalendarIcon;

export const HAPPENING_DATE_ORDERING: SortOrderingItem[] = [
    {
        field: 'startDate',
        direction: 'desc',
    },
    {
        field: `title.${DEFAULT_LANGUAGE?.id}`,
        direction: 'asc',
    },
];

export default defineType({
    name: 'happening',
    type: 'document',
    title: 'Happening',
    description: descriptions.document('all localised versions of a happening, such as an event or programme'),
    icon: HAPPENING_ICON,
    fieldsets: [
        {
            name: 'dateTime',
            title: 'Date & Time',
            description: descriptions.startDateTime('happening'),
            options: {
                columns: 2,
            },
        },
    ],
    fields: [
        defineField({
            name: 'title',
            type: 'localisedString',
            title: 'Title',
            description: descriptions.title('happening'),
        }),
        createLocalisedSlug({
            name: 'slug',
            title: 'Slug',
            description: descriptions.slug('happening'),
            sourceBase: 'title',
        }),
        defineField({
            name: 'startDate',
            type: 'date',
            title: 'Date',
            fieldset: 'dateTime',
            validation: (Rule) => Rule.custom((value, context) => {
                const document = context?.document as Record<string, any> | undefined;
                const startTime = document?.startTime;
                const hasStartTime = startTime?.hours && startTime?.hours !== undefined;
                if (!value && hasStartTime) {
                    return 'Date is required when a time is specified';
                }
                return true;
            }).warning(),
            options: {
                dateFormat: DATE_FORMAT,
            },
        }),
        defineField({
            name: 'startTime',
            type: 'object',
            fieldset: 'dateTime',
            components: {
                field: ControlledTimeField,
                input: ControlledTimeInput,
            },
            fields: [
                defineField({
                    name: 'hours',
                    type: 'string',
                    title: 'Hours',
                    placeholder: '00',
                    components: {
                        input: PaddedAndSanitisedTimeInput,
                    },
                    validation: (Rule) => Rule.custom((value, context) => {
                        const parent = context?.parent as Record<string, any> | undefined;
                        const hasMinutes = parent?.minutes && parent?.minutes !== undefined;
                        if (!value && hasMinutes) {
                            return 'Hours are required when minutes are specified';
                        }
                        return true;
                    }).warning(),
                }),
                defineField({
                    name: 'minutes',
                    type: 'string',
                    title: 'Minutes',
                    placeholder: '00',
                    components: {
                        input: PaddedAndSanitisedTimeInput,
                    },
                }),
            ],
        }),
        defineField({
            name: 'timezone',
            type: 'string',
            title: 'Time Zone',
            fieldset: 'dateTime',
            initialValue: DEFAULT_TIME_ZONE,
            components: {
                field: FullGridSpanField,
            },
            options: {
                list: formattedTimeZones,
                layout: 'dropdown',
            },
        }),
        defineField({
            name: 'location',
            type: 'localisedString',
            title: 'Location',
            description: descriptions.location('happening'),
        }),
        defineField({
            name: 'summary',
            type: 'localisedText',
            title: 'Summary',
            description: descriptions.summary('happening'),
        }),
        defineField({
            name: 'mainImage',
            type: 'image',
            title: 'Cover Image',
            description: descriptions.mainImage('happening'),
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
            description: descriptions.content('happening'),
            fields: SUPPORTED_LANGUAGES.map((lang) => {
                return createPageBuilder({
                    name: lang.id,
                    title: lang.title,
                    inputDirection: lang.dir,
                });
            }),
        }),
    ],
    orderings: [
        {
            name: 'dateDesc',
            title: 'date',
            by: HAPPENING_DATE_ORDERING,
        },
        ...SUPPORTED_LANGUAGES.map((lang) => {
            return {
                name: `titleAsc_${lang.id}`,
                title: `title (${lang.title})`,
                by: [
                    {
                        field: `title.${lang.id}`,
                        direction: 'asc',
                    },
                    {
                        field: 'startDate',
                        direction: 'desc',
                    },
                ] as SortOrderingItem[],
            };
        }),
    ],
    preview: {
        select: {
            title: 'title',
            startDate: 'startDate',
            startTime: 'startTime',
            location: 'location',
            summary: 'summary',
            mainImage: 'mainImage',
        },
        prepare(selection) {
            const {
                title,
                startDate,
                startTime,
                location,
                summary,
                mainImage,
            } = selection;
            const renderedDate = renderIsoDate(startDate, { mode: 'full', withFallback: true });
            const renderedTime = startTime && startTime.hours ? `${startTime.hours}${TIME_SEPARATOR}${startTime.minutes || '00'}` : undefined;
            const renderedLocation = renderLocalisedString(location);
            return {
                title: renderLocalisedString(title),
                subtitle: [renderedDate, renderedTime, renderedLocation].filter(Boolean)?.join(SEPARATOR),
                description: `${FSI}${renderLocalisedString(summary, 50) || 'No summary'}${PDI}`,
                media: mainImage,
            };
        },
    },
});