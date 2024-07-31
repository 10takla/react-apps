import { memo, ComponentProps } from 'react';
import { HStack } from "S/ui/Stack";
import getRgbGradient from "S/lib/getRgbGradient/getRgbGradient";
import { TrackProps } from '../../Track';
import { classNames } from "S/lib/classNames/classNames";

interface TracksProps extends
    Pick<TrackProps, 'values' | 'max' | 'min'>,
    ComponentProps<typeof HStack> {
    sliderMaxWidth: number
    factor: number
}

const Tracks = (props: TracksProps) => {
    const {
        className,
        values,
        max,
        min,
        sliderMaxWidth,
        factor,
    } = props;

    const getOffset = (a: number) => {
        return ((a ?? min) - min) / factor + sliderMaxWidth / 2
    }
    const getWidth = (a: number, b: number) => {
        return (a - (b ?? min)) / factor
    }

    return (
        <>
            {values.map((v, i) => (
                <div
                    key={i}
                    className={className}
                    style={{
                        background: getRgbGradient(i + 1, {}),
                        '--offset': `${getOffset(values[i - 1])}px`,
                        '--width': `${getWidth(v, values[i - 1])}px`,
                        '--height': `${sliderMaxWidth}px`,
                    }}
                />
            ))}
            <div
                className={className}
                style={{
                    background: getRgbGradient(values.length + 1, {}),
                    '--offset': `${getOffset(values[values.length - 1])}px`,
                    '--width': `${getWidth(max, values[values.length - 1])}px`,
                    '--height': `${sliderMaxWidth}px`,
                }}
            />
        </>
    );
};

export default memo(Tracks);
