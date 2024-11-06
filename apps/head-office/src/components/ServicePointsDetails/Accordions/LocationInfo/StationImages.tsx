import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStationImages } from 'apps/head-office/app/redux/features/setVisibleModal';
import { toggleModalVisibility } from 'apps/head-office/app/redux/features/isModalVisible';
import getStationImages from 'apps/head-office/app/api/servicePoints/getStationImages';
import { IImage } from 'apps/head-office/app/types/model';

interface StationImagesProps {
  stationId: string;
}

const StationImages: FC<StationImagesProps> = (props) => {
  const { stationId } = props;
  const [images, setImages] = useState<Array<IImage> | null>(null);

  const _getStationImages = async () => {
    const res = await getStationImages(stationId);

    res.data && setImages(res.data);
  };

  const dispatch = useDispatch();

  const handleClickImage = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(setStationImages(true));
    dispatch(toggleModalVisibility(true));
  };

  useEffect(() => {
    _getStationImages();
  }, []);

  return (
    <div className="flex w-full">
      <div className="flex-row flex gap-4 overflow-scroll justify-between items-center">
        {images?.map((image) => {
          return (
            <div
              className="w-[250px] h-[250px] p-2 bg-gray-100 flex rounded-md items-center justify-center text-center"
              onClick={(e) => handleClickImage(e, image.fileName)}
            >
              <img src={image.cdnUrl} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StationImages;
