import { FieldProps } from 'sanity';

export const FullGridSpanField = (props: FieldProps) => {
    return (
        <div style={{ gridColumn: '1/-1', }}>
            {props.renderDefault(props)}
        </div>
    );
};