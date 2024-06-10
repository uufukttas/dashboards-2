import React, { useState } from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import type { IAccordionProps } from './types';
import './Accordion.css';

const Accordion: React.FC<IAccordionProps> = ({
  accordionIcon,
  accordionTitle,
  actionButton,
  backgroundColor = "primary",
  children,
  contentClassName = "",
  iconType = 'up-down',
  isAccordionOpen = true,
  titleClassName,
}: IAccordionProps) => {
  const accordionPrefix: string = `${BRAND_PREFIX}-accordion`;
  const [isOpen, setIsOpen] = useState(isAccordionOpen);

  const toggleAccordion = (): void => {
    setIsOpen(!isOpen);
  };

  const renderIcon = (): string => {
    if (iconType === 'plus-minus') {
      return isOpen ? '-' : '+';
    } else {
      return isOpen ? '▲' : '▼';
    }
  };

  return (
    <div className={`${accordionPrefix}-content-container border my-4 rounded-lg`}>
      <div className={`${accordionPrefix}-header justify-between bg-${backgroundColor}`}>
        <div className={`${accordionPrefix}-left-container flex items-center ${titleClassName}`}>
          <div className={`${accordionPrefix}-title`}>
            {accordionTitle}
          </div>
          {
            accordionIcon && (
              <div className={`${BRAND_PREFIX}-icon-container px-2`}>
                {accordionIcon}
              </div>
            )
          }
        </div>
        <div className={`${accordionPrefix}-right-container flex items-center justify-center`}>
          <div className={`${BRAND_PREFIX}-action-button-container`}>
            {actionButton}
          </div>
          <div
            className={`${accordionPrefix}-arrow ${isOpen ? 'open' : ''} text-2xl cursor-pointer text-white px-2`}
            onClick={toggleAccordion}
          >
            {renderIcon()}
          </div>
        </div>
      </div>
      {
        <div className={
          `${accordionPrefix}-content ${isOpen ? 'open' : 'close'} px-4 md:px-8 bg-white rounded-lg ${contentClassName}`
        }
        >
          {children}
        </div>
      }
    </div>
  );
};

export default Accordion;
