import { ComponentProps, useState, useEffect } from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import getRgbGradient from 'src/shared/lib/getRgbGradient/getRgbGradient';
import { HStack, VStack } from 'src/shared/ui/Stack';
import RadioButtonSvg from 'src/shared/assets/icons/radio_button.svg';
import { FoldTransition } from 'src/shared/ui/Animations/FoldTransition';
import cls from './NestingList.module.scss';

type NestingArray = Array<[string, string | NestingArray]>

interface NestingListProps extends ComponentProps<typeof VStack> {
    list: NestingArray
    nestingLevel?: number
    isFold: boolean
    isHide: boolean
    titleC: (v: string, i: number) => void
    children: (v: string) => void
}

const NestingList = (props: NestingListProps) => {
    const {
        list,
        nestingLevel = 0,
        isHide,
        isFold,
        style,
        className,
        children,
        titleC,
        ...otherProps
    } = props;
    return (
        <VStack
            className={classNames(cls.NestingList, {}, [className])}
            align="stretch"
            style={{
                ...style,
                '--index': nestingLevel,
            }}
            {...otherProps}
        >
            {list.map(([title, content], i) => {
                const [isPostFold, setIsPostFold] = useState(isFold);
                useEffect(() => {
                    setIsPostFold(isFold);
                }, [isFold]);

                const [isPostHide, setIsPostHide] = useState(isHide);

                useEffect(() => {
                    setIsPostHide(isHide);
                }, [isHide]);

                return (
                    <VStack
                        key={title}
                        className={classNames(cls.titleContent)}
                        align="stretch"
                        style={{
                            borderColor: getRgbGradient(nestingLevel, {}),
                        }}
                    >
                        <HStack
                            className={classNames(cls.title)}
                            style={{
                                '--color': getRgbGradient(nestingLevel, {
                                    alpha: 0.4,
                                    saturation: isPostHide ? 50 : 100,
                                }),
                            }}
                            justify="between"
                            onClick={() => {
                                if (!isPostHide) {
                                    setIsPostFold(!isPostFold);
                                } else {
                                    setIsPostHide(false);
                                }
                            }}
                        >
                            {titleC(title, i)}
                            {Array.isArray(content) && (
                                <RadioButtonSvg
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsPostHide(!isPostHide);
                                    }}
                                />
                            )}
                        </HStack>
                        {!isPostHide && (
                            Array.isArray(content)
                                ? (
                                    <NestingList
                                        isHide={isPostHide}
                                        isFold={isPostFold}
                                        list={content}
                                        nestingLevel={nestingLevel + 1}
                                    />
                                )
                                : (
                                    <FoldTransition
                                        className={cls.content}
                                        in={!isPostFold}
                                        timeout={100}
                                    >
                                        {children(content)}
                                    </FoldTransition>
                                ))}
                    </VStack>
                );
            })}
        </VStack>
    );
};

export default NestingList;
