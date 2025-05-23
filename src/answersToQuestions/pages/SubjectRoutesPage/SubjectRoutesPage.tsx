import QuestionList from 'A/widgets/QuestionList/QuestionList';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import { AnswerScheme } from "src/answersToQuestions/app/providers/AnswerProvider/AnswerProvider";
import { subjectsActions } from "src/answersToQuestions/app/providers/AnswerProvider/slices/subjectsSlice";
import AddNewSubject from "src/answersToQuestions/pages/AddNewSubject/AddNewSubject";
import Subject from "src/answersToQuestions/widgets/Subject/Subject";
import EditSvg from "S/assets/icons/edit.svg";
import CrossSvg from "S/assets/icons/cross.svg";
import { HStack, VStack } from "S/ui/Stack";
import { useAppDispatch } from "S/lib/hooks/useAppDispatch";
import { classNames } from "S/lib/classNames/classNames";
import cls from './SubjectRoutesPage.module.scss';
import TestPage from '../TestPage';

const SubjectRoutesPage = () => {
    const subjects = useSelector<AnswerScheme>((state) => {
        console.log(state);
        
        return state.subjects
    });
    const dispatch = useAppDispatch();

    const subjectsRoutes = Object.entries(subjects)
        .map(([subject, questions]) => ({
            route: subject,
            linkText: subject,
            to: <QuestionList {...{ questions }} />,
            toEdit: (
                <Subject
                    {...{ subjectName: subject, questions }}
                    onSave={(v1, v2) => {
                        dispatch(subjectsActions.changeSubject([subject, [v1, v2]]));
                    }}
                />
            ),
        }));

    const routes = [
        ...subjectsRoutes,
        {
            route: 'new',
            linkText: 'Новый предмет',
            to: <AddNewSubject />,
        },
        {
            route: 'test',
            linkText: 'Тест страница',
            to: <TestPage />,
        },
    ];
    
    return (
        <HStack
            className={cls.wrapper}
            justify="center"
        >
            <HStack
                className={cls.SubjectRoutesPage}
                justify="center"
            >
                <Routes>
                    <Route
                        index
                        element={(
                            <VStack
                                className={cls.subjectLinks}
                                align="stretch"
                                gap={8}
                            >
                                {routes.map(({
                                    route, linkText, toEdit,
                                }) => (
                                    <HStack
                                        className={classNames(cls.subject, {
                                            [cls.newSubject]: !toEdit,
                                        })}
                                        key={route}
                                        align="center"
                                        justify="between"
                                    >
                                        <Link
                                            className={cls.link}
                                            to={route}
                                        >
                                            {linkText}
                                        </Link>
                                        {toEdit && (
                                            <HStack
                                                className={cls.controlPanel}
                                            >
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
            </HStack>
        </HStack>
    );
};

export default SubjectRoutesPage;
