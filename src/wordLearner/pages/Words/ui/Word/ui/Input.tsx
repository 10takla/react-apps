import React, { InputHTMLAttributes, memo, useCallback } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    className?: string;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
    } = props;
    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        fetch('http://localhost:8000/myWords', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ word: value }),
        });
    }, []);
    return (
        <input
            className={className}
            onChange={(e) => onInputChange(e)}
            value={value}
        />
    );
});
