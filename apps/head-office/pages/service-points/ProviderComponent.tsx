import React from 'react'
import { Provider } from 'react-redux';
import ServicePointsPageWrapper from '../../src/components/ServicePointSection/ServicePointPageWrapper'
import { store } from '../../app/redux/store';

export default function ProviderComponent({
  children
}: { children: React.ReactNode; }) {
  return (
    <Provider store={store}>
      <ServicePointsPageWrapper />
    </Provider>
  );
};