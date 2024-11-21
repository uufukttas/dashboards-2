import { clearModals, pushModal, removeModalByName } from 'apps/head-office/app/redux/modal/modalSlice';
import { useDispatch } from 'react-redux';

const useModalManager = () => {
  const dispatch = useDispatch();

  const openModal = (name, component) => {
    dispatch(pushModal({ name, component }));
  };

  const closeModal = (name) => {
    dispatch(removeModalByName(name));
  };

  const clearAllModals = () => {
    dispatch(clearModals());
  };

  return { openModal, closeModal, clearAllModals };
};

export default useModalManager;
