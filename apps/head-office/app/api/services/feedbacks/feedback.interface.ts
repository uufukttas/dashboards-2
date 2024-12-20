export interface IFeedbackTypeValue {
  messageId: number;
  typeId: number;
  typeValue: string;
}

export interface IFeedback {
  rid: number;
  userID: number;
  userName: string | null;
  email: string;
  message: string;
  createDate: string;
  contactMessageTypeValueAggregates: IFeedbackTypeValue[];
}
