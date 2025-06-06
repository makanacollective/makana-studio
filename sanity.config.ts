import { defineConfig } from 'sanity'; 
import { structureTool } from 'sanity/structure';
import { documentList, localisedDocumentList, singletonDocument } from './lib/configUtils';
import { WRITING_ICON, WRITING_TITLE_ORDERING } from './schemaTypes/writing';
import { HAPPENING_ICON, HAPPENING_DATE_ORDERING } from './schemaTypes/happening';
import { RESOURCE_LIST_ICON, RESOURCE_LIST_TITLE_ORDERING } from './schemaTypes/resourceList';
import { FORM_ICON, FORM_TITLE_ORDERING } from './schemaTypes/form';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import './style.css';

export default defineConfig({
    name: 'default',
    title: 'makana-studio',
    projectId: '33wg2r17',
    dataset: 'production',
    plugins: [
        structureTool({
            structure: (S) => {
                return S.list().title('Content').items([
                    localisedDocumentList(S, { typeName: 'writing', title: 'Writings', id: 'writings', icon: WRITING_ICON, defaultOrdering: WRITING_TITLE_ORDERING, }),
                    documentList(S, { typeName: 'happening', title: 'Happenings', id: 'happenings', icon: HAPPENING_ICON, defaultOrdering: HAPPENING_DATE_ORDERING, }),
                    documentList(S, { typeName: 'resourceList', title: 'Resources', id: 'resources', icon: RESOURCE_LIST_ICON, defaultOrdering: RESOURCE_LIST_TITLE_ORDERING }),
                    S.divider(),
                    documentList(S, { typeName: 'form', title: 'Forms', id: 'forms', icon: FORM_ICON, defaultOrdering: FORM_TITLE_ORDERING }),
                    S.divider(),
                    ...S.documentTypeListItems().filter((item) => ![
                        'writing',
                        'happening',
                        'resourceList',
                        'form',
                    ].includes(item.getId() as string)),
                ]);
            },
        }),
        visionTool(),
    ],
    schema: {
        types: schemaTypes,
    },
    document: {
        comments: {
            enabled: false,
        },
    },
    tasks: {
        enabled: false,
    },
    releases: {
        enabled: false,
    },
});