import SubjectRoutesPage from 'src/answersToQuestions/pages/SubjectRoutesPage/SubjectRoutesPage';
import answers from 'A/shared/const/answers.json';
import AnswerProvider, { AnswerScheme } from './providers/AnswerProvider/AnswerProvider';

const App = () => {
    const initialState: AnswerScheme = {
        subjects: answers,
    };
    return (
        <AnswerProvider initialState={initialState}>
            <SubjectRoutesPage />
        </AnswerProvider>
    );
};
export default App;
