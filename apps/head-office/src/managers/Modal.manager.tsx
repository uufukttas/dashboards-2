import { useSelector } from 'react-redux';
import useModalManager from '../hooks/useModalManager';

const ModalManager = () => {
  const modals = useSelector((state) => state?.modals?.modals);
  const { closeModal } = useModalManager();
  if (!modals?.length) return null;

  return (
    <div className="absolute flex flex-1 w-full h-full bg-heading z-[1000] bg-opacity-40 transition-all items-center justify-center">
      {modals?.map((modal) => (
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
