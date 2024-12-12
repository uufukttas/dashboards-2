import { FC, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import useModalManager from '../../../hooks/useModalManager';
import { cn } from '../../../utils/common.utils';
import type { IModalLayoutProps } from './ModalLayout.interface';

const ModalLayout: FC<IModalLayoutProps> = (props) => {
  const {
    title,
    headerClassName,
    subTitle,
    onClose,
    className,
    fotterClassName,
    contentClassName,
    buttons,
    disableClose = false,
    footerVisible = false,
    id,
  } = props;
  const { closeModal } = useModalManager();

  const containerClasses = twMerge(
    'bg-white w-[95%] md:min-w-[600px] min-h-[300px] max-w-[100%] max-h-[100vh] rounded-md flex flex-col transition-opacity duration-100 shadow-lg',
    className,
  );

  const headerClasses = twMerge(
    'flex justify-between items-center border-b border-b-gray-300 py-2 md:py-4 px-3 md:px-4',
    headerClassName,
  );

  const fotterClasses = twMerge(
    'flex justify-end items-center border-t border-t-gray-300 py-2 md:py-4 px-3 md:px-4',
    fotterClassName,
  );

  const contentClasses = twMerge(
    'p-3 md:p-4 overflow-auto flex',
    'w-full h-full max-w-full md:max-w-[900px] max-h-[70vh] md:max-h-[600px]',
    contentClassName,
  );

  const handleClose = () => {
    if (disableClose) return;

    setTimeout(() => {
      onClose && onClose();
      closeModal(props.name);
    }, 100);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !disableClose) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [disableClose]);

  const defaultButtons = disableClose
    ? []
    : [
        {
          key: 'close',
          label: 'Kapat',
          onClick: handleClose,
          buttonClassName:
            'px-3 md:px-4 py-1.5 md:py-2 bg-gray-200 rounded-md hover:bg-gray-300 mr-2 text-sm md:text-base',
          textClassName: 'text-gray-700',
        },
      ];

  const allButtons = [...defaultButtons, ...(buttons || [])];

  return (
    <div className={containerClasses} id={id}>
      <div className={headerClasses}>
        <h3 className="text-base md:text-lg font-bold text-heading">{title}</h3>
        <div className="flex items-center">
          {subTitle && <p className="text-xs md:text-sm text-gray-500">{subTitle}</p>}
          {!disableClose && (
            <button
              className="p-0 h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-md bg-gray-700"
              onClick={handleClose}
            >
              <i className="pi pi-times text-white w-3 h-3 md:w-4 md:h-4 mt-1" />
            </button>
          )}
        </div>
      </div>
      <div className={contentClasses}>{props.children}</div>
      {footerVisible && (
        <div className={fotterClasses}>
          {allButtons.map((button) => (
            <button
              key={button.key}
              className={cn('text-white bg-primary px-4 py-2 rounded-md', button.buttonClassName)}
              onClick={button.onClick}
            >
              <span className={button.textClassName}>{button.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModalLayout;
