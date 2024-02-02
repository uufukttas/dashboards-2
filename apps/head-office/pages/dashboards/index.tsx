import React from 'react'
import '../../app/global.css'
import '../../src/styles/style.css'
import { Sidebar } from '../../src/components/Sidebar/Sidebar'
import { Section } from '../../src/components/Section/Section'
import { Provider } from 'react-redux'
import { store } from '../../app/redux/store'
import { Header } from '../../src/components/Header/Header'

const Dashboards = () => {
  return (
    <Provider store={store}>
      <div className='sh-dashboard-container w-full h-screen flex'>
        <Sidebar />
        <div className='w-full h-screen bg-white'>
          <Header className={`h-[77px] flex items-center w-full`} />
          <Section />
        </div>
      </div >
    </Provider>
  )
}

export default Dashboards