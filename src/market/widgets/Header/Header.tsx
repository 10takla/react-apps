import {
    ComponentProps,
    ElementRef,
    ForwardedRef,
    forwardRef, memo,
    useImperativeHandle, useRef,
} from 'react';
import { classNames } from "S/lib/classNames/classNames";
import { HStack, VStack } from "S/ui/Stack";
import Menu from '../Menu/Menu';
import cls from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Sign, { SignType } from "src/market/features/Sign/Sign";
import { useSelector } from 'react-redux';
import { MarketScheme } from "src/market/app/MarketProvider/MarketProvider";
import { useGetMe, useSignOut } from "src/market/features/Sign/model/api/signApi";
import { useAppDispatch } from "S/lib/hooks/useAppDispatch";
import { clientActions } from "src/market/app/MarketProvider/slices/clientSlice";
import User from '../User/User';
import Hidden from "S/ui/Kit/Hidden/Hidden";
import { useState } from 'react';
import SignWidget from '../SignWidget/SignWidget';
import Portal from "S/ui/Portal/Portal";
import { createPortal } from '@react-three/fiber';
import { Button } from "src/stories/Button";

type El = ElementRef<typeof HStack> | null;

interface HeaderProps extends ComponentProps<typeof HStack> {

}

const Header = (props: HeaderProps, ref: ForwardedRef<El>) => {
    const {
        className,
        ...otherProps
    } = props;

    const headerRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => headerRef.current,
    );

    const { isAuth } = useSelector((state: MarketScheme) => state.client);
    const { isLoading } = useGetMe(undefined);

    if (isLoading) {
        return null
    }

    return (
        <HStack
            className={classNames(cls.Header, [className])}
            ref={headerRef}
            gap={16}
            align="center"
            justify="end"
            {...otherProps}
        >
            {isAuth ? <IsAuths /> : <IsNotAuth />}
        </HStack>
    );
};

interface D {
    portalRef: any
}

function IsNotAuth() {
    const singLinks = [
        {
            type: SignType.SIGN_IN,
            text: 'Войти',
        },
        {
            type: SignType.SIGN_UP,
            text: 'Зарегистрироваться',
        },
    ];

    return (
        <>
            <VStack align="end">
                {singLinks.map(({ type, text }) => (
                    <Link key={type} to={`sign-${type}`}>{text}</Link>
                ))}
            </VStack>
            <div
                className={cls.menu}
            >
                <SignWidget />
            </div>
        </>
    )
}


function IsAuths() {
    const [signOut] = useSignOut();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isHidden, setIsHidden] = useState(true);

    return (
        <div
            onMouseEnter={() => {
                setIsHidden(false)
            }}
            onMouseLeave={() => {
                setIsHidden(true)
            }}
        >
            <User />
            <Hidden
                isHidden={isHidden}
            >
                <VStack
                    align="center"
                    className={cls.menu}
                >
                    <Link onClick={() => setIsHidden(true)} to={'settings'} >Настройки</Link>
                    <Sign
                        fields={[]}
                        type={SignType.SIGN_OUT}
                        request={signOut}
                        callback={() => {
                            navigate('');
                            dispatch(clientActions.setState({ isAuth: false }));
                        }}
                    />
                </VStack>
            </Hidden>
        </div>
    )
}

export default memo(forwardRef(Header));
