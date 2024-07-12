import { useState } from 'react';
import styles from './tooltip.module.scss';

interface TooltipProps {
  children?: React.ReactNode;
  containerClassName?: string;
  text: string;
  textClassName?: string;
};

export function Tooltip({ children, containerClassName, text, textClassName }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={`${styles.tooltipContainer} ${containerClassName}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={`${styles.tooltip} ${textClassName}`}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
