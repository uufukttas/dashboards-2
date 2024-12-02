import React, { useEffect } from 'react';
import useModalManager from '../../hooks/useModalManager';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutProps } from '../Modal/Layouts/ModalLayout.interface';
import { IConfirmationModalProps } from './types';

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({ name, onConfirm, onCancel }) => {
  const { closeModal } = useModalManager();
  const config: IModalLayoutProps = {
    buttons: [
      {
        key: 'confirm',
        label: 'Evet',
        onClick: onConfirm,
        buttonClassName: 'bg-primary text-white p-2 rounded-md w-32',
      },
    ],
    className: 'w-[400px] h-[200px]',
    contentClassName: 'flex flex-col gap-4 h-[200px]',
    fotterClassName: 'flex justify-end',
    footerVisible: false,
    name,
    title: 'Bu işlemi onaylıyor musunuz?',
    onClose: onCancel,
  };

  const handleCancel = (): void => {
    closeModal(config.name);
    onCancel?.();
  };

  const handleConfirm = (): void => {
    closeModal(config.name);
    onConfirm();
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.stopPropagation();
      event.preventDefault();

      if (event.key === 'Enter') {
        handleConfirm();
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <ModalLayout {...config} className="md:min-h-[200px]">
      <div className="flex flex-1 justify-center items-center flex-col">
        <p>Bu işlemi onaylıyor musunuz?</p>
        <p className="text-gray-500">Bu işlem geri alınamaz.</p>
        <div className="w-full flex items-center justify-center">
          <div className="flex gap-4 mt-12">
            <button onClick={handleConfirm} className="px-12 py-2 bg-error text-white rounded-md hover:bg-primary/90">
              <span>Evet</span>
            </button>
            <button onClick={handleCancel} className="px-12 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              <span className="text-gray-700">Hayır</span>
            </button>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ConfirmationModal;
