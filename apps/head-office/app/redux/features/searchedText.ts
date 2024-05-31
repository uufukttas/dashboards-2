import { createSlice, Reducer }from '@reduxjs/toolkit';
import type { ISearchedTextStateProps } from '../types';

const initialState: ISearchedTextStateProps = {
  searchedText: '',
};

const searchedText = createSlice({
  name: 'searchedText',
  initialState,
  reducers: {
    setSearchedText: (state, action) => {
      state.searchedText = action.payload;
    },
  },
});

export const { setSearchedText } = searchedText.actions;
export default searchedText.reducer as Reducer<ISearchedTextStateProps>;
