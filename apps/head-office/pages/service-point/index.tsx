import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../app/redux/store'
import MainPage from '../../src/components/MainPage/MainPage'
import ServicePointSectionComponent from '../../src/components/ServicePointSectionComponent/ServicePointSectionComponent'
import '../../app/global.css'
import '../../src/styles/style.css'

const ServicePoint = () => {
    return (
        <Provider store={store}>
            <MainPage>
                <ServicePointSectionComponent />
            </MainPage>
        </Provider >
    )
}

export default ServicePoint