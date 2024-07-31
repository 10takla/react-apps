import { Sphere, useTexture } from '@react-three/drei';
import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';
import { classNames } from "S/lib/classNames/classNames";
import cls from './Planet.module.scss';
import Plots from './ui/Plots/Plots';
import { useSelector } from 'react-redux';
import { StoreState } from "src/market/app/MarketProvider/slices/storeSlice";
import { MarketScheme } from "src/market/app/MarketProvider/MarketProvider";
import { useGetPlanet, useGetPlanets } from "src/market/features/Planet/api/planetApi";
import getTextures from "src/market/shared/lib/getTextures/getTextures";
import { MeshStandardMaterial, Vector2, Vector3 } from 'three';
import { logDOM } from '@storybook/test';
import PointDistr from './ui/Plots/PointDistr/PointDistr';

type Component = typeof Sphere;
type ElRef = ElementRef<Component> | null;

interface PlanetProps extends ComponentProps<Component> {

}

const Planet = (props: PlanetProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const planetRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => planetRef.current,
    );
    const { currentPlanetId, controlPanel: {resolution} } = useSelector((state: MarketScheme) => state.store);

    const { data: planet } = useGetPlanet(currentPlanetId)

    const [textures, clear, data] = getTextures()
    const s = useTexture(
        textures.reduce((acc, texture) => {
            const [name, _, res, map] = clear(texture);
            const mapName = map.replace(/\.[^.]+$/, '')
            const reso = Number(res.replace(/[^\d]+/, ''))

            if (name === planet?.name && reso <= resolution && mapName !== 'specularMap') {
                acc = { ...acc, [mapName]: texture }
            }

            return acc
        }, {} as Record<keyof MeshStandardMaterial, string>)
    );

    if (!currentPlanetId) {
        return null
    }
    if (!planet) {
        return null
    }
    return (
        <>
            <Sphere
                className={classNames(cls.Planet, [className])}
                ref={planetRef}
                scale={0.36}
                args={[1, 64, 64]}
                {...otherProps}
            >
                <meshStandardMaterial {...s} />
            </Sphere>
            <PointDistr />
        </>
    );
};

export default memo(forwardRef(Planet));