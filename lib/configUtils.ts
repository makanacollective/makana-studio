import { MenuItem, MenuItemBuilder, StructureBuilder } from 'sanity/structure';
import { FC, SVGProps } from 'react';
import { SortOrderingItem } from 'sanity';

export const singletonSchemaTypeNames = new Set([
    'aboutPage',
    'homePage',
    'website',
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