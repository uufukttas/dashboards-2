import React, { Dispatch, SetStateAction } from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { Button } from '@projects/button';
import { FaTrashCan } from 'react-icons/fa6';
import { Toggle } from '@projects/toggle';

interface IPermissionsProps {
    id: number;
    user: string;
};

const ServicePointPermissions = ({ permissions, setPermissions }: {
    permissions: IPermissionsProps[];
    setPermissions: Dispatch<SetStateAction<IPermissionsProps[]>>;
}) => {
    const sectionPrefix = 'service-point-permissions';

    const dummyPermissions: IPermissionsProps[] = [
        {
            id: 1,
            user: '05552583614'
        }, {
            id: 2,
            user: '05552583614'
        }, {
            id: 3,
            user: '05552583614'
        }
    ];

    return (
        dummyPermissions.length > 0 && dummyPermissions.map((permission: IPermissionsProps, idx: number) => {
            return (
                <div key={idx} className='flex flex-col items-end py-4 text-white'>
                    <div className='flex w-full'>
                        <div className={`${sectionPrefix}-content py-4 text-text w-full`}>
                            <div className={`${sectionPrefix}-info-container flex justify-between`}>
                                <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row w-full`}>
                                    <div className={`${sectionPrefix}-info-item-value text-lg font-normal flex items-center justify-between w-full`}>
                                        <p>
                                            <span className='font-bold'>{`${idx + 1}`}</span>{`. ${permission.user}`}
                                        </p>
                                    </div>
                                </div>
                                <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row`}>
                                    <Toggle onToggle={() => { }} />
                                    <Button
                                        buttonText={""}
                                        className="bg-secondary rounded-md px-4 py-2 mx-4 text-white"
                                        id={`permission-delete-button`}
                                        type={'button'}
                                        dataAttributes={{ 'permission-id': idx.toString() }}
                                        onClick={() => { }}
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
