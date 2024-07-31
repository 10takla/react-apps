import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, ReactElement } from 'react';
import { classNames } from "S/lib/classNames/classNames";
import cls from './Menu.module.scss';
import { HStack, VStack } from "S/ui/Stack";
import { Link, useNavigate } from 'react-router-dom';
import Sign, { SignType } from "src/market/features/Sign/Sign";
import { useSelector } from 'react-redux';
import { MarketScheme } from "src/market/app/MarketProvider/MarketProvider";
import { useGetMe, useSignOut } from "src/market/features/Sign/model/api/signApi";
import { useAppDispatch } from "S/lib/hooks/useAppDispatch";
import { clientActions } from "src/market/app/MarketProvider/slices/clientSlice";
import { Button } from "src/stories/Button";

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface MenuProps extends ComponentProps<Component> {
    children: ReactElement
}

const Menu = (props: MenuProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        children,
        ...otherProps
    } = props;

    const menuRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => menuRef.current,
    );

    return (
        <VStack
            className={classNames(cls.Menu, [className])}
            ref={menuRef}
            align={"center"}
            {...otherProps}
        >
            <Link to={'settings'} >Настройки</Link>
            {children}
        </VStack>
    )
};

export default memo(forwardRef(Menu));