
import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import NotificationsList from './NotificationsList';
import NotificationCreate from './NotificationCreate';

const NotificationsSection: React.FC = () => {
    return (
        <div className={`${BRAND_PREFIX}-notifications-page wrapper flex`}>
            <NotificationsList className={'w-1/3'} />
            <NotificationCreate className={'w-2/3'} />
        </div>
    )
};

export default NotificationsSection;
