import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useCallback } from 'react';
import { HStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import cls from './Avatars.module.scss';
import { useGetMe, useUpdateMe } from "src/market/features/Sign/model/api/signApi";

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface AvatarsProps extends ComponentProps<Component> {

}

const imageList = Object.keys(import.meta.glob('/src/market/shared/assets/avatars/*'));

const Avatars = (props: AvatarsProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const avatarsRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => avatarsRef.current,
    );

    const { data: user, refetch: refetchUser } = useGetMe(undefined);
    const [update_me] = useUpdateMe()

    const onClick = useCallback(async (avatar: string) => {
        await update_me({ avatar })
        refetchUser()

    }, [],)

    return (
        <HStack
            className={classNames(cls.Avatars, [className])}
            ref={avatarsRef}
            gap={8}
            {...otherProps}
        >
            {imageList.map(image_path => {
                const name = image_path.match(RegExp('([^/]+).svg$'))?.[1]
                const isCurrent = user && name === user.avatar;

                return (
                    <img
                        key={image_path}
                        className={classNames(cls.avatar,
                            { [cls.current]: isCurrent })}
                        src={image_path}
                        onClick={() => {
                            if (!isCurrent) {
                                onClick(name)
                            }
                        }}
                    />
                )
            }
            )}
        </HStack>
    )
};

export default memo(forwardRef(Avatars));