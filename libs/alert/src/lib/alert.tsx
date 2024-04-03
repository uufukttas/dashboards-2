import { FaCircleInfo } from "react-icons/fa6";

interface IAlertProps {
  alertText: string;
  alertType: 'error' | 'info' | 'success' | 'warning';
  id: string;
};

export function Alert({ alertText, alertType, id }: IAlertProps) {
  const alertTypes = {
    error: 'bg-red-50 border-red-300 text-red-800',
    info: 'bg-blue-50 border-blue-300 text-blue-800',
    success: 'bg-green-50 border-green-300 text-green-800',
    warning: 'bg-yellow-50 border-yellow-300 text-yellow-800',
  };

  return (
    <div
      className={`alert-container flex items-center p-4 mb-4 border-t-4 absolute top-5 right-0 z-50 ${
        alertTypes[alertType]
        }
      `}
      id={id}
    >
      <FaCircleInfo />
      <div className={`alert-text-container ms-3 text-sm font-medium px-5`}>
        <span className={`alert-text`}>
          {alertText}
        </span>
      </div>
    </div>
  );
};

export default Alert;
