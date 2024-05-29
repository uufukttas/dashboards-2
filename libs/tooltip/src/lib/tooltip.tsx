import { useState } from 'react';
import styles from './tooltip.module.scss';

interface TooltipProps {
  children?: React.ReactNode;
  className?: string;
  text: string;
};

export function Tooltip({ children, className, text }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={`${styles.tooltipContainer} ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={styles.tooltip}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
