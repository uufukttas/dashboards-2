import { useGetNotificationDeliveryListQuery } from '../../../app/api/services/notifications/notification.service';
import { BaseTable } from '../BaseTable/BaseTable';
import { IBaseTableColumn } from '../BaseTable/BaseTableInterface';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutProps } from '../Modal/Layouts/ModalLayout.interface';

interface INotificationDeliveryModalProps {
  notificationId: number;
}

const NOTIFICATION_DELIVERY_TABLE_COLUMNS: IBaseTableColumn[] = [
  {
    header: 'Tarih',
    accessor: 'deliveryDate',
    field: 'deliveryDate',
    id: 'deliveryDate',
    isRemovable: false,
    type: 'date',
  },
  {
    header: 'Teslim Durumu',
    accessor: 'isDelivered',
    field: 'isDelivered',
    id: 'isDelivered',
    isRemovable: false,
    type: 'boolean',
  },
  {
    header: 'Kullanıcı ID',
    accessor: 'userRID',
    field: 'userRID',
    id: 'userRID',
    isRemovable: false,
    type: 'number',
  },
  {
    header: 'Mesaj ID',
    accessor: 'messageID',
    field: 'messageID',
    id: 'messageID',
    isRemovable: false,
    type: 'number',
  },
  {
    header: 'Deneme Sayısı',
    accessor: 'deliveryAttempts',
    field: 'deliveryAttempts',
    id: 'deliveryAttempts',
    isRemovable: false,
    type: 'number',
  },
];

const NotificationDeliveryModal = ({ notificationId }: INotificationDeliveryModalProps) => {
  const { data: notificationDeliveries } = useGetNotificationDeliveryListQuery({ params: { notificationId } });

  const modalConfig: IModalLayoutProps = {
    name: 'notification-delivery',
    title: `Bildirim Teslim Detayı - ${notificationId}`,
  };

  const tableHeader = () => <></>;

  return (
    <ModalLayout {...modalConfig}>
      <>
        <BaseTable
          columns={NOTIFICATION_DELIVERY_TABLE_COLUMNS}
          // @ts-ignore
          data={notificationDeliveries?.data?.data || []}
          tableHeader={tableHeader}
          id={'notification-delivery'}
          globalFilterFields={['deliveryDate', 'isDelivered']}
        />
      </>
    </ModalLayout>
  );
};

export default NotificationDeliveryModal;
