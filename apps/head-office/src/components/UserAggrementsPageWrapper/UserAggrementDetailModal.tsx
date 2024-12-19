import moment from 'moment';
import { IUserAggrement } from '../../../app/api/services/user-aggrements/userAggrement.interface';
import {
  useGetAgreementDefinitionByIdQuery,
  useSetPassiveStatusMutation,
} from '../../../app/api/services/user-aggrements/userAggrement.service';
import useModalManager from '../../hooks/useModalManager';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutButtonProps } from '../Modal/Layouts/ModalLayout.interface';
import ConfirmationModal from '../Modals/ConfirmationModal';

interface UserAggrementDetailModalProps {
  agreement: IUserAggrement;
}

const UserAggrementDetailModal = ({ agreement }: UserAggrementDetailModalProps) => {
  const { openModal, closeModal } = useModalManager();
  const { data: agreementInfo } = useGetAgreementDefinitionByIdQuery({
    params: {
      agreementId: agreement.rid,
    },
  });
  const [setPassiveStatus] = useSetPassiveStatusMutation();

  const formatDate = (dateString: string) => {
    return moment(new Date(dateString)).format('DD/MM/YYYY HH:mm');
  };

  const handleConfirmDeactivateAgreement = () => {
    setPassiveStatus({ body: { agreementId: agreement.rid } })
      .unwrap()
      .then(() => {
        closeModal('deactivateAgreementModal');
        closeModal('userAggrementDetailModal');
      });
  };

  const handleDeactivateAgreement = () => {
    openModal(
      'deactivateAgreementModal',
      <ConfirmationModal name="deactivateAgreementModal" onConfirm={handleConfirmDeactivateAgreement} />,
    );
  };

  const buttons: IModalLayoutButtonProps[] = [
    {
      key: 'deactivate-agreement',
      label: 'Sözleşmeyi Pasifleştir',
      onClick: handleDeactivateAgreement,
    },
  ];

  return (
    <ModalLayout
      name="userAggrementDetailModal"
      title={agreementInfo?.title || 'Kullanıcı Sözleşmesi'}
      footerVisible={true}
      className="w-[800px]"
      buttons={buttons}
    >
      <div className="flex flex-1 flex-col gap-6 p-4">
        {/* Header Section */}
        <div className="flex justify-between items-start border-b border-b-gray-200 pb-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">{agreementInfo?.title}</h2>
            <p className="text-gray-600">Type: {agreementInfo?.userAgreementType}</p>
          </div>
          <span className="text-sm text-gray-500">Created: {formatDate(agreementInfo?.createDate || '')}</span>
        </div>
        {/* Content Section */}
        <div className="space-y-4">
          {agreementInfo?.isTextContent ? (
            <div className="bg-white border rounded-lg p-4">
              <div className="prose max-w-none">{agreementInfo?.text}</div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-full h-[70vh] border border-gray-200 rounded-lg">
                <iframe
                  src={`${agreementInfo?.fileCdnUrl}#zoom=90`}
                  className="w-full h-full"
                  title="Agreement PDF Document"
                  style={{ minHeight: '500px' }}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        {/* Additional Details */}
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Agreement ID:</span>
              <span className="ml-2 font-medium">{agreementInfo?.rid}</span>
            </div>
            <div>
              <span className="text-gray-600">Path:</span>
              <a className="ml-2 font-medium">{agreementInfo?.path}</a>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default UserAggrementDetailModal;
