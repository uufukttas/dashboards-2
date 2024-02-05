import Modal from '../../src/components/Modal/Modal'
import '../../app/global.css'
import '../../src/styles/style.css'
import { Button } from '@projects/button'
import React from 'react'

const ServicePoint = () => {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <Button
                className='bg-blue-500 text-white'
                onClick={(event: React.MouseEvent<HTMLElement>) => setShowModal((prev) => !prev)}
                type="button"
            > Create New Service Point
            </Button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
        </>
    )
}

export default ServicePoint