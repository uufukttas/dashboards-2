import React from 'react';
import { Metadata } from 'next';
import DashboardsClient from './ClientComponents/DashboardClient';
import { getMapStationsList } from '../api/dashboards';
import '../../app/global.css';
import '../../src/styles/style.css';

export const metadata: Metadata = {
  title: 'Dashboards | Sharz.net',
};

const DashboardsPage = async () => {
  const { description, result, success } = await getMapStationsList();

  return (
    <DashboardsClient
      description={description}
      result={result}
      success={success}
    />
  );
};

export default DashboardsPage;
