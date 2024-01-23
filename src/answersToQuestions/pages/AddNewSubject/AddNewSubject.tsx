import { useSelector } from 'react-redux';
import { AnswerScheme } from 'A/app/providers/AnswerProvider/AnswerProvider';
import { useAppDispatch } from 'src/shared/hooks/useAppDispatch';
import { newSubjectActions } from 'src/answersToQuestions/app/providers/AnswerProvider/slices/newSubjectSlice';
import { subjectsActions } from 'src/answersToQuestions/app/providers/AnswerProvider/slices/subjectsSlice';
import Subject from 'src/answersToQuestions/widgets/Subject/Subject';

const AddNewSubject = () => {
    const { subjectName, questions } = useSelector<AnswerScheme>((state) => state.newSubject);
    const subjects = useSelector<AnswerScheme>((state) => state.subjects);

    const dispatch = useAppDispatch();
    const onSave = (subjectName, questions) => {
        const postSubjectName = subjectName === '' ? `Предмет ${Object.keys(subjects).length + 1}` : subjectName;
        dispatch(subjectsActions.setSubjects({ [postSubjectName]: questions }));
        dispatch(newSubjectActions.removeSubjectName());
        dispatch(newSubjectActions.removeAllQuestions());
    };

    return (
        <Subject
            onSave={onSave}
            onChangeSubjectName={(v) => {
                dispatch(newSubjectActions.setSubjectName(v));
            }}
            onChangeQuestions={(v) => {
                dispatch(newSubjectActions.setQuestions(v));
            }}
            {...{ subjectName, questions }}
        />
    );
};
export default AddNewSubject;
