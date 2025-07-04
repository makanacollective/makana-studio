import { InfoOutlineIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import { descriptions } from '../lib/descriptionUtils';
import { createLocalisedSlug } from './localisedSlug';
import { renderLocalisedString, SUPPORTED_LANGUAGES } from '../lib/languageUtils';
import { createPageBuilder } from './pageBuilder';

export const ABOUT_PAGE_ICON = InfoOutlineIcon;

export default defineType({
    name: 'aboutPage',
    type: 'document',
    title: 'About Page',
    icon: ABOUT_PAGE_ICON,
    fields: [
        defineField({
            name: 'title',
            type: 'localisedString',
            title: 'Title',
            description: descriptions.title('page'),
        }),
        createLocalisedSlug({
            name: 'slug',
            title: 'Slug',
            description: descriptions.slug('page'),
            sourceBase: 'title',
        }),
        defineField({
            name: 'content',
            type: 'object',
            title: 'Content',
            description: descriptions.content('page'),
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