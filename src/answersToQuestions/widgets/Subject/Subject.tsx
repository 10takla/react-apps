import { ComponentProps, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HStack, VStack } from "S/ui/Stack";
import Input from "S/ui/Kit/Input/Input";
import QuestionList from '../QuestionList/QuestionList';
import cls from './Subject.module.scss';

interface SubjectProps {
    subjectName: string,
    onChangeSubjectName?: (subjectName: SubjectProps['subjectName']) => void
    questions: ComponentProps<typeof QuestionList>['questions'],
    onChangeQuestions: ComponentProps<typeof QuestionList>['onChange'],
    onSave: (
        subjectName: SubjectProps['subjectName'],
        questions: SubjectProps['questions']
    ) => void
}

const Subject = (
    props: SubjectProps,
) => {
    const {
        subjectName,
        onChangeSubjectName,
        questions,
        onChangeQuestions,
        onSave,
    } = props;
    const [postSubjectName, setPostSubjectName] = useState(subjectName);
    useEffect(() => {
        setPostSubjectName(subjectName);
    }, [subjectName]);

    const [postQuestions, setPostQuestions] = useState(questions);
    useEffect(() => {
        setPostQuestions(questions);
    }, [questions]);

    const example = `[\n  ["вопрос 1", "ответ"],
  [
    "Билет 1",
    ["вопрос 1", "ответ"]
  ]\n]`;

    const placeholder = `добавить вопросы в формате json\n${example}`;
    return (
        <VStack
            className={cls.Subject}
            gap={16}
            align="center"
        >
            <HStack
                gap={8}
                align="center"
            >
                <Link
                    to="/answers"
                    onClick={() => onSave(postSubjectName, postQuestions)}
                >
                    сохранить
                </Link>
                <Input
                    type="textarea"
                    placeholder={placeholder}
                    onBlur={(e) => {
                        try {
                            const el = JSON.parse(e.target.value);
                            if (Array.isArray(el)) {
                                if (el.length === 2 && typeof el[0] === 'string') {
                                    setPostQuestions([...postQuestions, el]);
                                } else {
                                    setPostQuestions([...postQuestions, ...el]);
                                }
                            }
                            e.target.value = '';
                        } catch {

                        }
                    }}
                />
            </HStack>
            <Input
                placeholder="название предемета"
                value={postSubjectName}
                onChange={(e) => {
                    const newSubjetName = e.target.value;
                    setPostSubjectName(newSubjetName);
                    onChangeSubjectName?.(newSubjetName);
                }}
            />
            <QuestionList
                mode="write"
                questions={postQuestions}
                onChange={(newList) => {
                    setPostQuestions(newList);
                    onChangeQuestions?.(newList);
                }}
            />
        </VStack>
    );
};

export default Subject;
