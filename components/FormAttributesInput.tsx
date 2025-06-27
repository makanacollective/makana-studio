import { StringInputProps } from 'sanity';
import { JSONifiedStringInput } from './JSONifiedStringInput';

export const FormAttributesInput = (props: StringInputProps) => {
    return (
        <div className='makana-monospace-string' /* see ./components/MonospaceStringInput.tsx and ./style.css */>
            <JSONifiedStringInput
                {...props}
                jsonifiedStringInputFields={[
                    {
                        name: 'key',
                        label: 'Key',
                    },
                    {
                        name: 'value',
                        label: 'Value',
                    },
                ]}
            />
        </div>
    );
};