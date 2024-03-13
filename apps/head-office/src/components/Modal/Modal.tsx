import ModalBody from './ModalBody';
import ModalHeader from './MofalHeader';
import { BRAND_PREFIX } from '../../constants/constants';

interface IModalProps {
  children: React.ReactNode;
  className?: string;
  modalHeaderTitle: string;
  modalId: string;
};

const Modal = ({ children, className, modalId, modalHeaderTitle }: IModalProps) => {
  return (
    <div
      className={`${BRAND_PREFIX}-service-point-modal-container flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 justify-center items-center w-full md:inset-0 bg-[#54565a33] block h-full ${className}`}
      id={modalId}
      tabIndex={-1}
    >
      <div className={`${BRAND_PREFIX}-service-point-modal-wrapper relative p-4 bg-white rounded-lg shadow sm:p-5 relative p-4 w-full max-w-2xl sm:h-auto`}>
        <ModalHeader
          modalHeaderTitle={modalHeaderTitle}
        />
        <ModalBody>
          {children}
        </ModalBody>
      </div>
    </div>
  );
};

export default Modal;
