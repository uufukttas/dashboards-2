import React, { FC, useEffect, useState } from 'react';
import ImageSliderLayout from '../../Modal/Layouts/ImageSliderLayout';
import getStationImages from 'apps/head-office/app/api/servicePoints/getStationImages';
import { IImage } from 'apps/head-office/app/types/model';

interface StationImageModalProps {
  stationId: string;
}

const StationImagesModal: FC<StationImageModalProps> = (props) => {
  const { stationId } = props;
  const [images, setImages] = useState<Array<IImage> | null>(null);

  const getImages = async () => {
    const res = await getStationImages(stationId);

    if (res.data) {
      setImages(res.data);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <ImageSliderLayout images={images}>
      <></>
    </ImageSliderLayout>
  );
};

export default StationImagesModal;
