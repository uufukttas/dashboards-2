import React from 'react';
import { IFeedback, IFeedbackTypeValue } from '../../../app/api/services/feedbacks/feedback.interface';
import { useGetFeedbackListQuery } from '../../../app/api/services/feedbacks/feedback.service';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import { BaseTable } from '../BaseTable/BaseTable';
import FeedbackDetailModal from './FeedbackDetailModal';
import { FEEDBACKS_TABLE_COLUMNS } from './Feedbacks.constant';

const MarketPlaceSection: React.FC = () => {
  const { data: feedbacks } = useGetFeedbackListQuery({});
  const { openModal } = useModalManager();
  const renderFeedbackType = (rowData: { contactMessageTypeValueAggregates: IFeedbackTypeValue[] }) => {
    return rowData.contactMessageTypeValueAggregates?.map((type) => type.typeValue).join(', ');
  };

  const handleRowClick = ({ rowData }: { rowData: IFeedback }) => {
    openModal('feedbackDetailModal', <FeedbackDetailModal feedbackId={rowData.rid} />);
  };

  return (
    <BaseTable
      data={feedbacks || []}
      columns={FEEDBACKS_TABLE_COLUMNS.map((column) => {
        if (column.accessor === 'contactMessageTypeValueAggregates') {
          column.bodyTemplate = renderFeedbackType;
        }
        return column;
      })}
      id={`${BRAND_PREFIX}-marketplace-table`}
      tableHeader={() => <></>}
      // @ts-ignore
      onRowClick={handleRowClick}
    />
  );
};

export default MarketPlaceSection;
