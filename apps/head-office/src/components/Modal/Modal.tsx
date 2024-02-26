import ModalBody from './ModalBody';
import ModalHeader from './MofalHeader';
import './Modal.css';

interface IModalProps {
  children: React.ReactNode;
  modalId: string;
};

const Modal = ({ children, modalId }: IModalProps) => {
  return (
    <div aria-hidden='true' className={`service-point-create-modal-wrapper flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full bg-[#54565a33] block`} id={modalId} tabIndex={-1} >
      <div className="service-point-create-modal-container relative p-4 bg-white rounded-lg shadow sm:p-5 relative p-4 w-full max-w-2xl h-full md:h-auto">
        <ModalHeader modalHeaderTitle={'Hizmet Noktasi Ekle'} />
        <ModalBody>
          {children}
        </ModalBody>
      </div>
    </div>
  );
}

export default Modal;
