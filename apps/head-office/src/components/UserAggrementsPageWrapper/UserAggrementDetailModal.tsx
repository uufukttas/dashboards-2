import { useLazyGetAgreementDefinitionByIdQuery } from 'apps/head-office/app/api/services/user-aggrements/userAggrement.service';
import moment from 'moment';
import { useEffect } from 'react';
import { IUserAggrement } from '../../../app/api/services/user-aggrements/userAggrement.interface';
import ModalLayout from '../Modal/Layouts/ModalLayout';

interface UserAggrementDetailModalProps {
  agreement: IUserAggrement;
}

const UserAggrementDetailModal = ({ agreement }: UserAggrementDetailModalProps) => {
  const [getAgreementDefinitionById, { data: agreementInfo }] = useLazyGetAgreementDefinitionByIdQuery();

  const formatDate = (dateString: string) => {
    return moment(new Date(dateString)).format('DD/MM/YYYY HH:mm');
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append('id', agreement?.rid.toString());

    getAgreementDefinitionById({ params: formData });
  }, [agreement]);

  return (
    <ModalLayout name="userAggrementDetailModal" title={agreementInfo?.title} footerVisible={true}>
      <div className="flex flex-col gap-6 p-4">
        {/* Header Section */}
        <div className="flex justify-between items-start border-b border-b-gray-200 pb-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">{agreementInfo?.title}</h2>
            <p className="text-gray-600">Type: {agreementInfo?.userAgreementType}</p>
          </div>
          <span className="text-sm text-gray-500">Created: {formatDate(agreementInfo?.createDate)}</span>
        </div>
        {/* Content Section */}
        <div className="space-y-4">
          {agreementInfo?.isTextContent ? (
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-medium mb-2">Agreement Text</h3>
              <div className="prose max-w-none">{agreementInfo?.text}</div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Agreement Document</h3>
              <div className="w-full h-[600px] border border-gray-200 rounded-lg">
                <iframe
                  src={`${agreementInfo?.fileCdnUrl}#toolbar=0`}
                  className="w-full h-full"
                  title="Agreement PDF Document"
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
              <span className="ml-2 font-medium">{agreementInfo?.path}</span>
            </div>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default UserAggrementDetailModal;
