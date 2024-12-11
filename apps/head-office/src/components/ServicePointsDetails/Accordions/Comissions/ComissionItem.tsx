import { Button } from '@projects/button';
import { FaTrashCan } from 'react-icons/fa6';
import InfoColumn from './InfoColumn';
import ConfirmationModal from '../../../Modals/ConfirmationModal';
import { useDeleteComissionMutation } from '../../../../../app/api/services/service-point-details/servicePointDetails.service';
import { BRAND_PREFIX } from '../../../../../src/constants/constants';
import useModalManager from '../../../../../src/hooks/useModalManager';
import { IComissionItemProps } from '../../types';

const ComissionItem: React.FC<IComissionItemProps> = ({ stationId, comissionDetail }: IComissionItemProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-comission-details`;
  const [deleteComission] = useDeleteComissionMutation();
  const { openModal } = useModalManager();

  return (
    <div
      className={`${sectionPrefix}-info-item-value text-lg font-normal flex justify-between w-full py-4`}
      key={comissionDetail?.ID}
    >
      <InfoColumn className={`${sectionPrefix}-reseller-container`}>{comissionDetail?.OwnerTypeName}</InfoColumn>
      <InfoColumn className={`${sectionPrefix}-charge-unit-reseller-container`}>
        {comissionDetail?.ForInvestor ? 'Evet' : 'Hayir'}
      </InfoColumn>
      <InfoColumn className={`${sectionPrefix}-breakpoint-container`}>
        {comissionDetail?.TariffSubFractionTypeName}
      </InfoColumn>
      <InfoColumn className={`${sectionPrefix}-percent-container`}>{comissionDetail?.Rate}</InfoColumn>
      <div
        className={`${sectionPrefix}-action-button-container flex justify-center md:items-center flex-col md:flex-row w-1/5`}
      >
        <Button
          buttonText=""
          className={`${sectionPrefix}-action-button bg-secondary rounded-md px-4 py-2 mx-4 text-white`}
          id="permission-delete-button"
          type="button"
          onClick={() => {
            openModal(
              'deleteComissionModal',
              <ConfirmationModal
                name="deleteComissionModal"
                onConfirm={() => deleteComission({ body: { rid: comissionDetail.RID, stationId, isDelete: 1 } })}
              />,
            );
          }}
        >
          <FaTrashCan />
        </Button>
      </div>
    </div>
  );
};

export default ComissionItem;
