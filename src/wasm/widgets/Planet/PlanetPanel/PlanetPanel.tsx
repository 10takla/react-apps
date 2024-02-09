import {
    forwardRef, memo, ForwardedRef, ComponentProps,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { Button } from 'src/shared/ui/Kit/Button';
import { planetActions } from 'src/wasm/pages/ScenePage/SceneProvider/slices/planetSlice';
import Input from 'src/shared/ui/Kit/Input/Input';
import { SceneScheme } from 'src/wasm/pages/ScenePage/SceneProvider/SceneProvider';
import cls from './PlanetPanel.module.scss';

type El = HTMLElement | undefined;

interface PlanetPanelProps extends ComponentProps<typeof HStack> {
}

const PlanetPanel = (props: PlanetPanelProps, ref: ForwardedRef<El>) => {
    const {
        className,
    } = props;

    const dispatch = useDispatch();
    const { pointCount, sizes } = useSelector((state: SceneScheme) => state.planet);

    return (
        <HStack
            className={classNames(cls.PlanetPanel, [className])}
            align="center"
        >
            <Button
                onClick={() => {
                    dispatch(planetActions.setTrigger());
                }}
            >
                tick
            </Button>
            <Input
                type="number"
                value={pointCount}
                onChange={(e) => {
                    const pointCount = Number(e.target.value);
                    dispatch(planetActions.setState({ pointCount }));
                }}
            />
            <VStack>
                {sizes.map((size, i) => (
                    <Input
                        type="number"
                        value={size}
                        onChange={(e) => {
                            const pointCount = Number(e.target.value);
                            dispatch(planetActions.setState({ sizes: sizes.toSpliced(i, 1, pointCount) }));
                        }}
                    />
                ))}
            </VStack>
        </HStack>
    );
};

export default memo(forwardRef(PlanetPanel));
