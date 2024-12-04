import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutProps } from '../Modal/Layouts/ModalLayout.interface';

interface INotificationDeliveryModalProps {
  notificationId: number;
}

const NotificationDeliveryModal = ({ notificationId }: INotificationDeliveryModalProps) => {
  const modalConfig: IModalLayoutProps = {
    name: 'notification-delivery',
    title: 'Bildirim Teslim Detayı',
  };

  return (
    <ModalLayout {...modalConfig}>
      <>
        <div>
          <h1>Bildirim Teslim Detayı</h1>
        </div>
      </>
    </ModalLayout>
  );
};

export default NotificationDeliveryModal;
