import {
    forwardRef, memo, ForwardedRef, ComponentProps, ReactNode,
} from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack } from 'src/shared/ui/Stack';
import cls from './ScenePage.module.scss';
import SceneProvider from './SceneProvider/SceneProvider';

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
        <HStack className={classNames(cls.ScenePage, [className])}>
            {scene}
            <div className={cls.controlPanel}>
                {controlPanel}
            </div>
        </HStack>
    );
};

export default memo(forwardRef(ScenePage));
