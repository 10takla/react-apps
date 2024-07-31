import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef,
} from 'react';
import { HStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import { Canvas } from '@react-three/fiber';
import {
    OrbitControls, Sphere, useTexture,
} from '@react-three/drei';
import { MarketScheme } from "src/market/app/MarketProvider/MarketProvider";
import { useSelector } from 'react-redux';
import cls from './StoreWindow.module.scss';
import Enveronment from './ui/Enveronment/Enveronment';
import Plots from './ui/Plots/Plots';
import Planet from './ui/Planet/Planet';
import { useAppDispatch } from "S/lib/hooks/useAppDispatch";
import { storeActions } from "src/market/app/MarketProvider/slices/storeSlice";

type El = HTMLCanvasElement | null;

interface StoreWindowProps extends ComponentProps<typeof HStack> {

}

const StoreWindow = (props: StoreWindowProps, ref: ForwardedRef<El>) => {
    const {
        className,
        ...otherProps
    } = props;

    const canvasRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => canvasRef.current,
    );

    const {
        lights: {
            pointLight: pointLightProps,
            ambientLight: ambientLightProps,
        },
        orbitControls: orbitControlsProps,
    } = useSelector((state: MarketScheme) => state.store.controlPanel);
    const dispatch = useAppDispatch();
    return (
        <Canvas
            className={classNames(cls.StoreWindow, [className])}
            ref={canvasRef}
            {...otherProps}
        >
            <OrbitControls
                onStart={() => {
                    dispatch(storeActions.setState({ events: { isMove: true } }))
                }}
                onEnd={() => {
                    dispatch(storeActions.setState({ events: { isMove: false } }))
                }}
                {...orbitControlsProps}
            />
            <ambientLight {...ambientLightProps} />
            <pointLight {...pointLightProps} />
            <Enveronment />
            <Planet />
        </Canvas>
    );
};


export default memo(forwardRef(StoreWindow));
