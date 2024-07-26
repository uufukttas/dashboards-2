import { createSlice, Reducer } from '@reduxjs/toolkit';
import { ILanguageStateProps } from '../types';

const initialState: ILanguageStateProps = {
    languages: [],
};

export const languages = createSlice({
    name: 'languages',
    initialState,
    reducers: {
        setLanguages: (state, action) => {
            state.languages = action.payload;
        },
    },
});

export const { setLanguages } = languages.actions;
export default languages.reducer as Reducer;
