import { Button } from 'primereact/button';
import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import { BaseTable } from '../BaseTable/BaseTable';
import { FEEDBACKS_TABLE_COLUMNS } from './Feedbacks.constant';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import ConfirmationModal from '../Modals/ConfirmationModal';
import BaseInput from '../Base/BaseInput';
import { useForm } from 'react-hook-form';

const MarketPlaceSection: React.FC = () => {
    const sectionPrefix: string = `${BRAND_PREFIX}-marketplace`;
    const { openModal } = useModalManager();
    const form = useForm();
    const [feedbacks, setFeedbacks] = React.useState([
        {
            feedbackContent: 'Feedback Content 1',
            feedbackId: 1,
            feedbackHeader: 'Feedback Header 1',
            feedbackOwner: 'Feedback Owner 1',
            isFeedbackReaded: false,
        },
        {
            feedbackContent: 'Feedback Content 2',
            feedbackId: 2,
            feedbackHeader: 'Feedback Header 2',
            feedbackOwner: 'Feedback Owner 2',
            isFeedbackReaded: false,
        },
    ]);

    const actionColumn = (selectedFeedback) => {
        return (
            <div className={`${sectionPrefix}-data-table-actions-button-container flex justify-center items-start`}>
                <BaseInput
                    form={form}
                    id={`isFeedbackReaded-${selectedFeedback.feedbackId}`}
                    label={'Feedback Okundu'}
                    name={`isFeedbackReaded-${selectedFeedback.feedbackId}`}
                    placeholder={'Feedback Başlığı'}
                    type={'checkbox'}
                    checked={selectedFeedback.isFeedbackReaded}
                    onChange={() => {
                        setFeedbacks(feedbacks.map(feedback =>
                            feedback.feedbackId === selectedFeedback.feedbackId
                                ? { ...feedback, isFeedbackReaded: !feedback.isFeedbackReaded }
                                : feedback
                        ));
                    }}
                />
            </div>
        );
    };

    return (
        <BaseTable
            columns={FEEDBACKS_TABLE_COLUMNS.map((column) => {
                if (column.accessor === 'actions') {
                    column.bodyTemplate = actionColumn as any;
                }
                return column;
            })}
            data={feedbacks}
            id={`${BRAND_PREFIX}-marketplace-table`}
            tableHeader={() => <></>}
            rowClassName={(data) => {
                console.log(data);
                return data.isFeedbackReaded ? 'line-through opacity-50' : '';
            }}
        />
    );
};

export default MarketPlaceSection;
