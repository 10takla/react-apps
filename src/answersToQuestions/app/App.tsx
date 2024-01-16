import { Link, Route, Routes } from 'react-router-dom';
import answers from 'A/shared/const/answers.json';
import { VStack } from 'src/shared/ui/Stack';
import QuestionList from '../widgets/QuestionList/QuestionList';

const App = () => {
    return (
        <Routes>
            <Route
                index
                element={(
                    <VStack>
                        {Object.entries(answers).map(([subject, questions]) => (
                            <Link
                                key={subject}
                                to={subject}
                            >
                                {subject}
                            </Link>
                        ))}
                    </VStack>
                )}
            />
            {Object.entries(answers).map(([subject, questions]) => (
                <Route
                    key={subject}
                    path={subject}
                    element={<QuestionList questions={questions} />}
                />
            ))}
        </Routes>
    );
};
export default App;
