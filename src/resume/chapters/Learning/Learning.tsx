import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Learning.module.scss';
import Books from 'src/resume/ui/Books/Books';
import Education from 'src/resume/ui/Education/Education';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface LearningProps extends ComponentProps<Component> {

}

const Learning = (props: LearningProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const learningRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => learningRef.current,
    );

    const lefts = [
        ["Образование", <Education />],
        ["Книги", <Books />]
    ];

    return (
        <VStack
            className={classNames(cls.Learning, [className])}
            ref={learningRef}
            {...otherProps}
        >
            {lefts.map(([name, block]) => (
                <div>
                    <h3>{name}</h3>
                    {block}
                </div>
            ))}
        </VStack>
    )
};

export default memo(forwardRef(Learning));