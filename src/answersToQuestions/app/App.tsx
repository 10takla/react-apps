import SubjectRoutesPage from 'src/answersToQuestions/pages/SubjectRoutesPage/SubjectRoutesPage';
import answers from 'A/shared/const/answers.json';
import AnswerProvider, { AnswerScheme } from './providers/AnswerProvider/AnswerProvider';

const App = () => {
    const an = ((arg) => {
        if (arg) {
            return JSON.parse(arg) as AnswerScheme;
        }
    })(localStorage.getItem('answers'));

    const initialState: AnswerScheme = {
        subjects: an || answers,
    };
    return (
        <AnswerProvider initialState={initialState}>
            <SubjectRoutesPage />
        </AnswerProvider>
    );
};
export default App;
