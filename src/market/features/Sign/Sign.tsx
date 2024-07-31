import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useCallback, useState,
} from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import { Button } from "S/ui/Kit/Button";
import Input from "S/ui/Kit/Input/Input";
import { Text, TextTheme } from "S/ui/Kit/Text/Text";
import cls from './Sign.module.scss';
import { Fields, InvalidInputError, NotValidError } from './model/api/types/signError';
import { RequestClient } from './model/api/signApi';

type El = ElementRef<typeof HStack> | null;

export enum SignType {
    SIGN_IN = 'in',
    SIGN_UP = 'up',
    SIGN_OUT = 'out',
    UPDATE = 'update'
}

enum SignButtonText {
    in = 'Вход',
    up = 'Зарегистрироваться',
    out = 'Выход',
    update = 'Обновить'
}

interface SignProps extends ComponentProps<typeof HStack> {
    type: SignType
    fields: Array<[string, Fields]>
    request: (args: any) => any
    callback: () => void
}

type ResponseError = { status: number, data: InvalidInputError | NotValidError };

const Sign = (props: SignProps, ref: ForwardedRef<El>) => {
    const {
        className,
        type,
        fields,
        callback,
        request,
        ...otherProps
    } = props;

    const signRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => signRef.current,
    );

    const [credentials, setCredentials] = useState<RequestClient>({});
    const [error, setError] = useState<InvalidInputError | NotValidError>();

    const onSubmit = useCallback(async () => {
        try {
            await request(credentials).unwrap();
            callback();
        } catch (errors) {
            const error = errors as ResponseError;
            if (error.status === 400) {
                setError(error.data);
            }
        }
    }, [callback, credentials, request]);

    return (
        <VStack
            className={classNames(cls.Sign, [className])}
            ref={signRef}
            {...otherProps}
            tag="form"
            gap={16}
            onSubmit={onSubmit}
        >
            {fields.map(([placeholder, fieldName]) => (
                <VStack key={fieldName} align="center">
                    <Input
                        key={fieldName}
                        placeholder={placeholder}
                        onChange={(e) => {
                            setError(undefined);
                            // @ts-ignore
                            const value = e.target.value;
                            setCredentials((prev) => {
                                if (value === '') {
                                    delete prev[fieldName];
                                    return prev
                                } else {
                                    return { ...prev, [fieldName]: value }
                                }
                            });

                        }}
                    />
                    {error?.type === 'invalid_input' && error.fields.includes(fieldName) && (
                        <Text theme={TextTheme.ERROR}>
                            заполните поле
                        </Text>
                    )}
                    {error?.type === 'not_valid' && fieldName in error.fields && (
                        <Text theme={TextTheme.ERROR}>
                            {`${error.fields[fieldName]!.min}`}
                        </Text>
                    )}
                </VStack>

            ))}
            <Button type="submit">{SignButtonText[type]}</Button>
            {error && <Text theme={TextTheme.ERROR}>{error.message}</Text>}
        </VStack>
    );
};

export default memo(forwardRef(Sign));
