import moment from 'moment';
import 'moment/locale/tr';
import { useGetFeedbackByIdQuery } from '../../../app/api/services/feedbacks/feedback.service';
import ModalLayout from '../Modal/Layouts/ModalLayout';

interface IFeedbackDetailModalProps {
  feedbackId: number;
}

const FeedbackDetailModal = ({ feedbackId }: IFeedbackDetailModalProps) => {
  const { data: feedback, isLoading } = useGetFeedbackByIdQuery({ params: { messageId: feedbackId } });

  return (
    <ModalLayout name="feedbackDetailModal" title="Geri Bildirim Detayı" footerVisible className="w-full max-w-2xl">
      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="p-6 space-y-6  w-full">
          {/* User Information Section */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-primary/10 rounded-full p-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">{feedback?.userName || 'İsimsiz Kullanıcı'}</h3>
                <p className="text-sm text-gray-500">{feedback?.email}</p>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Mesaj</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{feedback?.message}</p>
          </div>

          {/* Feedback Types */}
          {feedback?.contactMessageTypeValueAggregates && feedback.contactMessageTypeValueAggregates.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-300 p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Geri Bildirim Türleri</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                  {feedback.contactMessageTypeValueAggregates.map((type) => type.typeValue).join(', ')}
                </span>
              </div>
            </div>
          )}

          {/* Date Information */}
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {feedback?.createDate && moment(feedback.createDate).locale('tr').format('DD MMMM YYYY HH:mm')}
          </div>
        </div>
      )}
    </ModalLayout>
  );
};

export default FeedbackDetailModal;
