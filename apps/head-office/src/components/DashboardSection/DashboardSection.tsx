import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import DashboardCards from './DashboardCards';

const DashboardSection = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isModalVisible = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

    // useEffect(() => {
    //     dispatch(toggleLoadingVisibility(!isModalVisible));
    //     console.log('isModalVisible', isModalVisible)
    // }, []);

    return (
        <DashboardCards />
    )
}

export default DashboardSection;
