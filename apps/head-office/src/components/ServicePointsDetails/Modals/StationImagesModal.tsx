import { FC, useEffect, useState } from 'react';
import ImageSliderLayout from '../../Modal/Layouts/ImageSliderLayout';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import { useGetServicePointImagesQuery } from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { IImageDataProps, IStationIdProps } from '../types';

const StationImagesModal: FC<IStationIdProps> = ({ stationId }) => {
  const [images, setImages] = useState<Array<IImageDataProps> | null>(null);
  const { data: imagesData } = useGetServicePointImagesQuery({
    params: {
      stationId: stationId,
    },
  });

  useEffect(() => {
    if (imagesData) {
      setImages(imagesData);
    }
  }, [imagesData]);

  return (
    <ModalLayout
      className={`md:min-h-[350px]`}
      footerVisible={false}
      name="stationImageListModal"
      title={`Istasyon Görselleri`}
    >
      <ImageSliderLayout images={images}>
        <></>
      </ImageSliderLayout>
    </ModalLayout>
  );
};

export default StationImagesModal;
