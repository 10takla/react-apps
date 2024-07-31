import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef,
} from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import InputRange from "S/ui/Kit/Input/ui/InputRange/InputRange";
import { useDispatch, useSelector } from 'react-redux';
import { SceneScheme } from "src/wasm/app/providers/SceneProvider/SceneProvider";
import { planetActions } from "src/wasm/app/providers/SceneProvider/slices/planetSlice";
import cls from './FieldSettings.module.scss';

type El = ElementRef<typeof HStack> | null;

interface FieldSettingsProps extends ComponentProps<typeof HStack> {

}

const FieldSettings = (props: FieldSettingsProps, ref: ForwardedRef<El>) => {
    const {
        className,
        ...otherProps
    } = props;

    const fieldSettingsRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => fieldSettingsRef.current,
    );

    const dispatch = useDispatch();
    const { sizes, scales: { pointsField, points } } = useSelector((state: SceneScheme) => state.planet);

    return (
        <HStack
            className={classNames(cls.FieldSettings, [className])}
            ref={fieldSettingsRef}
            {...otherProps}
        >
            <VStack>
                <InputRange
                    min={0}
                    max={1}
                    values={[pointsField]}
                    onChange={(si) => {
                        dispatch(planetActions.setState({ scales: { pointsField: si[0] } }));
                    }}
                />
                <InputRange
                    min={0}
                    max={5}
                    step={1}
                    values={[points]}
                    onChange={(si) => {
                        dispatch(planetActions.setState({ scales: { points: si[0] } }));
                    }}
                />
            </VStack>
            <VStack>
                {sizes.map((size, i) => (
                    <InputRange
                        key={i}
                        min={0}
                        max={100}
                        step={1}
                        values={[size * 100]}
                        onChange={(si) => {
                            dispatch(planetActions.setState({ sizes: sizes.toSpliced(i, 1, si[0] / 100) }));
                        }}
                    />
                ))}
            </VStack>
        </HStack>
    );
};

export default memo(forwardRef(FieldSettings));
