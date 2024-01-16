import { useTranslation } from 'react-i18next';
import React, { memo, useState } from 'react';
import { Button } from 'src/shared/ui/Kit/Button';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack, VStack } from 'src/shared/ui/Stack';
import cls from './Word.module.scss';
import { Input } from './ui/Input';

export interface WordProps {
    className?: string;
    word?: string;
    translate?: string;
    examples?: string[];
}

export const Word = memo((props: WordProps) => {
    const {
        className,
        word,
        translate,
        examples,
    } = props;
    const { t } = useTranslation();
    const [isOpenExamples, setIsOpenExamples] = useState(false);

    return (
        <HStack className={classNames(cls.Word, {}, [className])}>
            <HStack>
                <Input value={word} />
                -
                <Input value={translate} />
                <Button onClick={() => setIsOpenExamples(!isOpenExamples)}>
                    {isOpenExamples ? '˄' : '˅'}
                </Button>
                {/* <Button onClick={onGenerateExamples}> */}
                {/*     Generate examples */}
                {/* </Button> */}
            </HStack>
            {examples && isOpenExamples && (
                <VStack>
                    {examples.map((example) => <span>{example}</span>)}
                </VStack>
            )}
        </HStack>
    );
});
