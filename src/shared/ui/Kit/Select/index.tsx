import {
    ForwardedRef, SelectHTMLAttributes, forwardRef, memo,
} from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: Array<string>;
    onChange: (value: string) => void;
}

const Select = (props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const {
        options,
        onChange,
        ...otherProps
    } = props;
    return (
        <select
            ref={ref}
            {...otherProps}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default memo(forwardRef(Select));
