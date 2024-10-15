import React from 'react'

const NotificationCreate = ({ className }: { className: string }) => {


    return (
        <div className={className}>
            <div className='flex flex-col border border-gray-300 p-2 m-2 rounded-md'>
                <div className='font-bold'>Create a Notification</div>
                <div>
                    <form className='flex flex-col'>
                        <label htmlFor='title'>Title:</label>
                        <input type='text' id='title' name='title' />
                        <label htmlFor='description'>Description:</label>
                        <input type='text' id='description' name='description' />
                        <button type='submit'>Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NotificationCreate