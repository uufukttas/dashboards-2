export interface IUserAggrement {
  rid: number;
  confirmMessage: string;
  createDate: string;
  fileCdnUrl: string;
  isTextContent: boolean;
  path: string;
  text: string;
  title: string;
  userAgreementType: string;
  userAgreementTypeRID: number;
}

export interface IAddNewAggrement {
  UserAgreementTypeRID: number;
  Title: string;
  ConfirmMessage: string;
  PdfFile: File;
}
