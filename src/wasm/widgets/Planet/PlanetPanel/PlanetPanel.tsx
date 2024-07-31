import {
    forwardRef, memo, ForwardedRef, ComponentProps,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from "S/lib/classNames/classNames";
import { HStack, VStack } from "S/ui/Stack";
import Input from "S/ui/Kit/Input/Input";
import { planetActions } from "src/wasm/app/providers/SceneProvider/slices/planetSlice";
import { SceneScheme } from "src/wasm/app/providers/SceneProvider/SceneProvider";
import SettingsSvg from "S/assets/icons/settings.svg";
import Description from "S/ui/Kit/Description/Description";
import Foldden from "S/ui/Kit/Foldden/Foldden";
import cls from './PlanetPanel.module.scss';
import FieldSettings from './ui/FieldSettings/FieldSettings';

type El = HTMLElement | undefined;

interface PlanetPanelProps extends ComponentProps<typeof HStack> {
}

const PlanetPanel = (props: PlanetPanelProps, ref: ForwardedRef<El>) => {
    const {
        className,
    } = props;

    const dispatch = useDispatch();
    const { pointCount } = useSelector((state: SceneScheme) => state.planet);

    return (
        <HStack
            className={classNames(cls.PlanetPanel, [className])}
            align="end"
            justify="between"
            gap={8}
        >
            <Foldden
                to={<FieldSettings />}
            >
                <Description describtion="Настройки поля">
                    <div>
                        <SettingsSvg
                            className={cls.settingsSvg}
                        />
                    </div>
                </Description>
            </Foldden>
            <HStack
                align="center"
                gap={8}
            >
                <VStack gap={16}>
                    <button
                        onClick={() => {
                            dispatch(planetActions.incrementTrigger('trigger2'));
                        }}
                    >
                        Обновить
                    </button>
                    <button
                        onClick={() => {
                            dispatch(planetActions.incrementTrigger('trigger'));
                        }}
                    >
                        tick
                    </button>
                </VStack>
                <Input
                    type="number"
                    max={300000}
                    value={pointCount}
                    onBlur={(e) => {
                        const pointCount = Number(e.target.value);
                        dispatch(planetActions.setState({ pointCount }));
                    }}
                />
            </HStack>
        </HStack>
    );
};

export default memo(forwardRef(PlanetPanel));
