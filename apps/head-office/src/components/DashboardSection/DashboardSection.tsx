import React from 'react';
import DashboardCards from './DashboardCards';
import DashboardMap from './DashboardMap';
import StaticsPage from './StaticsPage';

const DashboardSection: React.FC = () => {
    return (
        <>
            <DashboardMap />
            <DashboardCards />
            <StaticsPage />
        </>
    );
};

export default DashboardSection;
