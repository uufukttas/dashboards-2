import { Button } from '@projects/button';
import React from 'react';
import useModalManager from '../../../hooks/useModalManager';
import { IActionButtonProps } from '../types';

const ActionButton: React.FC<IActionButtonProps> = ({ buttonText, modalName, ModalComponent, stationId }) => {
  const { openModal } = useModalManager();

  return (
    <Button
      buttonText={buttonText}
      className={`${modalName}-button bg-secondary rounded-md mx-4 font-bold text-white p-3`}
      id={`${modalName}-button`}
      type="button"
      onClick={(event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        openModal(modalName, <ModalComponent stationId={stationId} />);
      }}
    />
  );
};

export default ActionButton;
