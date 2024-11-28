export interface INotificationTypeList {
  rid: number;
  name: string;
}

export interface INotificationPushCategory {
  rid: number;
  name: string;
}

export interface CreateNotificationBody {
  notificationTypeRID: number;
  notificationPushCategoryRID: number;
  userRID: number;
  title: string;
  message: string;
  imageUrl: string;
  startedDate: string;
}
