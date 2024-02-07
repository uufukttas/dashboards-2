import { CloseIcon, InfoIcon } from '@projects/icons'
export interface AlertProps {
  alertText: string;
}

export function Alert({
  alertText
}: AlertProps) {
  return (
    <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800 absolute top-5 right-0" role="alert">
      <InfoIcon />
      <div className="ms-3 text-sm font-medium px-5">
        {alertText}
      </div>
      <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-2" aria-label="Close">
        <span className="sr-only">Dismiss</span>
        <CloseIcon />
      </button>
    </div>
  );
}

export default Alert;
