import {
    ComponentProps,
    useState,
    useEffect,
} from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import getRgbGradient from 'src/shared/lib/getRgbGradient/getRgbGradient';
import { HStack, VStack } from 'src/shared/ui/Stack';
import PlusSvg from 'src/shared/assets/icons/plus.svg';
import CrossSvg from 'src/shared/assets/icons/cross.svg';
import Input from 'src/shared/ui/Kit/Input/Input';
import List, { ListItem } from 'src/shared/ui/Stack/List/List';
import Draggable, { DraggableItem } from 'src/shared/ui/Kit/Draggable/Draggable';
import cls from './NestingList.module.scss';
import NestingList from './NestingList';

type NestingArray = Array<[string, string | NestingArray]>

interface WriteModeProps extends ComponentProps<typeof NestingList> {
    onChange: (content: NestingArray) => void
}

const WriteMode = (props: WriteModeProps) => {
    const {
        list,
        nestingLevel = 0,
        style,
        className,
        children,
        onChange,
        ...otherProps
    } = props;

    const [postList, setPostList] = useState(list);
    useEffect(() => {
        setPostList(list);
    }, [list]);

    return (
        <VStack
            className={classNames(cls.NestingList, {}, [className])}
            style={{
                ...style,
                '--index': nestingLevel,
            }}
            gap={16}
            align="center"
            {...otherProps}
        >
            <List
                className={cls.list}
                gap={8}
            >
                {postList.map(([title, content], i) => (
                    <Draggable key={`${i} ${nestingLevel}`}>
                        <VStack
                            className={classNames(cls.titleContent)}
                            style={{
                                borderColor: getRgbGradient(nestingLevel, {}),
                            }}
                        >
                            <HStack
                                className={classNames(cls.title)}
                                style={{
                                    '--color': getRgbGradient(nestingLevel, {
                                        alpha: 0.4,
                                    }),
                                }}
                                justify="between"
                            >
                                <DraggableItem>
                                    <ListItem>
                                        <Input
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            value={title}
                                            onChange={(e) => {
                                                const newQuestion = e.target.value;
                                                const newList = postList.toSpliced(i, 1, [newQuestion, postList[i][1]]);
                                                onChange(newList);
                                            }}
                                        />
                                    </ListItem>
                                </DraggableItem>
                                <CrossSvg
                                    onClick={() => {
                                        const newList = postList.toSpliced(i, 1);
                                        setPostList(newList);
                                        onChange(newList);
                                    }}
                                />
                            </HStack>
                            {(Array.isArray(content)
                                ? (
                                    <WriteMode
                                        list={content}
                                        nestingLevel={nestingLevel + 1}
                                        index={i}
                                        onChange={(newContent) => {
                                            const newList = postList.toSpliced(i, 1, [postList[i][0], newContent]);
                                            onChange(newList);
                                        }}
                                    />
                                )
                                : (
                                    <Input
                                        style={{
                                            maxWidth: '100%',
                                        }}
                                        type="textarea"
                                        defaultValue={content}
                                        onChange={(e) => {
                                            const newAnswer = e.target.value;
                                            const newList = postList.toSpliced(i, 1, [postList[i][0], newAnswer]);
                                            onChange(newList);
                                        }}
                                    />
                                ))}
                        </VStack>
                    </Draggable>
                ))}
            </List>
            <HStack
                gap={16}
                align="center"
            >
                <Input
                    placeholder={`Вопрос номер ${list.length + 1}`}
                    onBlur={(e) => {
                        const newValue = String(e.target.value);
                        if (newValue.length !== 0) {
                            const newList = [...postList, [newValue, '']];
                            setPostList(newList);
                            onChange(newList);
                        }

                        e.target.value = '';
                    }}
                />
                <PlusSvg
                    onClick={() => {
                        const newList = [...postList, [undefined, []]];
                        setPostList(newList);
                        onChange(newList);
                    }}
                />
            </HStack>
        </VStack>
    );
};

export default WriteMode;
