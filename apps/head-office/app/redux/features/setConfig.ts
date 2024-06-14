import { createSlice, Reducer }from '@reduxjs/toolkit';
import type { IResourceTextProps } from '../types';

const initialState: IResourceTextProps = {
    resourceKey: '',
    resourceValue: '', 
};

const configs = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    setConfigs: (state, action) => {
      state.colors = action.payload;
    },
  },
});

export const { setConfigs } = configs.actions;
export default configs.reducer as Reducer<IResourceTextProps>;
