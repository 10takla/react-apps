import { ForwardedRef, forwardRef, memo } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import ControlPanel from 'src/wasm/widgets/ControlPanel/ControlPanel';
import { Scene } from 'src/wasm/widgets/Scene/Scene';
import { classNames } from 'src/shared/lib/classNames/classNames';
import SceneProvider from './Scene/SceneProvider';
import cls from './ScenePage.module.scss';

type El = HTMLElement | undefined;

interface ScenePageProps {

}

const ScenePage = (props: ScenePageProps, ref: ForwardedRef<El>) => {
    const {

    } = props;

    return (
        <HStack className={classNames(cls.ScenePage)}>
            {/* <SceneProvider> */}
                <Scene />
                <ControlPanel className={cls.controlPanel} />
            {/* </SceneProvider> */}
        </HStack>
    );
};

export default memo(forwardRef(ScenePage));
