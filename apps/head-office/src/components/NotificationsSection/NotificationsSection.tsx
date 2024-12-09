import { isNil } from 'lodash';
import moment from 'moment';
import Image from 'next/image';
import { Button } from 'primereact/button';
import React from 'react';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { INoficication } from '../../../app/api/services/notifications/notification.interface';
import {
  useCancelNotificationMutation,
  useGetNotificationInfoTypeListQuery,
  useGetNotificationsQuery,
} from '../../../app/api/services/notifications/notification.service';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import { BaseTable } from '../BaseTable/BaseTable';
import { TableRowClickEvent } from '../BaseTable/BaseTableInterface';
import ConfirmationModal from '../Modals/ConfirmationModal';
import AddNotificationModal from './AddNotificationModal';
import EditNotificationModal from './EditNotificaitonModal';
import { NOTIFICATION_TABLE_COLUMNS } from './Notification.constant';
import NotificationDeliveryModal from './NotificationDeliveryModal';

const NotificationsSection: React.FC = () => {
  const { data: notifications } = useGetNotificationsQuery({});
  const { data: notificationInfoTypes } = useGetNotificationInfoTypeListQuery();
  const [cancelNotification] = useCancelNotificationMutation();

  const { openModal, closeModal } = useModalManager();

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

  const handleEditNotification = (id: number) => {
    openModal(
      'editNotification',
      <EditNotificationModal
        notificationId={id}
        notification={notifications?.find((notification) => notification.rid === id)}
      />,
    );
  };

  const handleCancelNotification = (id: number) => {
    openModal(
      'cancelNotification',
      <ConfirmationModal
        name="cancelNotification"
        onConfirm={() =>
          cancelNotification({ body: { notificationId: id } })
            .unwrap()
            .then(() => {
              closeModal('cancelNotification');
            })
        }
      />,
    );
  };

  const handleRowClick = (e: TableRowClickEvent<INoficication>) => {
    openModal('notification-delivery', <NotificationDeliveryModal notificationId={e.rowData.rid} />);
  };

  const actionsButtonsContainer = (rowData: INoficication): JSX.Element => {
    return (
      <div className={`${BRAND_PREFIX}-data-table-actions-button-container flex justify-start items-center`}>
        <a
          className="font-medium text-blue-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
          onClick={(e) => {
            e.stopPropagation();
            handleEditNotification(rowData.rid);
          }}
        >
          <FaPen className="text-primary" />
        </a>
        <a
          className="font-medium text-red-600 cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
          onClick={(e) => {
            e.stopPropagation();
            handleCancelNotification(rowData.rid);
          }}
        >
          <FaTrashCan />
        </a>
      </div>
    );
  };

  const renderNotificationInfoType = (notification: INoficication) => {
    const notificationInfoType = notificationInfoTypes?.find(
      (type) => type.rid === notification.notificationInfoTypeRID,
    );
    return (
      <div className="flex items-center gap-2">
        <Image
          src={notificationInfoType?.imageCdnUrl || ''}
          alt={notificationInfoType?.name || ''}
          width={24}
          height={24}
        />
        <span>{notificationInfoType?.name}</span>
      </div>
    );
  };

  const renderNotificationImage = (notification: INoficication) => {
    const notificationImage = notification.imageUrl;

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      window.open(notificationImage, '_blank');
    };

    if (notificationImage) {
      return (
        <div className="flex items-center gap-2" onClick={handleImageClick}>
          <Image
            src={notificationImage}
            alt="notification"
            width={100}
            height={100}
          />
        </div>
      );
    }
    return null;
  };

  const getNotificationList = () => {
    return notifications?.map((notification) => {
      const timeDiff = moment().diff(moment(notification.startedDate, 'YYYY-MM-DDTHH:mm:ss'), 'minutes');

      return {
        ...notification,
        notificationInfoTypeRID: !isNil(notification.notificationInfoTypeRID)
          ? renderNotificationInfoType(notification)
          : null,
        notificationImage: notification.imageUrl ? renderNotificationImage(notification) : null,
        actions: notification.startedDate && timeDiff <= -3 ? actionsButtonsContainer(notification) : null,
      };
    });
  };

  return (
    <div className={`${BRAND_PREFIX}-notifications-page wrapper flex`}>
      <BaseTable
        columns={NOTIFICATION_TABLE_COLUMNS}
        data={getNotificationList() || []}
        tableHeader={tableHeader}
        globalFilterFields={['title', 'message', 'notificationType', 'notificationPushCategoryName']}
        id={'notifications'}
        // @ts-ignore
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default NotificationsSection;
