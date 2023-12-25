import {
    createContext, Dispatch,
    memo, SetStateAction, useContext, useEffect, useState,
} from 'react';
import { Relation } from 'M/entities/Relation/types/Relation';
import cls from './DrawRelations.module.scss';
import getRgbGradient from '@/shared/lib/getRgbGradient/getRgbGradient';

interface RelationContextProps {
    counter?: boolean;
    setCounter?: Dispatch<SetStateAction<boolean>>;
}

export const RelationContext = createContext<RelationContextProps>({});

export interface DrawRelationsProps {
    className?: string;
    relations: Array<Relation[]>;
    lineWidth?: number;
    pointsRadius?: number;
    elements: HTMLElement[][];
}

export const DrawRelations = memo((props: DrawRelationsProps) => {
    const {
        className,
        relations,
        lineWidth = 5,
        pointsRadius = 10,
        elements,
    } = props;
    const { counter } = useContext(RelationContext);
    useEffect(() => {
        // console.log(counter);
    }, [counter]);
    const [bool, setBool] = useState(false);
    useEffect(() => {
        const handler = () => {
            setBool(!bool);
        };
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('resize', handler);
        };
    }, [bool]);

    return (
        <div
            className={cls.DrawRelations}
        >
            {
                relations.map((rel, relI) => (
                    rel.slice(0, rel.length - 1)
                        .map((nodeI, index) => {
                            if (nodeI === undefined || rel[index + 1] === undefined) {
                                return;
                            }
                            const el1 = elements[index][nodeI].getBoundingClientRect();
                            const el2 = elements[index + 1][rel[index + 1]].getBoundingClientRect();
                            const color = getRgbGradient(relI, {});
                            const verticalDir = relations.length + 3;
                            const verticalInd = ((relations.length - 2) * -1 + relI);
                            const horizontalDir = 7;
                            const horizontalInd = 1;
                            // const verticalDir = relations.length + 1;
                            // const verticalInd = relI + 1;
                            // const horizontalDir = 0;
                            // const horizontalInd = relI + 1;
                            const path: [[number, number], ...number[]] = [
                                // eslint-disable-next-line no-mixed-operators
                                [el1.right, el1.top + el1.height / horizontalDir * (Math.ceil(horizontalDir / 2) - 1)],
                                // eslint-disable-next-line no-mixed-operators
                                (el2.left - el1.right) / verticalDir * (Math.ceil(verticalDir / 2) + verticalInd) + el1.right,
                                // eslint-disable-next-line no-mixed-operators
                                el2.top + el2.height / horizontalDir * (Math.ceil(horizontalDir / 2)),
                                // eslint-disable-next-line no-mixed-operators
                                (el2.left - el1.right) + el1.right,
                            ];
                            return (
                                <svg key={`${relI} ${index}`} className={cls.lineSvg}>
                                    <circle
                                        fill={color}
                                        cx={path[0][0]}
                                        cy={path[0][1]}
                                        r={pointsRadius}
                                    />
                                    <path
                                        d={`
                                        M ${path[0][0]} ${path[0][1]} 
                                        H ${path[1]}
                                        V ${path[2]}
                                        H ${path[3]}
                                        `}
                                        strokeWidth={lineWidth}
                                        stroke={color}
                                    />
                                    <circle
                                        fill={color}
                                        cx={el2.left}
                                        cy={path[2]}
                                        r={pointsRadius}
                                    />
                                </svg>
                            );
                        })
                ))
            }
        </div>
    );
});
