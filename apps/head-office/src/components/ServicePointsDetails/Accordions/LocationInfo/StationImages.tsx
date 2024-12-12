import React, { FC } from 'react';
import Image from 'next/image';
import StationImagesModal from '../../Modals/StationImagesModal';
import { useGetServicePointImagesQuery } from '../../../../../app/api/services/service-point-details/servicePointDetails.service';
import { BRAND_PREFIX } from '../../../../../src/constants/constants';
import useModalManager from '../../../../../src/hooks/useModalManager';
import type { IStationIdProps, IStationImageResponseProps } from '../../types';

const StationImages: FC<IStationIdProps> = ({ stationId }) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-station-image`;
  const { data: imageList } = useGetServicePointImagesQuery({ params: { stationId } });
  const { openModal } = useModalManager();

  const handleClickImage = (event: React.MouseEvent<HTMLElement>, id: number): void => {
    event.stopPropagation();
    event.preventDefault();

    openModal('stationImageListModal', <StationImagesModal clickedImageId={id} stationId={stationId} />);
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
              onClick={(event) => handleClickImage(event, image.id)}
            >
              <Image
                alt={`service-point-image-${index}`}
                className={`${sectionPrefix}`}
                data-image-id={image.id}
                height={250}
                src={image.cdnUrl}
                width={250}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StationImages;
