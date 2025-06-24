import { HomeIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const HOME_PAGE_ICON = HomeIcon;

export default defineType({
    name: 'homePage',
    type: 'document',
    title: 'Homepage',
    // description
    icon: HOME_PAGE_ICON,
    // __experimental_formPreviewTitle: false,
    fields: [
        {
            name: 'ignore',
            type: 'string',
            readOnly: true,
            hidden: true,
        },
    ],
    preview: {
        prepare() {
            return {
                title: 'Homepage',
            };
        },
    },
});