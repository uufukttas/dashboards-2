import Image from 'next/image';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useGetServicePointImagesQuery } from '../../../../../app/api/services/service-point-details/servicePointDetails.service';
import { toggleModalVisibility } from '../../../../../app/redux/features/isModalVisible';
import { setStationImages } from '../../../../../app/redux/features/setVisibleModal';
import { BRAND_PREFIX } from '../../../../../src/constants/constants';
import { IStationImageResponseProps, IStationImagesProps } from '../../types';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';
import StationImagesModal from '../../Modals/StationImagesModal';

const StationImages: FC<IStationImagesProps> = ({ stationId }) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-station-image`;
  const { data: imageList } = useGetServicePointImagesQuery({ params: { stationId } });
  const { openModal } = useModalManager();

  const dispatch = useDispatch();

  const handleClickImage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string): void => {
    event.stopPropagation();
    event.preventDefault();

    openModal('stationImageListModal', <StationImagesModal stationId={stationId} />);

    // debugger;
    // dispatch(setStationImages(true));
    // dispatch(toggleModalVisibility(true));
  };

  return (
    <div className={`${sectionPrefix}-list-wrapper flex w-full`}>
      <div
        className={`${sectionPrefix}-list-container flex-row flex gap-4 overflow-scroll justify-between items-center`}
      >
        {imageList?.map((image: IStationImageResponseProps, index: number) => {
          return (
            <div
              className={`${sectionPrefix}-container w-[250px] h-[250px] p-2 bg-gray-100 flex rounded-md items-center justify-center text-center cursor-pointer`}
              key={image.id}
              onClick={(e) => handleClickImage(e, image.fileName)}
            >
              <Image
                alt={`service-point-image-${index}`}
                className={`${sectionPrefix}`}
                height={250}
                src={image.cdnUrl}
                width={'250'}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StationImages;
