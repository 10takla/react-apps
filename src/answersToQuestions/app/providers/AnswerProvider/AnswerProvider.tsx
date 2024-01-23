import { ReactNode, memo } from 'react';
import StoreProvider, { StoreProviderProps } from 'src/shared/stateManagers/store/storeProvider';
import { NewSubjectState, newSubjectReducer } from './slices/newSubjectSlice';
import { SubjectsState, subjectsReducer } from './slices/subjectsSlice';

export interface AnswerScheme {
    newSubject: NewSubjectState
    subjects: SubjectsState,
}

interface AnswerProviderProps extends Pick<StoreProviderProps<AnswerScheme>, 'initialState'>{
    children: ReactNode
}

const AnswerProvider = (props: AnswerProviderProps) => {
    const {
        children,
        initialState,
    } = props;

    const rootReducers = {
        newSubject: newSubjectReducer,
        subjects: subjectsReducer,
    };

    return (
        <StoreProvider {...{ rootReducers, initialState }}>
            {children}
        </StoreProvider>
    );
};

export default memo(AnswerProvider);
