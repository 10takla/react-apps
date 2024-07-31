import {
    forwardRef, memo, ForwardedRef, ComponentProps, ReactNode,
} from 'react';
import { classNames } from "S/lib/classNames/classNames";
import { HStack } from "S/ui/Stack";
import cls from './ScenePage.module.scss';

type El = HTMLElement | undefined;

interface ScenePageProps extends ComponentProps<typeof HStack> {
    scene: ReactNode
    controlPanel: ReactNode
}

const ScenePage = (props: ScenePageProps, ref: ForwardedRef<El>) => {
    const {
        className,
        scene,
        controlPanel,
    } = props;

    return (
        <HStack className={classNames(cls.ScenePage, [className])} ref={ref}>
            {scene}
            <div className={cls.controlPanel}>
                {controlPanel}
            </div>
        </HStack>
    );
};

export default memo(forwardRef(ScenePage));
