import { useGetNotificationsQuery } from 'apps/head-office/app/api/services/notifications/notification.service';
import { Button } from 'primereact/button';
import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import { BaseTable } from '../BaseTable/BaseTable';
import AddNotificationModal from './AddNotificationModal';
import { NOTIFICATION_TABLE_COLUMNS } from './Notification.constant';

const NotificationsSection: React.FC = () => {
  const { data: notifications } = useGetNotificationsQuery({});

  const { openModal } = useModalManager();

  const openAddNotificationModal = () => {
    openModal('addNotification', <AddNotificationModal />);
  };

  const tableHeader = () => {
    return (
      <div className="">
        <Button
          className={`${BRAND_PREFIX}-table-header-a  dd-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
          icon="pi pi-plus text-white"
          id={`${BRAND_PREFIX}-table-header-add-button`}
          rounded
          type="button"
          onClick={openAddNotificationModal}
        />
      </div>
    );
  };

  return (
    <div className={`${BRAND_PREFIX}-notifications-page wrapper flex`}>
      <BaseTable
        columns={NOTIFICATION_TABLE_COLUMNS}
        // @ts-ignore
        data={notifications || []}
        tableHeader={tableHeader}
        globalFilterFields={['title', 'content', 'notificationType', 'category']}
        id={'notifications'}
      />
    </div>
  );
};

export default NotificationsSection;
