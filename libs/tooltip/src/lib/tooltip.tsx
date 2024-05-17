import { useState } from 'react';
import styles from './tooltip.module.scss';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
};

export function Tooltip({ children, text }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={styles.tooltipContainer}
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
