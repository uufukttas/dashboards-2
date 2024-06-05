import { FaTrashCan } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { showDialog } from '../../../../../app/redux/features/dialogInformation';
import { toggleComissionListUpdate } from '../../../../../app/redux/features/isComissionListUpdated';
import { BRAND_PREFIX } from '../../../../../src/constants/constants';
import { IComissionProps } from '../../types';

const ComissionItem: React.FC<IComissionProps> = (comissionDetail: IComissionProps) => {
    const sectionPrefix: string = `${BRAND_PREFIX}-comission-details`;
    const dispatch = useDispatch();

    const handleDelete = (): void => {
        dispatch(
            showDialog({
                isVisible: true,
                actionType: 'deleteServicePointComission',
                data: comissionDetail.RID
            })
        );

        dispatch(toggleComissionListUpdate(true));
    };

    return (
        <div className={`${sectionPrefix}-info-item-value text-lg font-normal flex justify-between w-full py-4`} key={comissionDetail.ID}>
            <div className={`${sectionPrefix}-reseller-container flex justify-center md:items-center flex-col md:flex-row w-1/5`}>
                <p className={`${sectionPrefix}-reseller text-lg font-normal`}>{comissionDetail.OwnerTypeName}</p>
            </div>
            <div className={`${sectionPrefix}-charge-unit-reseller-container flex justify-center md:items-center flex-col md:flex-row w-1/5`}>
                <p className={`${sectionPrefix}-charge-unit-reseller text-lg font-normal`}>{comissionDetail.ForInvestor ? 'Evet' : 'Hayir'}</p>
            </div>
            <div className={`${sectionPrefix}-breakpoint-container flex justify-center md:items-center flex-col md:flex-row w-1/5`}>
                <p className={`${sectionPrefix}-breakpoint text-lg font-normal`}>{comissionDetail.TariffSubFractionTypeName}</p>
            </div>
            <div className={`${sectionPrefix}-percent-container flex justify-center md:items-center flex-col md:flex-row w-1/5`}>
                <p className={`${sectionPrefix}-percent text-lg font-normal`}>{comissionDetail.Rate}</p>
            </div>
            <div className={`${sectionPrefix}-percent-container flex justify-center md:items-center flex-col md:flex-row w-1/5`}>
                <Button
                    buttonText={""}
                    className="bg-secondary rounded-md px-4 py-2 mx-4 text-white"
                    dataAttributes={{ 'comission-id': comissionDetail.RID?.toString() }}
                    id={`permission-delete-button`}
                    type={'button'}
                    onClick={handleDelete}
                >
                    <FaTrashCan />
                </Button>
            </div>
        </div>
    );
};

export default ComissionItem;
