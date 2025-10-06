import { defineConfig } from 'sanity'; 
import { MakanaLogo } from './components/MakanaLogo';
import { structureTool } from 'sanity/structure';
import { documentList, SINGLETON_ACTIONS, singletonDocument, singletonSchemaTypeNames } from './lib/configUtils';
import { PROJECT_ICON, PROJECT_DATE_ORDERING } from './schemaTypes/project';
import { WRITING_ICON, WRITING_DATE_ORDERING } from './schemaTypes/writing';
import { HAPPENING_ICON, HAPPENING_DATE_ORDERING } from './schemaTypes/happening';
import { RESOURCE_ICON, RESOURCE_DATE_ORDERING } from './schemaTypes/resource';
import { COUNTER_MAP_ICON } from './schemaTypes/specialProject_counterMap';
import { COUNTER_MAP_INITIATIVE_ICON, INITIATIVE_DEFAULT_TITLE_ORDERING } from './schemaTypes/specialProject_counterMap_initiative';
import { FORM_ICON, FORM_REFERENCE_NAME_ORDERING } from './schemaTypes/form';
import { HOME_PAGE_ICON } from './schemaTypes/homePage';
import { ABOUT_PAGE_ICON } from './schemaTypes/aboutPage';
import { WEBSITE_ICON } from './schemaTypes/website';
import { dashboardTool } from '@sanity/dashboard';
import { media, mediaAssetSource } from 'sanity-plugin-media';
import { visionTool } from '@sanity/vision';
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array';
import { schemaTypes } from './schemaTypes';
import './style.css';
import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify';

export default defineConfig({
    name: 'default',
    title: 'Makāna',
    projectId: '33wg2r17',
    dataset: 'production',
    icon: MakanaLogo,
    plugins: [
        structureTool({
            structure: (S) => {
                return S.list().title('Content').items([
                    documentList(S, { schemaTypeName: 'project', title: 'Projects', id: 'projects', icon: PROJECT_ICON, defaultOrdering: PROJECT_DATE_ORDERING, }),
                    documentList(S, { schemaTypeName: 'writing', title: 'Writings', id: 'writings', icon: WRITING_ICON, defaultOrdering: WRITING_DATE_ORDERING, }),
                    documentList(S, { schemaTypeName: 'happening', title: 'Happenings', id: 'happenings', icon: HAPPENING_ICON, defaultOrdering: HAPPENING_DATE_ORDERING, }),
                    documentList(S, { schemaTypeName: 'resource', title: 'Resources', id: 'resources', icon: RESOURCE_ICON, defaultOrdering: RESOURCE_DATE_ORDERING, }),
                    S.divider().title('Special Projects'),
                    S.listItem()
                        .title('Counter-Map of Amman')
                        .id('counterMapOfAmman')
                        .child(
                            S.list().title('Counter-Map of Amman').items([
                                singletonDocument(S, { schemaTypeName: 'specialProject_counterMap', title: 'Map', id: 'specialProject_counterMapOfAmman', icon: COUNTER_MAP_ICON, }),
                                documentList(S, { schemaTypeName: 'specialProject_counterMap_initiative', title: 'Initiatives', id: 'initiatives', icon: COUNTER_MAP_INITIATIVE_ICON, defaultOrdering: INITIATIVE_DEFAULT_TITLE_ORDERING }),
                            ])
                        ),
                    S.divider().title('Supporting Documents'),
                    documentList(S, { schemaTypeName: 'form', title: 'Forms', id: 'forms', icon: FORM_ICON, defaultOrdering: FORM_REFERENCE_NAME_ORDERING, }),
                    S.divider().title('Website Configuration'),
                    singletonDocument(S, { schemaTypeName: 'homePage', title: 'Homepage', id: 'homePage', icon: HOME_PAGE_ICON, }),
                    singletonDocument(S, { schemaTypeName: 'aboutPage', title: 'About Page', id: 'aboutPage', icon: ABOUT_PAGE_ICON, }),
                    singletonDocument(S, { schemaTypeName: 'website', title: 'Website Settings', id: 'website', icon: WEBSITE_ICON, }),
                    ...S.documentTypeListItems().filter((listItem) => {
                        const id = listItem.getId();
                        return typeof id === 'string' && ![
                            'project',
                            'writing',
                            'happening',
                            'resource',
                            'specialProject_counterMap',
                            'specialProject_counterMap_initiative',
                            'form',
                            'homePage',
                            'aboutPage',
                            'website',
                            'media.tag',
                        ].includes(id);
                    }),
                ]);
            },
        }),
        dashboardTool({
            widgets: [
                netlifyWidget({
                    title: 'Netlify Deployments',
                    sites: [
                        {
                            name: 'fascinating-semifreddo-0284e3 ',
                            title: 'fascinating-semifreddo-0284e3.netlify.app ',
                            apiId: 'c48baa12-1ea7-48e6-82f8-7a21d6b27a3b',
                            buildHookId: '6896f9b1f8ae5733dca91f97',
                            url: 'https://fascinating-semifreddo-0284e3.netlify.app',
                        },
                    ],
                }),
            ],
        }),
        media(),
        visionTool(),
        imageHotspotArrayPlugin(),
    ],
    schema: {
        types: Array.from(schemaTypes),
        templates: (prev) => [
            ...prev.filter(({ schemaType }) => !singletonSchemaTypeNames.has(schemaType)),
        ],
    },
    document: {
        actions: (input, context) => {
			return singletonSchemaTypeNames.has(context.schemaType) ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action)) : input;
		},
        comments: {
            enabled: false,
        },
    },
    form: {
        image: {
            assetSources: (previousAssetSources) => {
                return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource);
            },
        },
        file: {
            assetSources: (previousAssetSources) => {
                return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource);
            },
        },
    },
    tasks: {
        enabled: false,
    },
    releases: {
        enabled: false,
    },
    scheduledPublishing: {
        enabled: false,
    },
    announcements: {
        enabled: false,
    },
});