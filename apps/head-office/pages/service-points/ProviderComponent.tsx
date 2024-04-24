import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';

const ProviderComponent = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ProviderComponent;