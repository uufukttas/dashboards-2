import React from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { Button } from '@projects/button';
import { showDialog } from '../../../../app/redux/features/dialogInformation';
import { useDispatch } from 'react-redux';

interface IPermissionsProps {
    userId: number;
    userName: string;
};

const ServicePointPermissions = ({ permissions }: { permissions: IPermissionsProps[] }) => {
    const sectionPrefix = 'service-point-permissions';
    const dispatch = useDispatch();

    return (
        permissions.length > 0 && permissions.map((permission: IPermissionsProps, idx: number) => {
            return (
                <div key={idx} className='flex flex-col items-end py-4 text-white'>
                    <div className='flex w-full'>
                        <div className={`${sectionPrefix}-content py-4 text-text w-full`}>
                            <div className={`${sectionPrefix}-info-container flex justify-between`}>
                                <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row w-full`}>
                                    <div className={`${sectionPrefix}-info-item-value text-lg font-normal flex items-center justify-between w-full`}>
                                        <p>
                                            <span className='font-bold'>{`${idx + 1}`}</span>{`. ${permission.userName}`}
                                        </p>
                                    </div>
                                </div>
                                <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row`}>
                                    {/* <Toggle onToggle={() => { }} /> */}
                                    <Button
                                        buttonText={""}
                                        className="bg-secondary rounded-md px-4 py-2 mx-4 text-white"
                                        id={`permission-delete-button`}
                                        type={'button'}
                                        dataAttributes={{ 'permission-id': permission.userId?.toString() }}
                                        onClick={() => {
                                            dispatch(
                                                showDialog({
                                                    isVisible: true,
                                                    actionType: 'deleteServicePointPermission',
                                                    data: permission.userId
                                                })
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
