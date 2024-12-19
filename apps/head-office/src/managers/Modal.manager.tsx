import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../app/redux/modal/modalSlice';
import { RootState } from '../../app/redux/store';
import useModalManager from '../hooks/useModalManager';

const ModalManager = () => {
  const modals = useSelector((state: RootState) => state?.modal?.modals);
  const { closeModal } = useModalManager();

  if (!modals?.length) return null;

  return (
    <>
      {modals?.map((modal: Modal, index: number) => (
        <Fragment key={index}>
          <div
            className="absolute inset-0 flex items-center justify-center bg-heading bg-opacity-40 transition-all"
            style={{ zIndex: 1000 + (index * 10) }}
          >
            <div
              className="absolute inset-0 bg-transparent"
              onClick={() => closeModal(modal.name)}
            />
            <div style={{ zIndex: 1000 + (index * 10) + 1 }}>
              {modal.component}
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default ModalManager;
