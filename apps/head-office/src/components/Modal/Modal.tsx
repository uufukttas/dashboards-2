import ModalBody from './ModalComponents/ModalBody';
import ModalHeader from './ModalComponents/ModalHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import type { IModalProps } from './types';

const Modal: React.FC<IModalProps> = ({ children, className, modalHeaderTitle, modalId, onClose }: IModalProps) => {
  const modalPrefix = `${BRAND_PREFIX}-modal`;
  return (
    <div
      className={`${modalPrefix}-wrapper flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 justify-center items-center w-full md:inset-0 bg-[#54565a33] block h-full ${className}`}
      id={modalId}
      tabIndex={-1}
    >
      <div className={`${modalPrefix}-container relative p-4 bg-white rounded-lg shadow sm:p-5 relative p-4 w-full max-w-2xl sm:h-auto`}>
        <ModalHeader
          modalHeaderTitle={modalHeaderTitle}
          onClose={onClose} />
        <ModalBody>
          {children}
        </ModalBody>
      </div>
    </div>
  );
};

export default Modal;
