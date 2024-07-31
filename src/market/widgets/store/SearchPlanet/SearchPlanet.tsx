import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useImperativeHandle, useMemo, useRef } from 'react';
import { useGetPlanets } from "src/market/features/Planet/api/planetApi";
import { classNames } from "S/lib/classNames/classNames";
import Input, { InputThemes } from "S/ui/Kit/Input/Input";
import { HStack, VStack } from "S/ui/Stack";
import cls from './SearchPlanet.module.scss';
import Hidden from "S/ui/Kit/Hidden/Hidden";
import { useState } from 'react';
import SearchSvg from "S/assets/icons/search.svg"
import useTheme from "S/providers/theme/useTheme";
import { useAppDispatch } from "S/lib/hooks/useAppDispatch";
import { storeActions } from "src/market/app/MarketProvider/slices/storeSlice";
import getTextures from "src/market/shared/lib/getTextures/getTextures";
import { MarketScheme } from "src/market/app/MarketProvider/MarketProvider";
import { useSelector } from 'react-redux';


type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface SearchPlanetProps extends ComponentProps<Component> {

}


const SearchPlanet = (props: SearchPlanetProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const searchPlanetRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => searchPlanetRef.current,
    );
    const [search, setSearch] = useState('');
    const [isHover, setIsHover] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const { data: planets } = useGetPlanets({ from: 0, to: 10, search: useMemo(() => search, [search]) });

    const planetTextures = useMemo(() => {
        const [textures, clear] = getTextures()

        const preTextures = textures.reduce((acc, texture) => {
            const [name, type, resolution, map] = clear(texture);
            if (type === 'surface' && map.startsWith("map")) {
                const res_num = Number(resolution.replace("K", ""))

                if (name in acc) {
                    const [_, curr_resolution] = acc[name];

                    if (res_num < curr_resolution) {
                        acc = { ...acc, [name]: [texture, res_num] }
                    }
                } else {
                    acc = { ...acc, [name]: [texture, res_num] }
                }
            }
            return acc
        }, {} as Record<string, [string, number]>)

        return Object.entries(preTextures).reduce((acc, [name, [texture]]) => ({ ...acc, [name]: texture }), {} as Record<string, string>)
    }, [])

    const [_, oppositeTheme] = useTheme();

    const dispatch = useAppDispatch();
    const {isMove} = useSelector((state: MarketScheme) => state.store.events)
    
    return (
        <VStack
            className={classNames(cls.SearchPlanet, [className, oppositeTheme && cls[oppositeTheme]])}
            ref={searchPlanetRef}
            gap={8}
            align="end"
            onMouseEnter={() => setIsHidden(false)}
            onMouseLeave={() => setIsHidden(true)}
            {...otherProps}
        >
            <HStack
                className={cls.search}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >

                {(search.length || isHover || isFocus) ? (
                    <Input
                        theme={InputThemes.BASE}
                        placeholder='поиск'
                        value={search}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(e: any) => {
                            setSearch(e.target.value)
                        }}
                    />
                ) : <SearchSvg />}
            </HStack>
            <VStack className={cls.planets}>
                {
                    planets?.map(({ id, name }) => (
                        <HStack
                            key={id}
                            className={classNames(cls.planet, { [cls.hover]: (!isHidden || isFocus) && !isMove })}
                            tag={'button'}
                            align={"center"}
                            gap={8}
                            onClick={() => dispatch(storeActions.setState({ currentPlanetId: id }))}
                        >
                            <img className={cls.texture} src={planetTextures[name] ?? "src/market/shared/assets/textures/defaultTexture.png"} />
                            {name}
                        </HStack>
                    ))
                }
            </VStack>
        </VStack>
    )
};

export default memo(forwardRef(SearchPlanet));