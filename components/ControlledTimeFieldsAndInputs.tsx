import { ObjectFieldProps, ObjectInputProps, PatchEvent, set, StringInputProps, unset } from 'sanity';
import { Box, Flex, Label } from '@sanity/ui';
import { FormEvent, useCallback } from 'react';
import { TIME_SEPARATOR } from '../lib/dateTimeUtils';

export const ControlledTimeField = (props: ObjectFieldProps) => {
    return (
        <div className={'makana-controlled-time-field'} /* see ./style.css */>
            {props.renderDefault(props)}
        </div>
    );
};

export const PaddedAndSanitisedTimeInput = (props: StringInputProps) => {
    const {
        elementProps,
        onChange,
        path,
        renderDefault,
    } = props;
    const fieldName = path[path.length - 1];
    const min = 0;
    const max = fieldName === 'hours' ? 23 : 59;
    const handleChange = useCallback((event: FormEvent<Element>) => {
        const raw = (event.target as HTMLInputElement).value.trim();
        if (!/^\d*$/.test(raw)) {
            return;
        }
        if (raw === '') {
            onChange?.(PatchEvent.from(unset()));
            return;
        }
        const parsed = parseInt(raw, 10);
        if (!isNaN(parsed) && parsed >= min && parsed <= max) {
            const final = parsed.toString().padStart(2, '0');
            onChange?.(PatchEvent.from(set(final)));
            return;
        }
    }, [onChange, fieldName, min, max]);
    return renderDefault({
        ...props,
        elementProps: {
            ...elementProps,
            onChange: handleChange,
        },
    });
};

export const ControlledTimeInput = (props: ObjectInputProps) => {
    const {
        members,
        renderDefault,
    } = props;
    return (
        <Flex gap={2} align={'flex-end'}>
            <Box flex={1}>
                <div className='makana-hours-input' /* see ./style.css */ >
                    {renderDefault({
                        ...props,
                        members: [members[0]],
                    })}
                </div>
            </Box>
            <Box paddingY={3} style={{ paddingRight: '1px', }}>
                <Label size={4} weight={'regular'} align={'center'}>
                    {TIME_SEPARATOR}
                </Label>
            </Box>
            <Box flex={1}>
                {props.renderDefault({
                    ...props,
                    members: [members[1]],
                })}
            </Box>
        </Flex>
    );
};