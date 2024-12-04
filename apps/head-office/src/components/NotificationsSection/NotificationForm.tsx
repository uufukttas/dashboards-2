import { UseFormReturn } from 'react-hook-form';
import {
  INotificationPushCategory,
  INotificationTypeList,
} from '../../../app/api/services/notifications/notification.interface';
import BaseInput from '../Base/BaseInput';
import BaseSelect from '../Base/BaseSelect';
import ImageUpload from '../Base/Image/ImageUpload';

interface NotificationFormProps {
  form: UseFormReturn;
  notificationTypes?: INotificationTypeList[];
  notificationPushCategories?: INotificationPushCategory[];
  onImageUpload: (image: File) => void;
}

const NotificationForm = ({
  form,
  notificationTypes,
  notificationPushCategories,
  onImageUpload,
}: NotificationFormProps) => {
  return (
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
        type="datetime-local"
        containerClassName="mt-6"
        rules={{ required: 'Başlangıç tarihi girilmedi' }}
      />
      <ImageUpload form={form} name="imageUrl" label="Resim" aspect={2 / 1} onSuccess={onImageUpload} />
    </div>
  );
};

export default NotificationForm;
