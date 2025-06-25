import { HomeIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { descriptions } from '../lib/descriptionUtils';
import { targetableSchemaTypeNames } from '../lib/configUtils';

export const HOME_PAGE_ICON = HomeIcon;

export default defineType({
    name: 'homePage',
    type: 'document',
    title: 'Homepage',
    icon: HOME_PAGE_ICON,
    fields: [
        defineField({
            name: 'featuredItems',
            type: 'array',
            title: 'Featured Content',
            description: descriptions.featuredItems(),
            of: [
                defineArrayMember({
                    type: 'reference',
                    to: Array.from(targetableSchemaTypeNames).map((schemaTypeName) => {
                        return {
                            type: schemaTypeName,
                        };
                    }),
                    options: {
                        disableNew: true,
                    },
                }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Homepage',
            };
        },
    },
});