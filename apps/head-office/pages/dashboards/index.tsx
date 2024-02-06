import React from 'react'
import '../../app/global.css'
import '../../src/styles/style.css'
import { Provider } from 'react-redux'
import { store } from '../../app/redux/store'
import MainPage from '../../src/components/MainPage/MainPage'
import { Card } from '../../src/components/Card/Card';

const Dashboards = () => {
  const cardBodyChildren = (
    <>
      <div className='flex justify-center items-center text-center pb-4'>Aktif Kullanicilar </div>
      <div className='flex justify-center items-center border rounded-full p-4 bg-blue-500 text-white'>
        <h2 className='text-sm flex justify-center items-end'><span className='text-2xl'>78</span>%</h2>
      </div>
    </>
  );

  return (
    <Provider store={store}>
      <div className='sh-dashboard-container w-full h-screen flex'>
        <MainPage>
          <div className='flex justify-center items-center pt-12 flex-wrap'>
            <Card
              cardBodyChildren={cardBodyChildren}
              className={'w-full xl:w-3/4 my-8 '}
              onClick={() => { }}
            />
            <Card
              cardBodyChildren={cardBodyChildren}
              className={'w-full xl:w-3/4 my-8'}
              onClick={() => { }}
            />
            <Card
              cardBodyChildren={cardBodyChildren}
              className={'w-full xl:w-3/4 my-8'}
              onClick={() => { }}
            />
            <Card
              cardBodyChildren={cardBodyChildren}
              className={'w-full xl:w-3/4 my-8'}
              onClick={() => { }}
            />
            <Card
              cardBodyChildren={cardBodyChildren}
              className={'w-full xl:w-3/4 my-8'}
              onClick={() => { }}
            />
            <Card
              cardBodyChildren={cardBodyChildren}
              className={'w-full xl:w-3/4 my-8'}
              onClick={() => { }}
            />
          </div>
        </MainPage>
      </div >
    </Provider>
  )
}

export default Dashboards