import React from 'react'
import '../../app/global.css'
import '../../src/styles/style.css'
import { Sidebar } from '../../src/components/Sidebar/Sidebar'
import { Provider } from 'react-redux'
import { store } from '../../app/redux/store'

const Dashboards = () => {
  return (
    <Provider store={store}>
      <div className='sh-dashboard-container w-full h-screen'>
        <aside>
          <Sidebar />
        </aside>
      </div>
    </Provider>
  )
}

export default Dashboards