import { InfoOutlineIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { createLocalisedSlug } from './localisedSlug';
import { renderLocalisedString, SUPPORTED_LANGUAGES } from '../lib/languageUtils';
import { createPageBuilder } from './pageBuilder';

export const ABOUT_PAGE_ICON = InfoOutlineIcon;

export default defineType({
    name: 'aboutPage',
    type: 'document',
    title: 'About Page',
    // TODO description
    icon: ABOUT_PAGE_ICON,
    fields: [
        defineField({
            name: 'title',
            type: 'localisedString',
            title: 'Title',
            // TODO description
            // TODO validation
        }),
        createLocalisedSlug({
            name: 'slug',
            title: 'Slug',
            sourceBase: 'title',
        }),
        defineField({
            name: 'content',
            type: 'object',
            title: 'Content',
            fields: SUPPORTED_LANGUAGES.map((lang) => {
                return createPageBuilder({
                    name: lang.id,
                    title: lang.title,
                    inputDirection: lang.dir,
                });
            }),
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare(selection) {
            const {
                title,
            } = selection;
            return {
                title: renderLocalisedString(title),
            };
        },
    },
});