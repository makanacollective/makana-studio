import { PatchEvent, set, StringInputProps } from 'sanity';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Box, Flex, Text, TextInput } from '@sanity/ui';

export const JSONifiedStringInput = (
    props: StringInputProps & {
        jsonifiedStringInputFields: {
            name: string;
            label?: string;
            dir?: string;
        }[]
    }
) => {
  const {
    jsonifiedStringInputFields,
    onChange,
    value,
} = props;
    const [localValues, setLocalValues] = useState<Record<string, string>>({});
    useEffect(() => {
        try {
            const parsed = JSON.parse(value ?? '{}');
            const safeValues = jsonifiedStringInputFields.reduce((acc, field) => {
                acc[field.name] = parsed[field.name] || '';
                return acc;
            }, {} as Record<string, string>);
            setLocalValues(safeValues);
        } catch {
            const fallback = jsonifiedStringInputFields.reduce((acc, field) => {
                acc[field.name] = '';
                return acc;
            }, {} as Record<string, string>);
            setLocalValues(fallback);
        }
    }, [value, jsonifiedStringInputFields]);
    const handleChange = useCallback((key: string) => (e: FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        if (localValues[key] === newValue) { return; }
        const updated = {
            ...localValues,
            [key]: newValue,
        };
        setLocalValues(updated);
        onChange(PatchEvent.from(set(JSON.stringify(updated))));
    }, [localValues, onChange]);

  return (
    <Flex gap={2}>
        {jsonifiedStringInputFields.map((field) => (
            <Box key={field.name} flex={1}>
                <Flex gap={2} align={'center'}>
                    <Box>
                        <Text size={1} weight={'medium'}>
                            {field.label ?? field.name}
                        </Text>
                    </Box>
                    <Box flex={1}>
                        <TextInput
                            dir={field.dir || 'auto'}
                            value={localValues[field.name] || ''}
                            onChange={handleChange(field.name)}
                        />
                    </Box>
                </Flex>
            </Box>
        ))}
    </Flex>
  );
};