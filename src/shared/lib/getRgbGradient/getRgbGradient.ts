import convert from 'color-convert';

interface GetRgbGradientProps {
    degree?: number
    start?: [number, number, number]
    alpha?: number
    saturation?: number
}

export default (num: number, {
    saturation = 100, degree = 1, start = [255, 0, 0], alpha,
}: GetRgbGradientProps) => {
    const hsv = convert.rgb.hsv(start);
    hsv[0] = (hsv[0] + num * degree * 40) % 360;
    hsv[1] = saturation;
    hsv[2] = 90;

    const str = convert.hsv.rgb(hsv).join(', ');
    return alpha ? `rgba(${str}, ${alpha})` : `rgb(${str})`;
};
