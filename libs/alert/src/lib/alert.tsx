import { Button } from '@projects/button';
import { CloseIcon, InfoIcon } from '@projects/icons';

export interface IAlertProps {
  alertText: string;
  alertType: 'success' | 'error' | 'warning' | 'info';
  id: string;
  onClick?: () => void;
};

export function Alert({
  alertText,
  alertType,
  id,
  onClick,
}: IAlertProps) {

  const alertTypes = {
    success: 'bg-green-50 border-green-300 text-green-800',
    error: 'bg-red-50 border-red-300 text-red-800',
    warning: 'bg-yellow-50 border-yellow-300 text-yellow-800',
    info: 'bg-blue-50 border-blue-300 text-blue-800',
  };

  return (
    <div
      className={`alert-container flex items-center p-4 mb-4 border-t-4 absolute top-5 right-0 z-50 ${alertTypes[alertType]}`}
      id={id}
      role="alert">
      <InfoIcon />
      <div className={`alert-text-container ms-3 text-sm font-medium px-5`}>
        {alertText}
      </div>
      <Button
        className={`alert-action-container ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:cursor-pointer`}
        type='button'
        onClick={onClick}
      >
        <span className="sr-only">Dismiss</span>
        <CloseIcon />
      </Button>
    </div>
  );
};

export default Alert;
