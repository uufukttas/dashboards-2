import React, { Fragment, useEffect, useState } from 'react';
import DashboardCards from './DashboardCards';
import { getDashboardComponentInfoRequest } from '../../../app/api/dashboards';

const DashboardSection: React.FC = () => {
    const [dashboardComponentInfo, setDashboardComponentInfo] = useState();

    const getDashboardComponentInfo = async () => {
        const dashboardComponentInfo = await getDashboardComponentInfoRequest('maindashboard');

        setDashboardComponentInfo(dashboardComponentInfo.data);
    }

    useEffect(() => {
        getDashboardComponentInfo();
    }, []);

    return (
        <Fragment>
            {
                dashboardComponentInfo && (
                    <DashboardCards dashboardComponentInfo={dashboardComponentInfo} />
                )
            }
        </Fragment>
    );
};

export default DashboardSection;
