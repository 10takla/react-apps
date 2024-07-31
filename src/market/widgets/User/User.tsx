import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import cls from './User.module.scss';
import { useGetMe } from "src/market/features/Sign/model/api/signApi";
import MongrolSvg from "src/market/shared/assets/avatars/mongrol.svg"

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface UserProps extends ComponentProps<Component> {

}

const User = (props: UserProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const userRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => userRef.current,
    );

    const { data: user } = useGetMe(undefined);
    
    return (
        <HStack
            className={classNames(cls.User, [className])}
            ref={userRef}
            {...otherProps}
        >
            {
                user && (
                    <img src={`src/market/shared/assets/avatars/${user.avatar || "mongrol"}.svg`} />
                )
            }
        </HStack>
    )
};

export default memo(forwardRef(User));