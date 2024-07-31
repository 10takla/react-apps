import Vector from "S/lib/geometry/vector";

export interface DragProps {
    dragInitiator: HTMLElement;
    step?: number;
    onStart?: () => void;
    onMove?: (trans: Vector) => void;
    onEnd?: (trans: Vector) => void;
    isResetPosition?: boolean;
}

export const drag = (props: DragProps) => {
    const {
        dragInitiator, step = 1, isResetPosition: isReset = false, onStart, onMove, onEnd,
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
        const pos = new Vector(event).sub(start).map(([_, c]) => Math.floor(c / step) * step);
        if (pos.x !== trans.x || pos.y !== trans.y) {
            trans = pos;
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
