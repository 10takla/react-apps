import {
    ComponentProps,
    ElementRef,
    ForwardedRef,
    forwardRef,
    memo,
    useEffect,
    useState,
} from 'react';
import SettingsSvg from "S/assets/icons/settings.svg";
import { classNames } from "S/lib/classNames/classNames";
import { HStack, VStack } from '../../../../Stack';
import Select from '../../../Select';
import SwapList from '../../SwapListWithMode/SwapList';
import cls from './SwapModeList.module.scss';

interface ModeSwapList extends ComponentProps<typeof SwapList> {
    mode?: 'swap' | 'offset'
}
const ModeSwapList = (props: ModeSwapList, ref: ForwardedRef<ElementRef<typeof HStack>>) => {
    const {
        className,
        mode = 'swap',
        ...otherProps
    } = props;
    const [isHide, setIsHide] = useState(true);
    const [isHideSettings, setIsHideSettings] = useState(true);

    const [postMode, setPostMode] = useState<'swap' | 'offset'>(mode);
    useEffect(() => {
        setPostMode(mode);
    }, [mode]);

    return (
        <HStack
            ref={ref}
            className={classNames(cls.SwapModeList, [className])}
            onMouseEnter={() => setIsHideSettings(false)}
            onMouseLeave={() => setIsHideSettings(true)}
        >
            <SwapList
                {...otherProps}
                mode={postMode}
            />
            {!isHideSettings
                && (
                    <VStack
                        className={cls.settings}
                        onMouseEnter={() => setIsHide(false)}
                        onMouseLeave={() => setIsHide(true)}
                    >
                        <SettingsSvg />
                        {!isHide && (
                            <Select
                                className={cls.modeSelect}
                                values={['swap', 'offset']}
                                defaultValue={postMode}
                                onChange={(v) => {
                                    setPostMode(v);
                                }}
                            />
                        )}
                    </VStack>
                )}
        </HStack>
    );
};

export default memo(forwardRef(ModeSwapList));
