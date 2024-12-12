import { FC } from 'react';
import ImageSliderLayout from '../../Modal/Layouts/ImageSliderLayout';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import type { IStationImagesModalProps } from '../types';

const StationImagesModal: FC<IStationImagesModalProps> = ({ clickedImageId, stationId }) => {
  return (
    <ModalLayout
      className={`md:min-h-[350px]`}
      footerVisible={false}
      name="stationImageListModal"
      title={`Istasyon Görselleri`}
    >
      <ImageSliderLayout clickedImageId={clickedImageId} stationId={stationId}>
        <></>
      </ImageSliderLayout>
    </ModalLayout>
  );
};

export default StationImagesModal;
