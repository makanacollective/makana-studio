import { CogIcon } from '@sanity/icons';
import { defineType } from 'sanity';

export const WEBSITE_SETTINGS_ICON = CogIcon;

export default defineType({
    name: 'websiteSettings',
    type: 'document',
    title: 'Website Settings',
    // description
    icon: WEBSITE_SETTINGS_ICON,
    // __experimental_formPreviewTitle: false,
    fields: [
        {
            name: 'ignore',
            type: 'string',
            readOnly: true,
            hidden: true,
        },
        // website address
        // summaries
        // keywords
        // etc etc
    ],
    preview: {
        prepare() {
            return {
                title: 'Website Settings',
            };
        },
    },
});