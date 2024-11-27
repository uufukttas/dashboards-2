import { clearModals, pushModal, removeModalByName } from '../../app/redux/modal/modalSlice';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

const useModalManager = () => {
  const dispatch = useDispatch();

  const openModal = (name: string, component: ReactNode) => {
    dispatch(pushModal({ name, component }));
  };

  const closeModal = (name: string) => {
    dispatch(removeModalByName(name));
  };

  const clearAllModals = () => {
    dispatch(clearModals());
  };

  return { openModal, closeModal, clearAllModals };
};

export default useModalManager;
