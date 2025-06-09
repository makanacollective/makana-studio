import { MenuItem, MenuItemBuilder, StructureBuilder } from 'sanity/structure';
import { LANGUAGE_FIELD_NAME, SUPPORTED_LANGUAGES } from './languageUtils';
import { FC, SVGProps } from 'react';
import { SortOrderingItem } from 'sanity';

export const LOCALISABLE_SCHEMA_TYPES = new Set([
    'writing',
    'happening',
]);

export const SINGLETON_SCHEMA_TYPES = new Set([
    // TODO about?
    // TODO homepage?
]);

const filterMenuItems = (items?: (MenuItem | MenuItemBuilder)[]) => {
    return items?.filter((item) => {
        if (
            // @ts-ignore
            item.spec?.action === 'setSortOrder'
            // @ts-ignore
            && item.spec?.params?.by?.[0]?.field?.startsWith('_')
        ) { return false; }
        return true;
    }) ?? [];
};

type DocumentListOptions = {
    typeName: string;
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
        typeName,
        title,
        id,
        icon,
        defaultOrdering,
    } = options;
    let baseListItem = S.listItem().title(title).id(id);
    if (icon) { baseListItem = baseListItem.icon(icon); }
    return baseListItem.child(
        S.documentTypeList(typeName)
            .title(title)
            .menuItems(filterMenuItems(S.documentTypeList(typeName).getMenuItems()))
            .defaultOrdering(
                defaultOrdering
                || S.documentTypeList(typeName).getDefaultOrdering()
                || [{ direction: 'asc', field: '_id', }]
            )
    );
};

export const localisedDocumentList = (
    S: StructureBuilder,
    options: DocumentListOptions,
) => {
    const {
        typeName,
        title,
        id,
        icon,
        defaultOrdering,
    } = options;
    let baseListItem = S.listItem().title(title).id(id);
    if (icon) { baseListItem = baseListItem.icon(icon); }
    const languageItems = SUPPORTED_LANGUAGES.map((lang) => {
        return S.listItem()
            .title(`${title} (${lang.title})`)
            .id(lang.id)
            .child(
                S.documentTypeList(typeName)
                    .title(`${title} (${lang.title})`)
                    .filter(`_type == $typeName && ${LANGUAGE_FIELD_NAME} == $lang`)
                    .params({ typeName, lang: lang.id })
                    .apiVersion('2025-05-15')
                    .menuItems(filterMenuItems(S.documentTypeList(typeName).getMenuItems()))
                    .defaultOrdering(
                        defaultOrdering
                        || S.documentTypeList(typeName).getDefaultOrdering()
                        || [{ direction: 'asc', field: '_id', }]
                    )
                    .initialValueTemplates([
                        S.initialValueTemplateItem(`${typeName}-by-language`, { langId: lang.id })
                    ])
            );
    });
    return baseListItem.child(S.list().title(title).items(languageItems));
};

export const singletonDocument = (
    S: StructureBuilder,
    typeName: string,
    title: string,
) => {
    return S.listItem()
        .title(title)
        .id(typeName)
        .child(
            S.document()
                .schemaType(typeName)
                // .documentId(typeName)
        );
};

export const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);