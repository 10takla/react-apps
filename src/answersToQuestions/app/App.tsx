import SubjectRoutesPage from 'src/answersToQuestions/pages/SubjectRoutesPage/SubjectRoutesPage';
import answers from 'A/shared/const/answers.json';
import DeleteSvg from 'src/shared/assets/icons/delete.svg';
import AnswerProvider, { AnswerScheme } from './providers/AnswerProvider/AnswerProvider';
import cls from './App.module.scss';

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
        <div className={cls.App}>
            <AnswerProvider initialState={initialState}>
                <SubjectRoutesPage />
            </AnswerProvider>
            <DeleteSvg
                className={cls.localStorageClear}
                onClick={() => {
                    localStorage.clear();
                    location.reload();
                }}
            />
        </div>
    );
};
export default App;
