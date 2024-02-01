import React from 'react'
import '../../app/global.css'
import '../../src/styles/style.css'
import { Sidebar } from '../../src/components/Sidebar/Sidebar'

const Dashboards = () => {
  return (
    <div className='sh-dashboard-container w-full h-screen'>
      <Sidebar />
    </div>
  )
}

export default Dashboards