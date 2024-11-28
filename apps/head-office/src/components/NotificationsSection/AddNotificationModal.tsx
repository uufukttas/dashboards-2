import {
  useAddNotificationMutation,
  useGetNotificationPushCategoriesQuery,
  useGetNotificationTypesQuery,
} from 'apps/head-office/app/api/services/notifications/notification.service';
import { useForm } from 'react-hook-form';
import useModalManager from '../../hooks/useModalManager';
import BaseInput from '../Base/BaseInput';
import BaseSelect from '../Base/BaseSelect';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutButtonProps } from '../Modal/Layouts/ModalLayout.interface';

const AddNotificationModal = () => {
  const form = useForm();

  const { data: notificationTypes } = useGetNotificationTypesQuery();
  const { data: notificationPushCategories } = useGetNotificationPushCategoriesQuery();
  const [addNotification] = useAddNotificationMutation();
  const { closeModal } = useModalManager();

  const onSubmit = (data: any) => {
    addNotification({
      body: {
        userRID: 1,
        imageUrl: 'https://unsplash.com/photos/grayscale-photography-of-person-standing-on-water-A5EUGGHqs4A',
        ...data,
      },
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
    <ModalLayout name="addNotification" title="Bildirim Ekle" buttons={buttons}>
      <div className="mb-4">
        <div className="flex flex-row w-full gap-4">
          <BaseSelect
            form={form}
            label="Bildirim Tipi"
            name="notificationTypeRID"
            items={notificationTypes}
            defaultValue={notificationTypes?.[0]?.rid}
            rules={{ required: 'Bildirim tipi seçilmedi' }}
          />
          <BaseSelect
            form={form}
            label="Bildirim Kategori"
            name="notificationPushCategoryRID"
            items={notificationPushCategories}
            defaultValue={notificationPushCategories?.[0]?.rid}
            rules={{ required: 'Bildirim kategori seçilmedi' }}
          />
        </div>
        <BaseInput form={form} label="Başlık" name="title" id="title" rules={{ required: 'Başlık girilmedi' }} />
        <BaseInput
          form={form}
          label="İçerik"
          name="message"
          rules={{ required: 'İçerik girilmedi' }}
          id="message"
          isTextarea
        />
        <BaseInput
          form={form}
          label="Başlangıç Tarihi"
          name="startedDate"
          id="started_date"
          type="date"
          containerClassName="mt-6"
          rules={{ required: 'Başlangıç tarihi girilmedi' }}
        />
        <BaseInput form={form} label="Resim URL" name="imageUrl" id="image_url" type="file" inputClassName="p-4" />
      </div>
    </ModalLayout>
  );
};

export default AddNotificationModal;
