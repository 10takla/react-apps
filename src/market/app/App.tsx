import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useEffect,
} from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import { useDispatch, useSelector } from 'react-redux';
import cls from './App.module.scss';
import { useGetMe } from '../features/Sign/model/api/signApi';
import { clientActions } from './MarketProvider/slices/clientSlice';
import Header from '../widgets/Header/Header';
import { MarketScheme } from './MarketProvider/MarketProvider';
import StorePage from '../pages/StorePage/StorePage';
import SignWidget from '../widgets/SignWidget/SignWidget';
import { Route, Router, Routes } from 'react-router-dom';
import AccountSettings from '../pages/Modal/ui/AccountSettings/AccountSettings';
import Modal from '../pages/Modal/Modal';

type El = ElementRef<typeof HStack> | null;

interface AppProps extends ComponentProps<typeof HStack> {

}

const App = (props: AppProps, ref: ForwardedRef<El>) => {
    const {
        className,
        ...otherProps
    } = props;

    const appRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => appRef.current,
    );

    const dispatch = useDispatch();
    const { isSuccess } = useGetMe(undefined);
    useEffect(() => {
        dispatch(clientActions.setState({ isAuth: isSuccess }));
    }, [dispatch, isSuccess]);


    return (
        <VStack
            className={classNames(cls.App, [className])}
            ref={appRef}
            {...otherProps}
        >
            <Header className={cls.header} />
            <div className={cls.page}>
                <Modal />
                <StorePage />
            </div>
        </VStack>
    );
};

export default memo(forwardRef(App));
