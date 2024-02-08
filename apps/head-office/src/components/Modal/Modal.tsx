import ModalHeader from './MofalHeader';
import ModalBody from './ModalBody';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/redux/store';
import './Modal.css'
export interface ModalProps {}

export function Modal(props: ModalProps) {
  const showModal = useSelector((state: RootState) => state.modalStatusReducer.isOpen);
  return (
    <div id="defaultModal" tabIndex={-1} aria-hidden="true" className={`flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full ${showModal ? 'block' : 'hidden'} bg-[#54565a33]`}>
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <ModalHeader modalHeaderTitle={'Hizmet Noktasi Ekle'} />
          <ModalBody />
        </div>
      </div>
    </div>
  );
}

export default Modal;
