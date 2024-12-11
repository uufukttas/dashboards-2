export interface IImageDataProps {
  cdnUrl: string;
  fileName: string;
  id: number;
  sortOrder: number;
  stationId: number;
}

export interface ImageSliderLayoutProps {
  children: ReactNode;
  clickedImageId: number;
  stationId: number;
}
export interface IModalBodyProps {
  children: React.ReactNode;
}
export interface IModalHeaderProps {
  modalHeaderTitle: string;
  onClose?: () => void;
}
export interface IModalProps {
  children: React.ReactNode;
  className?: string;
  modalContainerClassName?: string;
  modalHeaderTitle: string;
  modalId: string;
  onClose?: () => void;
}
