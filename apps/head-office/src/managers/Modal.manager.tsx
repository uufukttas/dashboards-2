import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import useModalManager from '../hooks/useModalManager';
import { Modal } from '../../app/redux/modal/modalSlice';
import { RootState } from '../../app/redux/store';

const ModalManager = () => {
  const modals = useSelector((state: RootState) => state?.modal?.modals);
  const { closeModal } = useModalManager();

  if (!modals?.length) return null;

  return (
    <div className="absolute flex flex-1 w-full h-full bg-heading z-[1000] bg-opacity-40 transition-all items-center justify-center">
      {modals?.map((modal: Modal, index: number) => (
        <Fragment key={index}>
          <div
            className="absolute flex flex-1 w-full h-full bg-transparent z-[1000]"
            onClick={() => closeModal(modal.name)}
          ></div>
          <div key={modal.name} style={{ zIndex: 1000 }}>
            {modal.component}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default ModalManager;
