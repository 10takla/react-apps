import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef,
} from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import StoreControlPanel from "src/market/widgets/store/StoreControlPanel/StoreControlPanel";
import StoreWindow from "src/market/widgets/store/StoreWindow/StoreWindow";
import cls from './StorePage.module.scss';
import SearchPlanet from "src/market/widgets/store/SearchPlanet/SearchPlanet";
import ActionPanel from "src/market/widgets/store/panels/ActionPanel/ActionPanel";

type El = ElementRef<typeof HStack> | null;

interface StorePageProps extends ComponentProps<typeof HStack> {

}

const StorePage = (props: StorePageProps, ref: ForwardedRef<El>) => {
    const {
        className,
        ...otherProps
    } = props;

    const storePageRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => storePageRef.current,
    );

    return (
        <HStack
            className={classNames(cls.StorePage, [className])}
            ref={storePageRef}
            {...otherProps}
        >
            <StoreWindow />
            <VStack
                className={cls.overWindows}
                justify="between"
                align="end"
            >
                <HStack
                    className={cls.searchAction}
                    justify="between"
                >
                    <ActionPanel className={cls.actionPanel} />
                    <SearchPlanet className={cls.searchPlanet} />
                </HStack>
                <StoreControlPanel className={cls.controlPanel} />
            </VStack>
        </HStack>
    );
};

export default memo(forwardRef(StorePage));
