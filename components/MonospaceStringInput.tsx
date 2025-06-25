import { StringInputProps } from 'sanity';

export const MonospaceStringInput = (props: StringInputProps) => {
    const {
        renderDefault,
    } = props;
    return (
        <div className='makana-monospace-string' /* see ./style.css */>
            {renderDefault(props)}
        </div>
    );
};