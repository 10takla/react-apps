import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface NewSubjectState {
    subjectName: string,
    questions: string[]
}

const initalState: NewSubjectState = {
    subjectName: '',
    questions: [],
};

const newSubjectSlice = createSlice({
    name: 'newSubject',
    initialState: initalState,
    reducers: {
        setSubjectName(state, action: PayloadAction<string>) {
            state.subjectName = action.payload;
        },
        removeSubjectName(state) {
            state.subjectName = '';
        },
        setQuestions(state, action: PayloadAction<string[]>) {
            state.questions = action.payload;
        },
        pushQuestion(state, action: PayloadAction<string | string[]>) {
            const newQuestions = action.payload;

            if (typeof newQuestions === 'string') {
                state.questions = [...state.questions, newQuestions];
            } else if (Array.isArray(newQuestions)) {
                state.questions = [...state.questions, ...newQuestions];
            }
        },
        changeQuestions(state, action: PayloadAction<[number, string]>) {
            const [indexQuestion, newQuestion] = action.payload;
            state.questions = state.questions.toSpliced(indexQuestion, 1, newQuestion);
        },
        removeQuestion(state, action: PayloadAction<number>) {
            const indexQuestion = action.payload;
            state.questions = state.questions.toSpliced(indexQuestion, 1);
        },
        removeAllQuestions(state) {
            state.questions = [];
        },
    },
});

export const { actions: newSubjectActions } = newSubjectSlice;
export const { reducer: newSubjectReducer } = newSubjectSlice;
