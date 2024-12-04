import { Button } from '@projects/button';
import { Image } from '@projects/image';
import { FC, ReactNode, useState } from 'react';
import { removeServicePointImageRequest } from '../../../../app/api/servicePointDetails/removeServicePointImageRequest';
import { IImage } from '../../../../app/types/model';
import { BRAND_PREFIX } from '../../../constants/constants';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';

interface ImageSliderLayoutProps {
  images: Array<IImage> | null;
  activeId?: string;
  children: ReactNode;
}

const ImageSliderLayout: FC<ImageSliderLayoutProps> = ({
  images,
  children,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionPrefix = 'image_slider';
  const { openModal } = useModalManager();

  const handleNext = () => {
    if (images) setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    if (images)
      setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleDelete = async () => {
    if (!images) {
      return;
    }

    const image = images[currentIndex];
    openModal('confirmation-modal', <ConfirmationModal name="confirmation-modal" onConfirm={() => removeServicePointImageRequest(image.id)} />);


    // await removeServicePointImageRequest(image.id);
    // window.location.reload();
  };

  if (!images || images.length === 0) return <></>;

  return (
    <div
      className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg h-[550px] flex items-center justify-center`}
    >
      <div className="relative flex justify-center items-center h-fit w-full">
        <button
          onClick={handlePrevious}
          className="absolute left-4 bg-gray-500 opacity-60 text-white w-16 h-16 rounded-full"
        >
          ‹
        </button>
        <div className="text-center w-full h-fit items-center justify-center flex flex-col self-center">
          <div className='items-center justify-center  overflow-scroll'>
            <Image
              src={images[currentIndex].cdnUrl}
              alt={images[currentIndex].fileName}
              className="object-contain rounded-md h-fit"
            />
          </div>
          <Button
            buttonText="Sil"
            type="button"
            className="bg-red-500 w-32 text-white mt-4 p-2 rounded-md"
            id="delete"
            onClick={handleDelete}
          />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 bg-gray-500 opacity-60 text-white w-16 h-16 rounded-full"
        >
          ›
        </button>
      </div>
      {children}
    </div>
  );
};

export default ImageSliderLayout;
