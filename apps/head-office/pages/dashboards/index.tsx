import React from 'react'
import '../../app/global.css'
import '../../src/styles/style.css'
import { Sidebar } from '../../src/components/Sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '../../app/redux/store'
import { Header } from '../../src/components/Header/Header'

const Dashboards = () => {
  return (
    <Provider store={store}>
      <div className='sh-dashboard-container w-full h-screen flex'>
          <Sidebar />
        <Header className={`h-[77px] flex items-center w-full`}/>
      </div>
    </Provider>
  )
}

export default Dashboards