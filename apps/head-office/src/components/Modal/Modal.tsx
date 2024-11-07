import React, { useEffect } from 'react';
import ModalBody from './ModalComponents/ModalBody';
import ModalHeader from './ModalComponents/ModalHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import type { IModalProps } from './types';

const Modal: React.FC<IModalProps> = ({
  children,
  className,
  modalContainerClassName,
  modalHeaderTitle,
  modalId,
  onClose,
}: IModalProps) => {
  const modalPrefix: string = `${BRAND_PREFIX}-modal`;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose && onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className={`${modalPrefix}-wrapper overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-40 justify-center items-center w-full md:inset-0 bg-[#54565a33] block h-full ${className}`}
      id={modalId}
      tabIndex={-1}
      onClick={(e) => {
        // onClose && onClose();
      }}
    >
      <div
        className={`${modalPrefix}-container bg-white rounded-lg shadow relative w-full max-w-2xl sm:h-auto max-h-[650px] overflow-y-scroll ${modalContainerClassName}`}
      >
        <ModalHeader modalHeaderTitle={modalHeaderTitle} onClose={onClose} />
        <ModalBody>{children}</ModalBody>
      </div>
    </div>
  );
};

export default Modal;
