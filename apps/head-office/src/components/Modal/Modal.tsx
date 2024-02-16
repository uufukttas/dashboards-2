import { useSelector } from 'react-redux';
import ModalBody from './ModalBody';
import ModalHeader from './MofalHeader';
import { RootState } from '../../../app/redux/store';
import './Modal.css'

interface ModalProps {
  children: React.ReactNode;
  modalId: string;
};

export function Modal({
  children,
  modalId,
}: ModalProps) {
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);

  return (
    <div id={modalId} tabIndex={-1} aria-hidden="true" className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full ${isModalVisible ? 'block' : 'hidden'} bg-[#54565a33]`}>
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 relative p-4 w-full max-w-2xl h-full md:h-auto">
        <ModalHeader modalHeaderTitle={'Hizmet Noktasi Ekle'} />
        <ModalBody>
          {children}
        </ModalBody>
      </div>
    </div>
  );
}

export default Modal;
