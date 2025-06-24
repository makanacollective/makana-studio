import { Divider, ListItem, ListItemBuilder, MenuItem, MenuItemBuilder, StructureBuilder } from 'sanity/structure';
import { LANGUAGE_FIELD_NAME, SUPPORTED_LANGUAGES } from './languageUtils';
import { FC, SVGProps } from 'react';
import { SortOrderingItem } from 'sanity';


export const localisedSchemaTypeNames = new Set([
    'project',
    'writing',
]);

export const singletonSchemaTypeNames = new Set([
    'aboutPage',
    'homePage',
    'websiteSettings',
]);

export const targetableSchemaTypeNames = new Set([
    'happening',
    'project',
    'resource',
    'writing',
]);

const filterMenuItems = (menuItems?: (MenuItem | MenuItemBuilder)[]) => {
    return menuItems?.filter((menuItem) => {
        if (
            // @ts-ignore
            menuItem.spec?.action === 'setSortOrder'
            // @ts-ignore
            && menuItem.spec?.params?.by?.[0]?.field?.startsWith('_')
        ) { return false; }
        return true;
    }) ?? [];
};

type DocumentListOptions = {
    schemaTypeName: string;
    title: string;
    id: string;
    icon?: FC<SVGProps<SVGSVGElement>>;
    defaultOrdering?: SortOrderingItem[];
};

export const documentList = (
    S: StructureBuilder,
    options: DocumentListOptions,
) => {
    const {
        schemaTypeName,
        title,
        id,
        icon,
        defaultOrdering,
    } = options;
    let baseListItem = S.listItem().title(title).id(id);
    if (icon) { baseListItem = baseListItem.icon(icon); }
    return baseListItem.child(
        S.documentTypeList(schemaTypeName)
            .title(title)
            .menuItems(filterMenuItems(S.documentTypeList(schemaTypeName).getMenuItems()))
            .defaultOrdering(
                defaultOrdering
                || S.documentTypeList(schemaTypeName).getDefaultOrdering()
                || [{ field: '_id', direction: 'asc', }]
            )
    );
};

export const localisedDocumentList = (
    S: StructureBuilder,
    options: DocumentListOptions & {
        before?: (ListItemBuilder | ListItem | Divider | any)[];
        after?: (ListItemBuilder | ListItem | Divider | any)[];
    },
) => {
    const {
        schemaTypeName,
        title,
        id,
        icon,
        defaultOrdering,
        before = [],
        after = [],
    } = options;
    let baseListItem = S.listItem().title(title).id(id);
    if (icon) { baseListItem = baseListItem.icon(icon); }
    const languageItems = SUPPORTED_LANGUAGES.map((lang) => {
        return S.listItem()
            .title(`${title} (${lang.title})`)
            .id(lang.id)
            .child(
                S.documentTypeList(schemaTypeName)
                    .title(`${title} (${lang.title})`)
                    .filter(`_type == $schemaTypeName && ${LANGUAGE_FIELD_NAME} == $lang`)
                    .params({ schemaTypeName, lang: lang.id })
                    .apiVersion('2025-05-15')
                    .menuItems(filterMenuItems(S.documentTypeList(schemaTypeName).getMenuItems()))
                    .defaultOrdering(
                        defaultOrdering
                        || S.documentTypeList(schemaTypeName).getDefaultOrdering()
                        || [{ direction: 'asc', field: '_id', }]
                    )
                    .initialValueTemplates([
                        S.initialValueTemplateItem(`${schemaTypeName}-by-language`, { langId: lang.id })
                    ])
            );
    });
    return baseListItem.child(S.list().title(title).items([...before, ...languageItems, ...after]));
};

export const singletonDocument = (
    S: StructureBuilder,
    options: Pick<DocumentListOptions, 'schemaTypeName' | 'title' | 'icon'>,
) => {
    const {
        schemaTypeName,
        title,
        icon,
    } = options;
    let baseListItem = S.listItem().title(title).id(schemaTypeName);
    if (icon) { baseListItem = baseListItem.icon(icon); }
    return baseListItem.child(
        S.document()
            .schemaType(schemaTypeName)
            .documentId(schemaTypeName)
    );
};

export const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);