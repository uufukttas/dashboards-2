import React, { Fragment } from 'react';
import DashboardCards from './DashboardCards';
import DashboardMap from './DashboardMap';
import StaticsPage from './StaticsPage';

const DashboardSection: React.FC = () => {
    return (
        <Fragment>
            <DashboardMap />
            <DashboardCards />
            <StaticsPage />
        </Fragment>
    );
};

export default DashboardSection;
