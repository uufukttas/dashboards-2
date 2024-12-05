import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useGetNotificationInfoColorListQuery } from '../../../app/api/services/notifications/notification.service';
import BaseSelect from '../Base/BaseSelect';

interface INotificationInfoColorSelectProps {
  form: UseFormReturn<FieldValues>;
}

const NotificationInfoColorSelect = ({ form }: INotificationInfoColorSelectProps) => {
  const { data: notificationInfoColors } = useGetNotificationInfoColorListQuery();

  const items = notificationInfoColors?.map((color) => ({
    ...color,
    label: color.name,
    render: (
      <div>
        <span style={{ color: color.hexCode }}>{color.name}</span>
      </div>
    ),
  }));

  return <BaseSelect form={form} label="Bildirim Bilgi Renk" name="notificationInfoColorRID" items={items} />;
};

export default NotificationInfoColorSelect;
