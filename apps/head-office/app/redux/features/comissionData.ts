import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IComissionDataStateProps } from '../types';

const initialState: IComissionDataStateProps[] = [{
    ForInvestor: 0,
    ID: 1,
    IsActive: true,
    LocationRelatedID: null,
    LocationType: null,
    LocationTypeName: 'Varsayilan',
    OwnerID: 1,
    OwnerName: 'Tumu',
    OwnerType: 1,
    OwnerTypeName: 'Tumu',
    RID: 1,
    Rate: 0,
    TariffSubFractionTypeID: 1,
    TariffSubFractionTypeName: 'Tumu',
}];

const comissionData = createSlice({
    name: 'comissionData',
    initialState,
    reducers: {
        setComissionData: (state, action) => {
            return action.payload;
        },
    },
});

export const { setComissionData } = comissionData.actions;
export default comissionData.reducer as Reducer<IComissionDataStateProps[]>;
