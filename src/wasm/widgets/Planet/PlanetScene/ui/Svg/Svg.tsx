import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext, Fragment,
} from 'react';
import { HStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import { useSelector } from 'react-redux';
import { SceneScheme } from "src/wasm/app/providers/SceneProvider/SceneProvider";
import { themeContext } from "S/providers/theme/themeContext";
import cls from './Svg.module.scss';
import { ThreeJsProps } from '../ThreeJs/ThreeJs';

type El = ElementRef<typeof HStack> | null;

interface SvgProps extends ThreeJsProps, ComponentProps<typeof HStack> {

}

const Svg = (props: SvgProps, ref: ForwardedRef<El>) => {
    const {
        className,
        points,
        sizes,
        lines,
        edges,
        colors,
        pointsC,
        bounds,
        ...otherProps
    } = props;

    const elementRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => elementRef.current,
    );

    const { scales } = useSelector((state: SceneScheme) => state.planet);
    const theme = useContext(themeContext);
    console.log(edges);
    
    return (
        <svg
            className={classNames(cls.Svg, [className, cls[theme]])}
            ref={elementRef}
            {...otherProps}
        >
            <path
                stroke={colors.hullPath}
                strokeWidth={scales.points}
                fill="none"
                d={lines.map((point, index) => {
                    const [x, y] = point;
                    return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                }).join(' ')}
            />
            {points.map((point, i) => (
                <Fragment key={i}>
                    <circle
                        cx={point[0]}
                        cy={point[1]}
                        r={scales.points}
                        fill={edges[edges.length - 1] === i
                            ? colors.findedPoint : edges.includes(i)
                                ? colors.hullPoints : colors.points}
                    />
                    <text
                        x={point[0] + 10}
                        y={point[1] - 5}
                    >
                        {pointsC[i][0].toFixed(2)}
                    </text>
                    <text
                        x={point[0] + 42}
                        y={point[1]}
                    >
                        {i}
                    </text>
                    <text
                        x={point[0] + 10}
                        y={point[1] + 10}
                    >
                        {pointsC[i][1].toFixed(2)}
                    </text>
                </Fragment>
            ))}
            <path
                stroke={colors.hullPath}
                strokeWidth={scales.points}
                fill="none"
                d={bounds.map((point, index) => {
                    const [x, y] = point;
                    return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                }).join(' ')}
            />
        </svg>
    );
};

export default memo(forwardRef(Svg));
