import { Card } from '@projects/card';
import React from 'react'
import { BRAND_PREFIX } from '../../constants/constants';

const NotificationsList = ({ className }: { className: string }) => {
    const notifications = [{
        title: 'Notification 1',
        description: 'Description 1'
    }, {
        title: 'Notification 2',
        description: 'Description 2'
    }, {
        title: 'Notification 3',
        description: 'Description 3'
    }];

    return (
        <div className={className}>
            {
                notifications.map((notification, index) => {
                    return (
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            containerClassName={`rounded-md`}
                            key={index}
                        >
                            <div key={index} className='flex flex-col p-2 m-2'>
                                <div className='font-bold'>{notification.title}</div>
                                <div>{notification.description}</div>
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    );
};

export default NotificationsList