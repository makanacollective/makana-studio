import { ArrayFieldProps } from 'sanity';
import { useState } from 'react';
import { Box, Card, Flex, Switch, Text } from '@sanity/ui';

export const FormAttributesField = (props: ArrayFieldProps) => {
    const [isAdvancedEnabled, setIsAdvancedEnabled] = useState(false);
    return (
        <Card border={true} radius={2}>
            <Flex>
                <Box padding={3}>
                    <Switch
                        checked={isAdvancedEnabled}
                        onChange={() => setIsAdvancedEnabled(!isAdvancedEnabled)}
                        id={'makana-enable-form-attributes'}
                    />
                </Box>
                <Box flex={1} paddingY={2} paddingRight={3}>
                    <Box paddingY={2}>
                        <label htmlFor='makana-enable-form-attributes'>
                            <Text size={1} weight={'medium'}>
                                Enable advanced options
                            </Text>
                        </label>
                    </Box>
                    {isAdvancedEnabled && (
                        <Box paddingY={2}>
                            {props.renderDefault(props)}
                        </Box>
                    )}
                </Box>
            </Flex>
        </Card>
    );
};