import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef,
} from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import Sign, { SignType } from "src/market/features/Sign/Sign";
import { useSignIn, useSignOut, useSignUp } from "src/market/features/Sign/model/api/signApi";
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from "S/lib/hooks/useAppDispatch";
import { clientActions } from "src/market/app/MarketProvider/slices/clientSlice";
import cls from './SignPage.module.scss';

type El = ElementRef<typeof HStack> | null;

interface SignPageProps extends ComponentProps<typeof HStack> {

}

const SignPage = (props: SignPageProps, ref: ForwardedRef<El>) => {
    const {
        className,
        ...otherProps
    } = props;

    const signPageRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => signPageRef.current,
    );

    const [signIn] = useSignIn();
    const [signUp] = useSignUp();
    const [signOut] = useSignOut();

    const dispatch = useAppDispatch();

    const tol = [
        {
            fields: [['имя', 'name'], ['пароль', 'password']],
            type: SignType.SIGN_IN,
            request: signIn,
            callback: () => {
                dispatch(clientActions.setState({ isAuth: true }));
            },
        },
        {
            fields: [['имя', 'name'], ['пароль', 'password']],
            type: SignType.SIGN_UP,
            request: signUp,
            callback: () => {
                dispatch(clientActions.setState({ isAuth: true }));
            },
        },
        {
            fields: [],
            type: SignType.SIGN_OUT,
            request: signOut,
            callback: () => {
                dispatch(clientActions.setState({ isAuth: false }));
            },
        },
    ];

    return (
        <VStack
            className={classNames(cls.SignPage, [className])}
            ref={signPageRef}
            {...otherProps}
        >
            <Routes>
                <Route index element={<Navigate to={`sign-${tol[0].type}`} />} />
                {tol.map(({ type, ...other }) => (
                    <Route
                        key={type}
                        path={`sign-${type}`}
                        element={<Sign {...{ type, ...other }} />}
                    />
                ))}
            </Routes>
        </VStack>
    );
};

export default memo(forwardRef(SignPage));
