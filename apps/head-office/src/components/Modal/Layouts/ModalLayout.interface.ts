import { PropsWithChildren } from 'react';

export interface IModalLayoutButtonProps {
  key: string;
  label: string;
  onClick: () => void;
  buttonClassName?: string;
  textClassName?: string;
}

export interface IModalLayoutProps extends PropsWithChildren {
  name: string;
  id?: string;
  className?: string;
  title: string;
  headerClassName?: string;
  subTitle?: string;
  onClose?: () => void;
  fotterClassName?: string;
  disableClose?: boolean;
  buttons?: IModalLayoutButtonProps[];
  contentClassName?: string;
  footerVisible?: boolean;
}
