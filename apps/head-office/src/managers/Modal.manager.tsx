import { RootState } from 'apps/head-office/app/redux/store';
import { useSelector } from 'react-redux';
import { Modal } from '../../app/redux/modal/modalSlice';
import useModalManager from '../hooks/useModalManager';

const ModalManager = () => {
  const modals = useSelector((state: RootState) => state?.modal?.modals);
  const { closeModal } = useModalManager();

  if (!modals?.length) return null;

  return (
    <div className="absolute flex flex-1 w-full h-full bg-heading z-[1000] bg-opacity-40 transition-all items-center justify-center">
      {modals?.map((modal: Modal) => (
        <>
          <div
            className="absolute flex flex-1 w-full h-full bg-transparent z-[1000]"
            onClick={() => closeModal(modal.name)}
          ></div>
          <div key={modal.name} style={{ zIndex: 1000 }}>
            {modal.component}
          </div>
        </>
      ))}
    </div>
  );
};

export default ModalManager;
