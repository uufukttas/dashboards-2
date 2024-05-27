import React from 'react';
import DashboardCards from './DashboardCards';
import StaticsPage from './StaticsPage';

const DashboardSection: React.FC = () => {
    return (
        <>
            <DashboardCards />
            <StaticsPage />
        </>
    );
};

export default DashboardSection;
