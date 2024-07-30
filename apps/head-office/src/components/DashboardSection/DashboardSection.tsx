import React, { Fragment } from 'react';
import DashboardCards from './DashboardCards';
import StaticsPage from './StaticsPage';

const DashboardSection: React.FC = () => {
    return (
        <Fragment>
            <DashboardCards />
            <StaticsPage />
        </Fragment>
    );
};

export default DashboardSection;
