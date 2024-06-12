import { createSlice, Reducer }from '@reduxjs/toolkit';
import type { ISearchPropertiesProps } from '../types';

const initialState: ISearchPropertiesProps = {
  searchedConditions: ['Istasyon Adi'],
  searchedText: '',
};

const searchProperties = createSlice({
  name: 'searchProperties',
  initialState,
  reducers: {
    setSearchProperties: (state, action) => {
      state.searchedConditions = action.payload.searchedConditions;
      state.searchedText = action.payload.searchedText;
    },
  },
});

export const { setSearchProperties } = searchProperties.actions;
export default searchProperties.reducer as Reducer<ISearchPropertiesProps>;
