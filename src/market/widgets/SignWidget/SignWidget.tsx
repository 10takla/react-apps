import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef,
} from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import { useGetMe, useSignIn, useSignUp } from "src/market/features/Sign/model/api/signApi";
import Sign, { SignType } from "src/market/features/Sign/Sign";
import {
    Route, Routes, useNavigate,
} from 'react-router-dom';
import { clientActions } from "src/market/app/MarketProvider/slices/clientSlice";
import CloseSvg from "S/assets/icons/cross.svg";
import { useDispatch } from 'react-redux';
import cls from './SignWidget.module.scss';

type El = ElementRef<typeof HStack> | null;

interface SignWidgetProps extends ComponentProps<typeof HStack> {

}

const SignWidget = (props: SignWidgetProps, ref: ForwardedRef<El>) => {
    const {
        className,
        ...otherProps
    } = props;

    const SignWidgetRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => SignWidgetRef.current,
    );
    const [signIn] = useSignIn();
    const [signUp] = useSignUp();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const routes = [
        {
            fields: [['имя', 'name'], ['пароль', 'password']],
            type: SignType.SIGN_IN,
            request: signIn,
            callback: () => {
                dispatch(clientActions.setState({ isAuth: true }));
                navigate('');
            },
        },
        {
            fields: [['имя', 'name'], ['пароль', 'password']],
            type: SignType.SIGN_UP,
            request: signUp,
            callback: () => {
                dispatch(clientActions.setState({ isAuth: true }));
                navigate('');
            },
        },
    ];

    return (
        <HStack
            className={classNames(cls.SignWidget, [className])}
            ref={SignWidgetRef}
            {...otherProps}
        >
            <Routes>
                {routes.map(({ type, ...other }) => (
                    <Route
                        key={type}
                        path={`sign-${type}`}
                        element={(
                            <VStack
                                className={cls.signField}
                                align="end"
                            >
                                <CloseSvg onClick={() => { navigate(''); }} />
                                <Sign {...{ type, ...other }} />
                            </VStack>
                        )}
                    />
                ))}
            </Routes>
        </HStack>
    );
};

export default memo(forwardRef(SignWidget));
