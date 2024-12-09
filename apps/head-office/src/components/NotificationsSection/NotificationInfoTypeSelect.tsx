import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useGetNotificationInfoTypeListQuery } from '../../../app/api/services/notifications/notification.service';
import BaseSelect from '../Base/BaseSelect';

interface INotificationInfoTypeSelectProps {
  form: UseFormReturn<FieldValues>;
}

const NotificationInfoTypeSelect = ({ form }: INotificationInfoTypeSelectProps) => {
  const { data: notificationInfoTypes } = useGetNotificationInfoTypeListQuery();

  const items = notificationInfoTypes?.map((type) => ({
    ...type,
    render: (
      <div className="flex items-center gap-2">
        <img src={type.imageCdnUrl} alt={type.name} />
        <span>{type.name}</span>
      </div>
    ),
  }));

  return <BaseSelect form={form} label="Bildirim Bilgi İkonu" name="notificationInfoTypeRID" items={items} />;
};

export default NotificationInfoTypeSelect;
