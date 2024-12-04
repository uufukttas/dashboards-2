import getStationImages from 'apps/head-office/app/api/servicePoints/getStationImages';
import { IImage } from 'apps/head-office/app/types/model';
import { FC, useEffect, useState } from 'react';
import ImageSliderLayout from '../../Modal/Layouts/ImageSliderLayout';
import ModalLayout from '../../Modal/Layouts/ModalLayout';

interface StationImageModalProps {
  stationId: number;
}

const StationImagesModal: FC<StationImageModalProps> = (props) => {
  const { stationId } = props;
  const [images, setImages] = useState<Array<IImage> | null>(null);

  const getImages = async () => {
    const res = await getStationImages(stationId.toString());

    if (res.data) {
      setImages(res.data);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

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
