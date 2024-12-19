import { Button } from 'primereact/button';
import { IUserAggrement } from '../../../app/api/services/user-aggrements/userAggrement.interface';
import { useGetAgreementDefinitionListQuery } from '../../../app/api/services/user-aggrements/userAggrement.service';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import { BaseTable } from '../BaseTable/BaseTable';
import { TableRowClickEvent } from '../BaseTable/BaseTableInterface';
import AddUserAggrementModal from './AddUserAggrementModal';
import { UserAggrementsTableColumns } from './constants';
import UserAggrementDetailModal from './UserAggrementDetailModal';

const UserAggrementsSection = () => {
  const { data, isLoading, isError } = useGetAgreementDefinitionListQuery();
  const { openModal } = useModalManager();

  const handleAddUserAggrement = () => openModal('addUserAggrementModal', <AddUserAggrementModal />);

  const handleOpenUserAggrementModal = ({ rowData }: TableRowClickEvent<IUserAggrement>) =>
    openModal('userAggrementDetailModal', <UserAggrementDetailModal agreement={rowData} />);

  const tableHeader = () => {
    return (
      <div>
        <Button
          className={`${BRAND_PREFIX}-table-header-add-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
          icon="pi pi-plus text-white"
          id={`${BRAND_PREFIX}-table-header-add-button`}
          rounded
          type="button"
          onClick={handleAddUserAggrement}
        />
      </div>
    );
  };

  return (
    <div>
      <BaseTable
        columns={UserAggrementsTableColumns}
        // @ts-ignore
        data={data || []}
        tableHeader={tableHeader}
        isLoading={isLoading}
        isError={isError}
        onRowClick={handleOpenUserAggrementModal}
      />
    </div>
  );
};

export default UserAggrementsSection;
