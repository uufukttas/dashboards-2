import { useSelector } from 'react-redux';
import ModalBody from './ModalBody';
import ModalHeader from './MofalHeader';
import { RootState } from '../../../app/redux/store';

interface IModalProps {
  children: React.ReactNode;
  modalId: string;
};

const Modal = ({ children, modalId }: IModalProps) => {
  const updatedServicePointData = useSelector((state: RootState) => state.updatedServicePointData.updatedServicePointData);

  return (
    <div aria-hidden='true' className={`sh-service-point-modal-container flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 bg-[#54565a33] block h-full`} id={modalId} tabIndex={-1} >
      <div className="sh-service-point-modal-wrapper relative p-4 bg-white rounded-lg shadow sm:p-5 relative p-4 w-full max-w-2xl sm:h-auto">
        <ModalHeader modalHeaderTitle={`Hizmet Noktası ${updatedServicePointData.id > 0 ? 'Güncelle' : 'Ekle'}`} />
        <ModalBody>
          {children}
        </ModalBody>
      </div>
    </div>
  );
};

export default Modal;
