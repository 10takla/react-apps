import {
    forwardRef, memo, ForwardedRef, ComponentProps,
} from 'react';
import PlaySvg from 'src/shared/assets/icons/reproduction/play.svg';
import PauseSvg from 'src/shared/assets/icons/reproduction/pause.svg';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { SceneScheme } from 'src/wasm/pages/ScenePage/Scene/SceneProvider';
import { SceneActions } from 'src/wasm/pages/ScenePage/Scene/slices/sceneSlice';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack } from 'src/shared/ui/Stack';
import cls from './ControlPanel.module.scss';

const Range = ({
    setState, min, max, value,
}) => {
    return (
        <div className={cls.range}>
            {value}
            <input
                value={value}
                type="range"
                {...{ min, max }}
                step={(max - min) / 100}
                onChange={(e) => setState(Number(e.target.value))}
            />
        </div>
    );
};

type El = HTMLElement | undefined;

interface ControlPanelProps extends ComponentProps<typeof HStack> {
}

const ControlPanel = (props: ControlPanelProps, ref: ForwardedRef<El>) => {
    const {
        className,
    } = props;

    const { isStart, trigger, resolution } = useSelector((state: SceneScheme) => state.Scene);
    const dispatch = useAppDispatch();

    return (
        <HStack
            className={classNames(cls.ControlPanel, [className])}
            align="center"
        >
            <div className={cls.playRange}>
                <div className={cls.resol}>
                    <input
                        type="number"
                        value={resolution[0]}
                        onChange={(e) => {
                            dispatch(SceneActions.setState(['resolution', [Number(e.target.value), resolution[1], resolution[2]]]));
                        }}
                    />
                    <input
                        type="number"
                        value={resolution[1]}
                        onChange={(e) => {
                            dispatch(SceneActions.setState(['resolution', [resolution[0], Number(e.target.value), resolution[2]]]));
                        }}
                    />
                    <input
                        type="number"
                        value={resolution[2]}
                        onChange={(e) => {
                            dispatch(SceneActions.setState(['resolution', [resolution[0], resolution[1], Number(e.target.value)]]));
                        }}
                    />
                </div>
                {/* <Range setState={setSize} min={0.1} max={2} value={size} />
                <Range setState={setSpeed} min={200} max={2000} value={speed} /> */}
                <button
                    className={`${cls.play} ${isStart ? cls.is_play : ''}`}
                    onClick={() => {
                        dispatch(SceneActions.setState(['isStart', !isStart]));
                    }}
                >
                    {isStart ? <PlaySvg /> : <PauseSvg />}
                </button>
            </div>
            <button
                className={cls.tick}
                onClick={() => {
                    dispatch(SceneActions.setState(['trigger', trigger + 1]));
                }}
            >
                tick
            </button>
        </HStack>
    );
};

export default memo(forwardRef(ControlPanel));
