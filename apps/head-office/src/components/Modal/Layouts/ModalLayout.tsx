import useModalManager from 'apps/head-office/src/hooks/useModalManager';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface IModalLayoutProps extends PropsWithChildren {
  name: string;
  className?: string;
  title: string;
  headerClassName?: string;
  subTitle?: string;
  onClose?: () => void;
  fotterClassName?: string;
  buttons: [
    {
      key: string;
      label: string;
      onClick: () => void;
      buttonClassName?: string;
      textClassName?: string;
    },
  ];
  contentClassName?: string;
}

const ModalLayout: FC<IModalLayoutProps> = (props) => {
  const { title, headerClassName, subTitle, onClose, className, fotterClassName, contentClassName, buttons } = props;
  const [isVisible, setIsVisible] = useState(false);
  const { closeModal } = useModalManager();

  const containerClasses = twMerge(
    'bg-white min-w-[600px] min-h-[500px] max-w-[90%] max-h-[90%] rounded-md flex flex-col transition-opacity duration-100',
    isVisible ? 'opacity-100' : 'opacity-0',
    className,
  );

  const headerClasses = twMerge(
    'flex justify-between items-center border-b border-b-gray-300 py-4 px-4',
    headerClassName,
  );

  const fotterClasses = twMerge('flex justify-end items-center border-t border-t-gray-300 py-4 px-4', fotterClassName);

  const contentClasses = twMerge(
    'p-4 flex-grow overflow-auto',
    'max-w-[900px] max-h-[600px] w-full h-full',
    contentClassName,
  );

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
      closeModal(props.name);
    }, 100);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        <h3 className="text-lg font-bold text-heading">{title}</h3>
        <div className="flex items-center">
          {subTitle && <p className="text-sm text-gray-500">{subTitle}</p>}
          <button className="p-0 h-8 w-8 items-center justify-center rounded-md bg-gray-700" onClick={handleClose}>
            <i className="pi pi-times text-white w-4 h-4 mt-1" />
          </button>
        </div>
      </div>
      <div className={contentClasses}>{props.children}</div>
      <div className={fotterClasses}>
        {buttons.map((button) => (
          <button key={button.key} className={button.buttonClassName} onClick={button.onClick}>
            <span className={button.textClassName}>{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModalLayout;
