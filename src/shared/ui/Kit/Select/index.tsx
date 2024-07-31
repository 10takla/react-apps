import {
    ForwardedRef, SelectHTMLAttributes, forwardRef, memo,
} from 'react';

interface SelectProps<V> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    values: Array<V> | [Array<V>, string];
    onChange: (value: V) => void;
}

const Select = <V,>(props: SelectProps<V>, ref: ForwardedRef<HTMLSelectElement>) => {
    const {
        values,
        onChange,
        ...otherProps
    } = props;
    
    return (
        <select
            ref={ref}
            {...otherProps}
            onChange={(e) => onChange(e.target.value as V)}
        >
            {values.map((value, i) => (
                !Array.isArray(value) ? (
                    <option key={i} value={value}>
                        {value}
                    </option>
                ) : (
                    <option key={value} value={value[0]}>
                        {value[1]}
                    </option>
                )
            ))}
        </select>
    );
};

export default memo(forwardRef(Select));
