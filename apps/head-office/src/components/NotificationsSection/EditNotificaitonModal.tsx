import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IEditNotificationBody, INoficication } from '../../../app/api/services/notifications/notification.interface';
import {
  useEditNotificationMutation,
  useGetNotificationPushCategoriesQuery,
  useGetNotificationTypesQuery,
} from '../../../app/api/services/notifications/notification.service';
import useModalManager from '../../hooks/useModalManager';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutButtonProps } from '../Modal/Layouts/ModalLayout.interface';
import NotificationForm from './NotificationForm';

interface EditNotificationModalProps {
  notificationId: number;
  notification?: INoficication;
}

const EditNotificationModal = ({ notificationId, notification }: EditNotificationModalProps) => {
  const form = useForm();

  const { data: notificationTypes } = useGetNotificationTypesQuery();
  const { data: notificationPushCategories } = useGetNotificationPushCategoriesQuery();

  const [editNotification] = useEditNotificationMutation();
  const { closeModal } = useModalManager();

  const [image, setImage] = useState<File>();

  const onSubmit = (data: Record<string, string>) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('message', data.message);
    formData.append('startedDate', data.startedDate);
    formData.append('notificationTypeRID', data.notificationTypeRID);
    formData.append('notificationPushCategoryRID', data.notificationPushCategoryRID);
    formData.append('notificationId', notificationId.toString());
    formData.append('notificationInfoTypeRID', data.notificationInfoTypeRID);
    formData.append('notificationInfoColorRID', data.notificationInfoColorRID);
    image && formData.append('image', image);

    editNotification({
      body: formData as unknown as IEditNotificationBody,
    })
      .unwrap()
      .then(() => {
        closeModal('editNotification');
      });
  };

  const buttons: IModalLayoutButtonProps[] = [
    {
      key: 'editNotification',
      label: 'Düzenle',
      buttonClassName: 'px-12 ml-4',
      onClick: () => {
        form.handleSubmit(onSubmit)();
      },
    },
  ];

  useEffect(() => {
    if (notification) {
      form.reset({
        title: notification.title,
        message: notification.message,
        startedDate: notification.startedDate,
        notificationTypeRID: notification.notificationTypeRID,
        notificationPushCategoryRID: notification.notificationPushCategoryRID,
        notificationInfoTypeRID: notification.notificationInfoTypeRID,
        notificationInfoColorRID: notification.notificationInfoColorRID,
      });
    }
  }, [notification]);

  return (
    <ModalLayout name="editNotification" title="Bildirim Düzenle" buttons={buttons}>
      <NotificationForm
        form={form}
        notificationTypes={notificationTypes}
        notificationPushCategories={notificationPushCategories}
        onImageUpload={setImage}
      />
    </ModalLayout>
  );
};

export default EditNotificationModal;
