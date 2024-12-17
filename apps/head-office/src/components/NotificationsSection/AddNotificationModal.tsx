import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateNotificationBody } from '../../../app/api/services/notifications/notification.interface';
import {
  useAddNotificationMutation,
  useGetNotificationPushCategoriesQuery,
  useGetNotificationTypesQuery,
} from '../../../app/api/services/notifications/notification.service';
import useModalManager from '../../hooks/useModalManager';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutButtonProps } from '../Modal/Layouts/ModalLayout.interface';
import NotificationForm from './NotificationForm';

const AddNotificationModal = () => {
  const form = useForm();

  const { data: notificationTypes } = useGetNotificationTypesQuery();
  const { data: notificationPushCategories } = useGetNotificationPushCategoriesQuery();
  const [addNotification] = useAddNotificationMutation();
  const { closeModal } = useModalManager();

  const [image, setImage] = useState<File>();

  const onSubmit = (data: Record<string, string>) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('message', data.message);
    formData.append('startedDate', data.startedDate);
    formData.append('notificationTypeRID', data.notificationTypeRID);
    formData.append('notificationPushCategoryRID', data.notificationPushCategoryRID);
    formData.append('notificationInfoColorRID', data.notificationInfoColorRID);
    formData.append('notificationInfoTypeRID', data.notificationInfoTypeRID);

    image && formData.append('image', image);

    addNotification({
      body: formData as unknown as CreateNotificationBody,
    })
      .unwrap()
      .then(() => {
        closeModal('addNotification');
      });
  };

  const buttons: IModalLayoutButtonProps[] = [
    {
      key: 'addNotification',
      label: 'Ekle',
      buttonClassName: 'px-12 ml-4',
      onClick: () => {
        form.handleSubmit(onSubmit)();
      },
    },
  ];

  return (
    <ModalLayout name="addNotification" title="Bildirim Ekle" buttons={buttons} className="md:w-[700px]" footerVisible>
      <NotificationForm
        form={form}
        notificationTypes={notificationTypes}
        notificationPushCategories={notificationPushCategories}
        onImageUpload={setImage}
      />
    </ModalLayout>
  );
};

export default AddNotificationModal;
