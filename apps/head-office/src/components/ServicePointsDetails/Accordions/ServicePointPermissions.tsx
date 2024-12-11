import { Button } from '@projects/button';
import React, { useEffect } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import {
  useDeleteServicePointPermissionMutation,
  useGetPermissionRequestMutation,
} from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import useModalManager from '../../../../src/hooks/useModalManager';
import { IServicePointPermissionProps, IStationIdProps } from '../types';

const ServicePointPermissions: React.FC<IStationIdProps> = ({ stationId }) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-permissions`;
  const [deleteServicePointPermission] = useDeleteServicePointPermissionMutation();
  const [getServicePointPermissions, { data: permissions }] = useGetPermissionRequestMutation();
  const { openModal } = useModalManager();

  const fetchServicePointPermissions = () => getServicePointPermissions({ body: { stationId } });

  useEffect(() => {
    fetchServicePointPermissions();
  }, []);

  return (
    permissions &&
    permissions.length > 0 &&
    permissions.map((permission: IServicePointPermissionProps, index: number) => {
      return (
        <div
          className={`${sectionPrefix}-container flex flex-col items-end py-4 text-black bg-white p-4 rounded-b-md`}
          key={index}
        >
          <div className={`${sectionPrefix}-content-container flex w-full`}>
            <div className={`${sectionPrefix}-content py-4 text-text w-full`}>
              <div className={`${sectionPrefix}-info-container flex justify-between`}>
                <div
                  className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row w-full`}
                >
                  <div className={`${sectionPrefix}-info-item-value text-lg font-normal flex items-center w-3/4`}>
                    <p className={`${sectionPrefix}-info-user-name-container`}>
                      <span className={`${sectionPrefix}-info-item-number font-bold`}>{`${index + 1}`}</span>
                      {`. ${permission.userName}`}
                    </p>
                    <p className={`${sectionPrefix}-info-name-surname-container px-20`}>
                      <span>{`${permission.name}`}</span>
                      <span>{`${permission.surName}`}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={`${sectionPrefix}-info-action-button-container flex justify-end md:items-center flex-col md:flex-row w-1/4`}
                >
                  <Button
                    buttonText={''}
                    className={`${sectionPrefix}-action-button bg-secondary rounded-md px-4 py-2 mx-4 text-white`}
                    id={`permission-delete-button`}
                    type={'button'}
                    onClick={() => {
                      openModal(
                        'deletePermission',
                        <ConfirmationModal
                          name="deletePermission"
                          onConfirm={() => deleteServicePointPermission({ body: { userId: permission.userId } })}
                        />,
                      );
                    }}
                  >
                    <FaTrashCan />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default ServicePointPermissions;
