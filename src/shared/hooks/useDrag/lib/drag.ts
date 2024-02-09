import Vector from 'src/shared/lib/geometry/vector';

export interface DragProps {
    dragInitiator: HTMLElement;
    step?: number;
    onStart?: () => void;
    onMove?: (trans: Vector) => void;
    onEnd?: (trans: Vector) => void;
    isReset?: boolean;
}

export const drag = (props: DragProps) => {
    const {
        dragInitiator, step = 1, isReset = false, onStart, onMove, onEnd,
    } = props;

    let start = new Vector(0, 0);
    dragInitiator.addEventListener('mousedown', toStart);

    function toStart(event: MouseEvent) {
        start = new Vector(event);

        document.addEventListener('mousemove', toMove);
        document.addEventListener('mouseup', toEnd);

        onStart?.();
    }

    let trans = new Vector(0, 0);
    function toMove(event: MouseEvent) {
        const tmp = new Vector(event).sub(start).map(([_, c]) => Math.floor(c / step) * step);
        if (tmp.x !== trans.x || tmp.y !== trans.y) {
            trans = tmp;
            onMove?.(trans);
        }
    }

    function toEnd() {
        document.removeEventListener('mousemove', toMove);
        document.removeEventListener('mouseup', toEnd);
        onEnd?.(trans);
    }

    return toStart;
};
