import BrightnessSvg from 'market/shared/assets/icons/lights/brightness.svg';
import BulbSvg from 'market/shared/assets/icons/lights/bulb.svg';
import SunnyLightSvg from 'market/shared/assets/icons/lights/sunny_light.svg';
import {
    ComponentProps,
    ElementRef,
    ForwardedRef,
    forwardRef, memo,
    useImperativeHandle, useMemo, useRef,
} from 'react';
import { classNames } from "S/lib/classNames/classNames";
import { HStack } from "S/ui/Stack";
import PlanetSvg from 'market/shared/assets/icons/planet/planet.svg';
import ResolutionSvg from 'market/shared/assets/icons/planet/resolution.svg';
import ControllerSvg from 'market/shared/assets/icons/orbitControl/controller.svg';
import RotationSvg from 'market/shared/assets/icons/orbitControl/rotation.svg';
import SpeedSvg from 'market/shared/assets/icons/orbitControl/speed.svg';
import useTheme from "S/providers/theme/useTheme";
import cls from './StoreControlPanel.module.scss';
import PanelElement, { Elmap } from './ui/PanelElement/PanelElement';
import { MeshStandardMaterial } from 'three';
import getTextures from "src/market/shared/lib/getTextures/getTextures";
import { MarketScheme } from "src/market/app/MarketProvider/MarketProvider";
import { useGetPlanet } from "src/market/features/Planet/api/planetApi";
import { useSelector } from 'react-redux';

type El = ElementRef<typeof HStack> | null;

interface StoreControlPanelProps extends ComponentProps<typeof HStack> {

}

const StoreControlPanel = (props: StoreControlPanelProps, ref: ForwardedRef<El>) => {
    const {
        className,
        ...otherProps
    } = props;

    const storeControlPanelRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => storeControlPanelRef.current,
    );

    const [_, oppositeTheme] = useTheme();

    const { currentPlanetId } = useSelector((state: MarketScheme) => state.store);
    const { data: planet } = useGetPlanet(currentPlanetId)

    const [textures, clear, data] = useMemo(() => (
        getTextures(
            (acc, texture, name, type, res, map) => {
                const reso = Number(res?.replace(/[^\d]+/, ''))
                if (planet?.name === name && acc.every(([t]) => t !== reso)) {
                    acc = acc.push([reso, res])
                }
            },
            [] as [number, string][]
        )
    ), [planet])
    
    const map: Array<[Elmap, Elmap[]]> = [
        [
            {
                svg: <PlanetSvg />,
                type: 'hower',
                decription: 'Настройки планеты',
            },
            [
                {
                    svg: <ResolutionSvg />,
                    type: 'selector',
                    field: 'resolution',
                    decription: 'Разрешение текстур',
                    values: data
                },
            ]
        ],
        [
            {
                svg: <BrightnessSvg />,
                type: 'hower',
                decription: 'Настройки яркости',
            },
            [
                {
                    svg: <BulbSvg />,
                    type: 'slider',
                    field: 'lights.pointLight.intensity',
                    decription: 'Точечное освещение',
                    min: 0,
                    max: 90
                },
                {
                    svg: <SunnyLightSvg />,
                    type: 'slider',
                    field: 'lights.ambientLight.intensity',
                    decription: 'Глобальное освещение',
                    min: 0,
                    max: 3
                },
            ],
        ],
        [
            {
                svg: <ControllerSvg />,
                type: 'hower',
                decription: 'Настройки управления',
            },
            [
                {
                    svg: <RotationSvg />,
                    type: 'button',
                    field: 'orbitControls.autoRotate',
                    decription: [
                        'Включить авто-вращение',
                        'Выключить авто-вращение',
                    ],
                },
                {
                    svg: <SpeedSvg />,
                    type: 'slider',
                    field: 'orbitControls.rotateSpeed',
                    decription: 'Скорость вращение',
                    min: 0.3,
                    max: 2
                },
            ],
        ],
    ];

    return (
        <HStack
            className={classNames(cls.StoreControlPanel, [className, oppositeTheme && cls[oppositeTheme]])}
            ref={storeControlPanelRef}
            {...otherProps}
        >
            <HStack
                className={cls.bottomPanel}
                justify="around"
                align="end"
            >
                {map.map(([head, content], i) => (
                    <PanelElement key={`${i}`} {...{ head, content }} />
                ))}
            </HStack>
        </HStack>
    );
};

export default memo(forwardRef(StoreControlPanel));
