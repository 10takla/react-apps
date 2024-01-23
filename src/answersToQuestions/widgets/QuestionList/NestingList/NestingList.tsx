import {
    ComponentProps, ReactNode,
    useState,
    useEffect,
} from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import getRgbGradient from 'src/shared/lib/getRgbGradient/getRgbGradient';
import { HStack, VStack } from 'src/shared/ui/Stack';
import RadioButtonSvg from 'src/shared/assets/icons/radio_button.svg';
import { FoldTransition } from 'src/shared/ui/Animations/FoldTransition';
import List, { ListItem } from 'src/shared/ui/Stack/List/List';
import cls from './NestingList.module.scss';

type NestingArray = Array<[string, string | NestingArray]>

interface NestingListProps extends ComponentProps<typeof VStack> {
    list: NestingArray
    nestingLevel?: number
    isFold: boolean
    isHide: boolean
    index?: number
    children?: (index: number, nestingLevel: number) => ReactNode
}

const NestingList = (props: NestingListProps) => {
    const {
        list,
        nestingLevel = 0,
        isHide,
        isFold,
        style,
        index = 0,
        className,
        children,
        ...otherProps
    } = props;

    const [postList, setPostList] = useState(list);

    return (
        <List
            className={classNames(cls.NestingList, {}, [className])}
            align="stretch"
            style={{
                ...style,
                '--index': nestingLevel,
            }}
            gap={16}
            {...otherProps}
        >
            {postList.map(([title, content], i) => {
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
                            <ListItem>{title}</ListItem>
                            {Array.isArray(content) && (
                                <RadioButtonSvg
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsPostHide(!isPostHide);
                                    }}
                                />
                            )}
                        </HStack>
                        {
                            !isPostHide
                            && (
                                Array.isArray(content)
                                    ? (
                                        <NestingList
                                            isHide={isPostHide}
                                            isFold={isPostFold}
                                            list={content}
                                            nestingLevel={nestingLevel + 1}
                                            index={i}
                                        />
                                    )
                                    : (
                                        <FoldTransition
                                            className={cls.content}
                                            in={!isPostFold}
                                            timeout={100}
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{ __html: content }}
                                            />
                                        </FoldTransition>
                                    ))
                        }
                    </VStack>
                );
            })}
        </List>
    );
};

export default NestingList;
