import { InputProps, useClient, useFormValue } from 'sanity';
import { usePaneRouter } from 'sanity/structure';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fromString as pathFromString } from '@sanity/util/paths';
import { Preview, useSchema } from 'sanity';
import { Button, Card, Stack, Text } from '@sanity/ui';

// The below function was written by ChatGPT
// I have no idea how it works
const useDynamicParams = (paramsMapping: { [key: string]: string; }) => {
    // Extract all keys that start with 'document.' and keep paths as arrays
    const docParamPaths = Object.entries(paramsMapping)
        .filter(([_, v]) => v.startsWith('document.'))
        .map(([key, path]) => [key, path.slice('document.'.length).split('.')] as const);
    // Use useFormValue for each path inside the document
    const values = docParamPaths.map(([key, path]) => {
        // @ts-ignore
        return useFormValue(path);
    });
    // Combine these values with literal params
    return useMemo(() => {
        const result: Record<string, any> = {};
        // Add resolved document params
        docParamPaths.forEach(([key, path], i) => {
            const rawValue = values[i];
            const cleaned = path.join('.') === '_id' ? String(rawValue)?.replace(/^drafts\./, '') : rawValue;
            result[key] = cleaned;
        });
        // Add literal params (that do not start with document.)
        Object.entries(paramsMapping).forEach(([key, val]) => {
            if (!val.startsWith('document.')) {
                result[key] = val;
            }
        });
        return result;
    }, [values, paramsMapping]);
};

export const ComputedReferenceList = (props: InputProps) => {
    const {
        schemaType,
    } = props;
    const client = useClient({ apiVersion: '2025-05-15', });
    const schema = useSchema();
    const query = schemaType?.options?.computedReferenceQuery;
    const paramsMapping = schemaType?.options?.computedReferenceParams || {};
    const params = useDynamicParams(paramsMapping);
    const [documents, setDocuments] = useState<any[]>([]);
    const currentDocId = useFormValue(['_id']);
    useEffect(() => {
        if (!query) { return; }
        if (Object.values(params).some((v) => v === undefined)) { return; }
        client.fetch(query, params).then(setDocuments).catch(console.error);
    }, [currentDocId, client, query, JSON.stringify(params)]);
    const { routerPanesState, groupIndex, handleEditReference } = usePaneRouter();
    const handleClick = useCallback((id: string, type: string) => {
        const childParams = routerPanesState[groupIndex + 1]?.[0].params || {}
        const {parentRefPath} = childParams
        handleEditReference({
            id,
            type,
            // Uncertain that this works as intended
            parentRefPath: parentRefPath ? pathFromString(parentRefPath) : [``],
            template: {id},
        });
    }, [routerPanesState, groupIndex, handleEditReference]);
    return (
        <Card
            key={'blabla'}
            padding={1}
            radius={2}
            border={true}
        >
            {documents.length > 0 ? (
                documents.map((doc) => {
                    const docSchemaType = schema.get(doc?._type);
                    return docSchemaType ? (
                        <Stack>
                            <Button
                                key={doc._id}
                                // eslint-disable-next-line react/jsx-no-bind
                                onClick={() => handleClick(doc._id, doc._type)}
                                padding={2}
                                mode={'bleed'}
                                style={{ cursor: 'pointer', }}
                            >
                                <Preview
                                    // isPlaceholder={true}
                                    value={doc}
                                    schemaType={docSchemaType}
                                    layout={'block'}
                                />
                            </Button>
                        </Stack>
                    ) : (
                        <p>No schema found</p>
                    );
                })
            ) : (
                <Card padding={2}>
                    <Text size={1} muted={true} align={'center'}>
                        No items
                    </Text>
                </Card>
            )}
        </Card>
    );
};