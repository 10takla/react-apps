import {
    ComponentProps,
    useState,
    useEffect,
    forwardRef,
    useCallback,
} from 'react';
import { classNames } from "S/lib/classNames/classNames";
import getRgbGradient from "S/lib/getRgbGradient/getRgbGradient";
import { HStack, VStack } from "S/ui/Stack";
import PlusSvg from "S/assets/icons/plus.svg";
import CrossSvg from "S/assets/icons/cross.svg";
import Input from "S/ui/Kit/Input/Input";
import DraggableItem from "S/ui/Kit/Draggable/ui/DraggableItem";
import { SwapList } from "S/ui/Kit/SwapList";
import RadioButtonSvg from "S/assets/icons/radio_button.svg";
import { FoldTransition } from "S/ui/Animations/FoldTransition";
import { Button } from "S/ui/Kit/Button";
import { useSelector } from 'react-redux';
import { AnswerScheme } from "src/answersToQuestions/app/providers/AnswerProvider/AnswerProvider";
import { htmlToText } from 'html-to-text';
import { ListItem } from "S/ui/Stack/List/List";
import cls from './NestingList.module.scss';
import NestingList from './NestingList';

const Tmp = forwardRef(({
    isHide, isTotalHide, isFold, nestingLevel, title,
    postList, onChange, isChatGpt,
    setPostList, content, i,
}, ref) => {
    const [isPostHide, setIsPostHide] = useState(isHide);
    useEffect(() => {
        setIsPostHide(isHide);
    }, [isHide]);
    useEffect(() => {
        setIsPostHide(isTotalHide);
    }, [isTotalHide]);

    const [isPostFold, setIsPostFold] = useState(isFold);
    useEffect(() => {
        setIsPostFold(isFold);
    }, [isFold]);

    const [isSendChat, setIsSendChat] = useState(isChatGpt);
    useEffect(() => {
        setIsSendChat(isChatGpt);
    }, [isChatGpt]);

    const [isChatError, setIsChatError] = useState(false);

    const onChangeByAnswer = useCallback((newAnswer: string) => {
        const newList = postList.toSpliced(i, 1, [postList[i][0], newAnswer]);
        onChange(newList);
    }, [i, onChange, postList]);

    const subjectName = useSelector<AnswerScheme>((state) => state.newSubject.subjectName);

    useEffect(() => {
        if (isSendChat && typeof content === 'string') {
            console.log(title);
            const prompt = `Дай ответ на экзаменационный вопрос по предмету ${subjectName}. Вопрос: ${content}`;

            // fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: 'Bearer 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',
            //     },
            //     body: JSON.stringify({
            //         prompt,
            //         max_tokens: 60,
            //     }),
            // })
            //     .then((response) => response.json())
            //     .then((data) => console.log(data.choices[0].text.trim()))
            //     .catch((error) => console.error('Error:', error));
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    // resolve();
                    reject();
                }, 1000);
            })
                .then(() => {
                    const newAnswer = 'chat gpt';
                    onChangeByAnswer(newAnswer);
                    setIsChatError(false);
                })
                .catch(() => {
                    const newAnswer = 'chat g';
                    onChangeByAnswer(newAnswer);
                    setIsChatError(true);
                })
                .finally(() => {
                    setIsSendChat(false);
                });
        }
    }, [content, i, isSendChat, onChange, onChangeByAnswer, postList, subjectName, title]);

    return (
        <VStack
            ref={ref}
            className={cls.titleContent}
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
                            type="textarea"
                            placeholder={`Блок номер ${i + 1}`}
                        />
                    </ListItem>
                </DraggableItem>
                <HStack>
                    {((Array.isArray(content) && (() => {
                        const t = (v) => {
                            return v.some(([_, answerOrList]) => {
                                if (Array.isArray(answerOrList)) {
                                    return t(answerOrList);
                                }
                                return !answerOrList.length;
                            });
                        };
                        return t(content);
                    })())
                        || (!content.length || isChatError)) && (
                        isSendChat
                            ? <span>ожидание</span>
                            : (
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSendChat(!isSendChat);
                                    }}
                                >
                                    ChatGPT
                                </Button>
                            )
                    )}
                    <CrossSvg
                        onClick={() => {
                            const newList = postList.toSpliced(i, 1);
                            setPostList(newList);
                            onChange(newList);
                        }}
                    />
                    {Array.isArray(content) && (
                        <RadioButtonSvg
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsPostHide(!isPostHide);
                            }}
                        />
                    )}
                </HStack>
            </HStack>
            {!isPostHide && (Array.isArray(content)
                ? (
                    <WriteMode
                        isHide={isPostHide}
                        isFold={isPostFold}
                        list={content}
                        nestingLevel={nestingLevel + 1}
                        index={i}
                        isChatGpt={isSendChat}
                        onChange={(newContent) => {
                            const newList = postList.toSpliced(i, 1, [postList[i][0], newContent]);
                            onChange(newList);
                        }}
                    />
                )
                : (
                    <FoldTransition
                        in={!isPostFold}
                        timeout={100}
                    >
                        <Input
                            className={classNames(cls.content, { [cls.isError]: isChatError })}
                            type="textarea"
                            placeholder={`Ответ номер ${i + 1}`}
                            value={htmlToText(content, {
                                wordwrap: false,
                                ignoreImage: true,
                                preserveNewlines: true,
                                singleNewLineParagraphs: true,
                            })}
                            onChange={(e) => {
                                const newAnswer = e.target.value;
                                onChangeByAnswer(newAnswer);
                                setIsChatError(false);
                            }}
                        />
                    </FoldTransition>
                ))}
        </VStack>
    );
});

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
        isFold,
        isHide,
        isChatGpt,
        ...otherProps
    } = props;

    const [postList, setPostList] = useState(list);
    useEffect(() => {
        setPostList(list);
    }, [list]);

    const [inputValue, setInputValue] = useState('');

    const [isTotalHide, setIsTotalHide] = useState(isHide);
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
            <SwapList
                className={cls.list}
                direction="column"
                list={postList}
                mode="offset"
                type="numeric"
                gap={8}
                draggableProps={{
                    step: 1,
                    onStart: () => {
                        setIsTotalHide(true);
                    },
                    onEnd: () => {
                        setIsTotalHide(false);
                    },
                }}
                onBlur={(v) => {
                    onChange(v);
                }}
            >
                {([title, content], i) => (
                    <Tmp
                        key={`${nestingLevel} ${i}`}
                        {...{
                            isHide,
                            isTotalHide,
                            isFold,
                            isChatGpt,
                            nestingLevel,
                            title,
                            postList,
                            onChange,
                            setPostList,
                            content,
                            i,
                        }}
                    />
                )}
            </SwapList>
            <HStack
                gap={16}
                align="center"
            >
                <Input
                    value={inputValue}
                    type="textarea"
                    placeholder={`Вопрос номер ${list.length + 1}`}
                    onChange={(e) => {
                        const newValue = String(e.target.value);
                        setInputValue(newValue);
                    }}
                    onBlur={(e) => {
                        const newValue = String(e.target.value);
                        if (newValue.length !== 0) {
                            const newList = [...postList, [newValue, '']];
                            setPostList(newList);
                            onChange(newList);
                        }
                        setInputValue('');
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
