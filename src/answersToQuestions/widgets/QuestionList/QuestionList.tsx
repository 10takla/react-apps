import {
    ComponentProps, useMemo, useState,
} from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import ArrowUpSvg from 'src/shared/assets/icons/arrows/arrow_up.svg';
import { classNames } from 'src/shared/lib/classNames/classNames';
import RadioButtonSvg from 'src/shared/assets/icons/radio_button.svg';
import cls from './QuestionList.module.scss';
import NestingList from './NestingList/NestingList';
import WriteMode from './NestingList/WriteMode';

interface QuestionListProps {
    questions: ComponentProps<typeof NestingList>['list']
    mode?: 'read' | 'write'
    onChange?: ComponentProps<typeof WriteMode>['onChange']
}

const QuestionList = (props: QuestionListProps) => {
    const {
        questions,
        mode = 'read',
        onChange,
    } = props;
    const [isHide, setIsHide] = useState(false);
    const [isFold, setIsFold] = useState(true);
    const [fontSize, setFontSize] = useState(1);

    const els = useMemo(() => {
        return {
            read: (
                <NestingList
                    className={cls.nestingList}
                    style={{
                        fontSize: `${fontSize}em`,
                    }}
                    list={questions}
                    isHide={isHide}
                    isFold={isFold}
                />
            ),
            write: (
                <WriteMode
                    className={cls.nestingList}
                    style={{
                        fontSize: `${fontSize}em`,
                    }}
                    list={questions}
                    onChange={(v) => {
                        onChange?.(v);
                    }}
                />
            ),
        };
    }, [fontSize, isFold, isHide, onChange, questions]);

    return (
        <VStack
            className={cls.QuestionList}
            align="stretch"
            justify="between"
        >
            {els[mode]}
            <HStack
                className={cls.foot}
                align="center"
            >
                <input
                    type="range"
                    value={fontSize}
                    min={0.7}
                    max={1.4}
                    step={0.005}
                    onChange={(e) => {
                        setFontSize(Number(e.target.value));
                    }}
                />
                <HStack gap={8} className={cls.hideFold}>
                    <RadioButtonSvg
                        onClick={() => {
                            setIsHide(!isHide);
                        }}
                    />
                    <ArrowUpSvg
                        className={classNames(
                            cls.arrow,
                            { [cls.hide]: isFold },
                        )}
                        onClick={() => {
                            setIsFold(!isFold);
                        }}
                    />
                </HStack>
            </HStack>
        </VStack>

    );
};
export default QuestionList;
