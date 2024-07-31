import { useTexture } from '@react-three/drei';
import { ElementRef, ForwardedRef, forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { HStack } from "S/ui/Stack";
import { BackSide } from "three";

type El = ElementRef<typeof HStack> | null;

interface EnveronmentProps{

}

const Enveronment = (props: EnveronmentProps, ref: ForwardedRef<El>) => {
    const {
        ...otherProps
    } = props;

    const enveronmentRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => enveronmentRef.current,
    );

    const texture = useTexture("src/market/shared/assets/textures/galaxy.png")
        
    return (
        <mesh>
            <sphereGeometry args={[100, 32, 16]} />
            <meshBasicMaterial side={BackSide} map={texture} />
        </mesh>
    );
};


export default memo(forwardRef(Enveronment));