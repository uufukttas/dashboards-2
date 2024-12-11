import { FC, useEffect, useState } from 'react';
import ImageSliderLayout from '../../Modal/Layouts/ImageSliderLayout';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import { useGetServicePointImagesQuery } from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { IImageDataProps, IStationIdProps, IStationImagesModalProps } from '../types';

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
