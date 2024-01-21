import { useState, useEffect } from 'react';
import { HStack, VStack } from 'src/shared/ui/Stack';
import List from 'src/shared/ui/Stack/List/List';
import CrossSvg from 'src/shared/assets/icons/cross.svg';
import { Link } from 'react-router-dom';
import QuestionList from '../QuestionList/QuestionList';

interface SubjectProps {
    subjectName: string,
    onChangeSubjectName?: (subjectName: SubjectProps['subjectName']) => void
    questions: string[],
    onChangeQuestions?:(questions: SubjectProps['questions']) => void
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

    return (
        <VStack gap={16}>
            <input
                placeholder="название предемета"
                value={postSubjectName}
                onChange={(e) => {
                    const newSubjetName = e.target.value;
                    setPostSubjectName(newSubjetName);
                    onChangeSubjectName?.(newSubjetName);
                }}
            />
            <HStack>
                <QuestionList questions={postQuestions} />
                {/* <VStack>
                    <List>
                        {postQuestions.map((question, i) => (
                            <HStack key={i}>
                                <input
                                    value={question}
                                    placeholder={`вопрос № ${i + 1}`}
                                    onChange={(e) => {
                                        const newQuestions = postQuestions.toSpliced(i, 1, e.target.value);
                                        setPostQuestions(newQuestions);
                                        onChangeQuestions?.(newQuestions);
                                    }}
                                />
                                <CrossSvg onClick={() => {
                                    const newQuestions = postQuestions.toSpliced(i, 1);
                                    setPostQuestions(newQuestions);
                                    onChangeQuestions?.(newQuestions);
                                }}
                                />
                            </HStack>
                        ))}
                    </List>
                    <input
                        placeholder={`вопрос № ${postQuestions.length + 1}`}
                        onBlur={(e) => {
                            const newQuestions = [...postQuestions, e.target.value];
                            setPostQuestions(newQuestions);
                            onChangeQuestions?.(newQuestions);
                            e.target.value = '';
                        }}
                    />
                </VStack>
                <textarea
                    placeholder="json"
                    onBlur={(e) => {
                        const parsedQuestions = JSON.parse(e.target.value);
                        if (Array.isArray(parsedQuestions)) {
                            const newQuestions = [...postQuestions, ...parsedQuestions];
                            setPostQuestions(newQuestions);
                            onChangeQuestions?.(newQuestions);
                        }
                    }}
                /> */}
            </HStack>
            <Link
                to="/answers"
                onClick={() => onSave(postSubjectName, postQuestions)}
            >
                сохранить
            </Link>
        </VStack>
    );
};

export default Subject;
