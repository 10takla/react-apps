import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import cls from './Modal.module.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AccountSettings from './ui/AccountSettings/AccountSettings';
import CrossSvg from "S/assets/icons/cross.svg"

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ModalProps extends ComponentProps<Component> {

}

const Modal = (props: ModalProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const modalRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => modalRef.current,
    );

    const navigate = useNavigate();

    const modal = (
        <div className={cls.wrapper}>
            <VStack
                className={classNames(cls.Modal, [className])}
                ref={modalRef}
                align="end"
                {...otherProps}
            >
                <CrossSvg onClick={() => navigate("")} />
                <VStack className={cls.content}>
                    <AccountSettings />
                </VStack>
            </VStack>
        </div>
    )

    return (
        <Routes>
            <Route
                path={"settings"}
                element={modal}
            />
        </Routes>
    )
};

export default memo(forwardRef(Modal));