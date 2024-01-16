import { ComponentProps, useState } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import ArrowUpSvg from 'src/shared/assets/icons/arrows/arrow_up.svg';
import { classNames } from 'src/shared/lib/classNames/classNames';
import RadioButtonSvg from 'src/shared/assets/icons/radio_button.svg';
import cls from './QuestionList.module.scss';
import NestingList from './NestingList/NestingList';

interface QuestionListProps {
    questions: ComponentProps<typeof NestingList>['list']
}

const QuestionList = (props: QuestionListProps) => {
    const {
        questions,
    } = props;
    const [isHide, setIsHide] = useState(false);
    const [isFold, setIsFold] = useState(true);
    const [fontSize, setFontSize] = useState(1);

    return (
        <VStack
            className={cls.QuestionList}
            align="stretch"
        >
            <NestingList
                className={cls.nestingList}
                style={{
                    fontSize: `${fontSize}em`,
                }}
                list={questions}
                isHide={isHide}
                isFold={isFold}
            />
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
