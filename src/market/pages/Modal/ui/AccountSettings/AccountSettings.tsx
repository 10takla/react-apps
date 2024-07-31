import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import cls from './AccountSettings.module.scss';
import Avatars from './ui/Avatars/Avatars';
import Input from "S/ui/Kit/Input/Input";
import Sign, { SignType } from "src/market/features/Sign/Sign";
import { useUpdateMe } from "src/market/features/Sign/model/api/signApi";

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface AccountSettingsProps extends ComponentProps<Component> {
    
}

const AccountSettings = (props: AccountSettingsProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;
    
    const accountSettingsRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => accountSettingsRef.current,
    );
    
    const [updateMe]= useUpdateMe();

    return (
        <VStack
            className={classNames(cls.AccountSettings, [className])}
            ref={accountSettingsRef}
            {...otherProps}
        >
            <Avatars />
            <Sign
                type={SignType.UPDATE}
                fields={[['имя', 'name'], ['пароль', 'password']]}
                request={updateMe}
            />
        </VStack>
    )
};

export default memo(forwardRef(AccountSettings));