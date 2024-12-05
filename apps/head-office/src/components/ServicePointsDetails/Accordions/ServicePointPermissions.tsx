import React, { useEffect } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { showDialog } from '../../../../app/redux/features/dialogInformation';
import { RootState } from '../../../../app/redux/store';
import {
  useDeleteServicePointPermissionMutation,
  useGetPermissionRequestMutation,
} from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';

interface IPermissionsProps {
  userId: number;
  userName: string;
  name: string;
  surName: string;
}

const ServicePointPermissions: React.FC<{ stationId: number }> = ({ stationId }) => {
  const sectionPrefix: string = 'service-point-permissions';
  const dispatch = useDispatch();
  const [permissions, setPermissions] = React.useState<IPermissionsProps[]>([]);
  const [servicePointPermissions] = useGetPermissionRequestMutation();
  const { openModal } = useModalManager();
  const [deleteServicePointPermission] = useDeleteServicePointPermissionMutation();
  const getServicePointPermissions = async () => {
    const response = await servicePointPermissions({ body: { stationId } });
    setPermissions(response.data);
  };

  useEffect(() => {
    getServicePointPermissions();
  }, []);

  return (
    permissions.length > 0 &&
    permissions.map((permission: IPermissionsProps, idx: number) => {
      return (
        <div key={idx} className="flex flex-col items-end py-4 text-black bg-white p-4 rounded-b-md">
          <div className="flex w-full">
            <div className={`${sectionPrefix}-content py-4 text-text w-full`}>
              <div className={`${sectionPrefix}-info-container flex justify-between`}>
                <div
                  className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row w-full`}
                >
                  <div className={`${sectionPrefix}-info-item-value text-lg font-normal flex items-center w-3/4`}>
                    <p>
                      <span className="font-bold">{`${idx + 1}`}</span>
                      {`. ${permission.userName}`}
                    </p>
                    <p className="px-20">
                      <span>{`${permission.name}`}</span>
                      <span>{`${permission.surName}`}</span>
                    </p>
                  </div>
                </div>
                <div
                  className={`${sectionPrefix}-info-item flex justify-end md:items-center flex-col md:flex-row w-1/4`}
                >
                  <Button
                    buttonText={''}
                    className="bg-secondary rounded-md px-4 py-2 mx-4 text-white"
                    id={`permission-delete-button`}
                    type={'button'}
                    dataAttributes={{ 'permission-id': permission.userId?.toString() }}
                    onClick={() => {
                      openModal(
                        'deletePermission',
                        <ConfirmationModal
                          name="deletePermission"
                          onConfirm={() => {
                            deleteServicePointPermission({ body: { userId: permission.userId } });
                          }}
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
