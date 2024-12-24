import React, { useCallback, useEffect } from 'react';
import ComissionItem from './ComissionItem';
import ComissionTableHeader from './ComissionTableHeader';
import { BRAND_PREFIX } from '../../../../constants/constants';
import { useGetComissionDetailsMutation } from '../../../../../app/api/services/service-point-details/servicePointDetails.service';
import type { IStationIdProps } from '../../types';
import EventManager from 'apps/head-office/src/managers/Event.manager';

const Comissions: React.FC<IStationIdProps> = ({ stationId }: IStationIdProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-comission-details`;
  const [getComissions, { data: comissions }] = useGetComissionDetailsMutation();

  const getComissionDetails = useCallback(async (): Promise<void> => {
    getComissions({ body: { stationId } });
  }, [comissions]);

  useEffect(() => {
    getComissionDetails();
  }, []);

  useEffect(() => {
    EventManager.subscribe('comission-updated', () => {
      getComissionDetails();
    });

    return () => {
      EventManager.removeAllListeners('comission-updated');
    };
  }, []);

  return (
    <div className={`${sectionPrefix}-container items-center py-4 w-full text-black bg-white p-4 rounded-b-md`}>
      <div className={`${sectionPrefix}-header-container w-full`}>
        <ComissionTableHeader />
      </div>
      <hr className={`${sectionPrefix}-header-line w-full`} />
      <div className={`${sectionPrefix}-content-container w-full`}>
        <div className={`${sectionPrefix}-content w-full flex`}>
          <div className={`${sectionPrefix}-info-container flex flex-col justify-between w-full`}>
            <div
              className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col flex-wrap md:flex-row w-full py-4`}
            >
              {comissions?.map((comissionDetail) => (
                <ComissionItem comissionDetail={comissionDetail} key={comissionDetail.ID} stationId={stationId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comissions;
