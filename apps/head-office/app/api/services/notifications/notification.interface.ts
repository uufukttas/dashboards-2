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

export interface INoficication {
  rid: number;
  notificationTypeRID: number;
  notificationType: string;
  notificationPushCategoryRID: number;
  notificationPushCategoryName: string;
  userRID: number;
  userName: string | null;
  title: string;
  message: string;
  imageUrl: string;
  startedDate: string;
  processedDate: string | null;
  createdDate: string;
  isDelivery: boolean;
  deliveryDate: string;
  deliveryMessageID: number;
  deliveryAttemps: number;
}
