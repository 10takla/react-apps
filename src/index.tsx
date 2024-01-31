import '@/app/styles/index.scss';
import { createRoot } from 'react-dom/client';

import {
    HashRouter, Link, Route, Routes,
} from 'react-router-dom';
import AnswersToQuestions from './answersToQuestions';
import Monitors from './monitors';
import { VStack } from './shared/ui/Stack';
import WordLearner from './wordLearner';
import Wasm from './wasm';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Контейнер root не найден. НЕ удалось вмонтировать реакт приложение');
}

const root = createRoot(container);

const sites = {
    wordLearner: <WordLearner />,
    monitors: <Monitors />,
    answers: <AnswersToQuestions />,
    game_of_life: <Wasm />,
};

root.render(
    <HashRouter>
        <Routes>
            <Route
                path="/"
                element={(
                    <VStack>
                        {Object.keys(sites).map((siteName) => (
                            <Link key={siteName} to={siteName}>
                                {siteName}
                            </Link>
                        ))}
                    </VStack>
                )}
            />
            {Object.entries(sites).map(([siteName, siteElement]) => (
                <Route key={siteName} path={`${siteName}/*`} element={siteElement} />
            ))}
        </Routes>
    </HashRouter>,
);
