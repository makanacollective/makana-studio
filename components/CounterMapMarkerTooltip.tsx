import { HotspotTooltipProps } from 'sanity-plugin-hotspot-array';
import { Box } from '@sanity/ui';

export const CounterMapMarkerTooltip = (props: HotspotTooltipProps) => {
    const {
        value,
        schemaType,
        renderPreview
    } = props;
    return (
        <Box style={{minWidth: 200}}>
            {renderPreview({
                value,
                schemaType,
                layout: 'default',
            })}
        </Box>
    );
};