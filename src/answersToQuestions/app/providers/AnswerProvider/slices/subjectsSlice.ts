import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SubjectName = string

type Questions = Array<[string, (null | string) | Questions]>

export type SubjectsState = Record<SubjectName, Questions>

const initalState: SubjectsState = {

};

export const {
    reducer: subjectsReducer,
    actions: subjectsActions,
} = createSlice({
    name: 'subjects',
    initialState: initalState,
    reducers: {
        setSubjects(state, action: PayloadAction<SubjectsState>) {
            return {
                ...state,
                ...action.payload,
            };
        },
        changeSubject(state, action: PayloadAction<[SubjectName, [SubjectName, Questions[]]]>) {
            const [subject, [newSubject, questions]] = action.payload;

            state[subject] = state[newSubject];
            delete state[subject];
            console.log(questions);
            state[newSubject] = questions;
            return state;
        },
        removeSubject(state, action: PayloadAction<SubjectName>) {
            const subjectName = action.payload;
            delete state[subjectName];
        },
    },
});
