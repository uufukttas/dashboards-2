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
  notificationInfoColorRID: number;
  notificationInfoTypeRID: number;
}

export interface INotificationDelivery {
  rid: number;
  notificationRID: number;
  userRID: number;
  deliveryDate: string;
  isDelivered: boolean;
  messageID: number;
  deliveryAttempts: number;
}

export interface IGetNotificationDeliveryListParams {
  notificationId: number;
}

export interface IEditNotificationBody extends CreateNotificationBody {
  NotificaitonId: number;
}

export interface ICancelNotificationBody {
  notificationId: number;
}

export interface INotificationInfoType {
  rid: number;
  name: string;
  imageCdnUrl: string;
}

export interface INotificationInfoColor {
  rid: number;
  name: string;
  hexCode: string;
}
