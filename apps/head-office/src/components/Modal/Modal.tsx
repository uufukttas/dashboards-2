import ModalHeader from './MofalHeader';
import ModalBody from './ModalBody';
export interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export function Modal({
  showModal,
  setShowModal
}: ModalProps) {

  return (
    <div id="defaultModal" tabIndex={-1} aria-hidden="true" className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full ${showModal ? 'block' : 'hidden'}`}>
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <ModalHeader modalHeaderTitle={'Add Service Point'} setShowModal={setShowModal} />
          <ModalBody />
        </div>
      </div>
    </div>
  );
}

export default Modal;
