import QuestionList from 'A/widgets/QuestionList/QuestionList';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import { AnswerScheme } from 'src/answersToQuestions/app/providers/AnswerProvider/AnswerProvider';
import { subjectsActions } from 'src/answersToQuestions/app/providers/AnswerProvider/slices/subjectsSlice';
import AddNewSubject from 'src/answersToQuestions/pages/AddNewSubject/AddNewSubject';
import Subject from 'src/answersToQuestions/widgets/Subject/Subject';
import EditSvg from 'src/shared/assets/icons/edit.svg';
import CrossSvg from 'src/shared/assets/icons/cross.svg';
import { HStack, VStack } from 'src/shared/ui/Stack';
import { useAppDispatch } from 'src/wordLearner/shared/lib/hooks/useAppDispatch/useAppDispatch';

const SubjectRoutesPage = () => {
    const subjects = useSelector<AnswerScheme>((state) => state.subjects);
    const dispatch = useAppDispatch();

    const subjectsRoutes = Object.entries(subjects)
        .map(([subject, questions]) => ({
            route: subject,
            link: subject,
            to: <QuestionList {...{ questions }} />,
            toEdit: <Subject
                {...{ subjectName: subject, questions }}
                onSave={(v1, v2) => {
                    dispatch(subjectsActions.changeSubject([subject, [v1, v2]]));
                }}
            />,
        }));

    const routes = [
        ...subjectsRoutes,
        { route: 'new', link: 'add new subject', to: <AddNewSubject /> },
    ];

    return (
        <Routes>
            <Route
                index
                element={(
                    <VStack
                        style={{ width: '10em' }}
                        align="stretch"
                    >
                        {routes.map(({ route, link, edit }) => (
                            <HStack key={route} justify="between">
                                <Link
                                    to={route}
                                >
                                    {link}
                                </Link>
                                {edit && (
                                    <HStack>
                                        <Link
                                            to={`${route}/edit`}
                                        >
                                            <EditSvg />
                                        </Link>
                                        <CrossSvg
                                            onClick={() => {
                                                dispatch(subjectsActions.removeSubject(route));
                                            }}
                                        />
                                    </HStack>
                                )}
                            </HStack>
                        ))}
                    </VStack>
                )}
            />
            {routes.map(({ route, to }) => (
                <Route
                    key={route}
                    path={route}
                    element={to}
                />
            ))}
            {routes.map(({ route, toEdit }) => (
                toEdit && (
                    <Route
                        key={`${route}/edit`}
                        path={`${route}/edit`}
                        element={toEdit}
                    />
                )
            ))}
        </Routes>
    );
};

export default SubjectRoutesPage;
