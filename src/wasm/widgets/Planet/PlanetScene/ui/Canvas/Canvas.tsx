import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef,
    useEffect,
} from 'react';
import { HStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import cls from './Canvas.module.scss';
import { ThreeJsProps } from '../ThreeJs/ThreeJs';

type El = HTMLCanvasElement | null;

interface CanvasProps extends ThreeJsProps, ComponentProps<typeof HStack> {

}

const Canvas = (props: CanvasProps, ref: ForwardedRef<El>) => {
    const {
        className,
        points,
        sizes,
        lines,
        edges,
        colors,
        bounds,
        ...otherProps
    } = props;

    const canvasRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => canvasRef.current,
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = colors.points;
        points.forEach((p) => {
            ctx.arc(p[0], p[1], 4, 0, 2 * Math.PI);
            ctx.closePath();
        });
        ctx.fill();

        ctx.beginPath();
        ctx.fillRect = colors.hullPath;
        lines.forEach((l) => {
            ctx.line(l[0], l[1], l[2], l[3]);
        });

        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [colors.points, points]);

    return (
        <canvas
            className={classNames(cls.Canvas, [className])}
            ref={canvasRef}
            {...otherProps}
        />
    );
};

export default memo(forwardRef(Canvas));
