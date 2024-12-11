import { FC, ReactNode, useState } from 'react';
import { Button } from '@projects/button';
import { Image } from '@projects/image';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import { BRAND_PREFIX } from '../../../constants/constants';
import useModalManager from '../../../../src/hooks/useModalManager';
import {
  useGetServicePointImagesQuery,
  useRemoveServicePointImageMutation,
} from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { IImageDataProps, ImageSliderLayoutProps } from '../types';

const ImageSliderLayout: FC<ImageSliderLayoutProps> = ({ children, clickedImageId, stationId }) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-image-slider-modal`;
  const { data: imagesData } = useGetServicePointImagesQuery({ params: { stationId: stationId } });
  const { closeModal, openModal } = useModalManager();
  const [removeServicePointImage] = useRemoveServicePointImageMutation();
  const clickedImageIndex: number = imagesData?.findIndex((image: IImageDataProps) => image.id === clickedImageId) || 0;
  const [currentIndex, setCurrentIndex] = useState(clickedImageIndex);

  const handleDelete = async (): Promise<void> => {
    if (!imagesData) {
      return;
    }

    const image = imagesData[currentIndex];
    openModal(
      'confirmation-modal',
      <ConfirmationModal name="confirmation-modal" onConfirm={() => removeServicePointImage({ id: image.id })} />,
    );
    closeModal('stationImageListModal');
  };
  const handleNext = (): void => {
    if (imagesData) setCurrentIndex((currentIndex + 1) % imagesData.length);
  };
  const handlePrevious = (): void => {
    if (imagesData) setCurrentIndex((currentIndex - 1 + imagesData.length) % imagesData.length);
  };

  if (!imagesData || imagesData.length === 0) return <></>;

  return (
    <div
      className={`${sectionPrefix}-wrapper relative p-6 bg-white rounded-lg h-[550px] flex items-center justify-center`}
    >
      <div className={`${sectionPrefix}-content-container relative flex justify-center items-center h-fit w-full`}>
        <button
          onClick={handlePrevious}
          className={`${sectionPrefix}-previous-button absolute left-4 bg-gray-500 opacity-60 text-white w-16 h-16 rounded-full`}
        >
          ‹
        </button>
        <div
          className={`${sectionPrefix}-image-content text-center w-full h-fit items-center justify-center flex flex-col self-center`}
        >
          <div className={`${sectionPrefix}-image-container items-center justify-center  overflow-scroll`}>
            <Image
              src={imagesData[currentIndex].cdnUrl}
              alt={imagesData[currentIndex].fileName}
              className={`${sectionPrefix}-image object-contain rounded-md h-fit`}
            />
          </div>
          <Button
            buttonText="Sil"
            className={`${sectionPrefix}-delete-button bg-red-500 w-32 text-white mt-4 p-2 rounded-md`}
            id="delete"
            type="button"
            onClick={handleDelete}
          />
        </div>
        <button
          onClick={handleNext}
          className={`${sectionPrefix}-next-button absolute right-4 bg-gray-500 opacity-60 text-white w-16 h-16 rounded-full`}
        >
          ›
        </button>
      </div>
      {children}
    </div>
  );
};

export default ImageSliderLayout;
