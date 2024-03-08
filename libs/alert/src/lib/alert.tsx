import { CloseIcon, InfoIcon } from '@projects/icons';

export interface IAlertProps {
  alertText: string;
  id: string;
  onClick?: () => void;
};

export function Alert({
  alertText,
  id,
  onClick,
}: IAlertProps) {
  return (
    <div className={`alert-container flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 absolute top-5 right-0 z-50`} id={id} role="alert">
      <InfoIcon />
      <div className={`alert-text-container ms-3 text-sm font-medium px-5`}>
        {alertText}
      </div>
      <button aria-label="Close" className={`alert-action-container ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 hover:cursor-pointer`} type="button" onClick={onClick}>
        <span className="sr-only">Dismiss</span>
        <CloseIcon />
      </button>
    </div>
  );
};

export default Alert;
