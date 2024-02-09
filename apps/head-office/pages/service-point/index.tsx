import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../app/redux/store';
import MainPage from '../../src/components/MainPage/MainPage';
import ServicePointSection from '../../src/components/ServicePointSection/ServicePointSection'
import '../../app/global.css';
import '../../src/styles/style.css';

const ServicePoint = () => {
    return (
        <Provider store={store}>
            <MainPage>
                <ServicePointSection />
            </MainPage>
        </Provider >
    )
};

export default ServicePoint;
