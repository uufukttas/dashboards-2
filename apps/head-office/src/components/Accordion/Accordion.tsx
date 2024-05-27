import React, { useState } from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import { IAccordionProps } from './types';
import './Accordion.css';

const Accordion: React.FC<IAccordionProps> = ({
  accordionIcon, accordionTitle, actionButton, backgroundColor="primary", children, contentClassName = "", titleClassName
}: IAccordionProps) => {
  const accordionPrefix: string = `${BRAND_PREFIX}-accordion`;
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${accordionPrefix}-content-container border my-4 rounded-lg`}>
      <div className={`${accordionPrefix}-header justify-between bg-${backgroundColor}`}>
        <div className={`${accordionPrefix}-left-container flex items-center ${titleClassName}`}>
          <div className={`${accordionPrefix}-title px-2`}>
            {accordionTitle}
          </div>
          <div className={`${BRAND_PREFIX}-icon-container px-2`}>
            {accordionIcon}
          </div>
        </div>
        <div className={`${accordionPrefix}-right-container flex items-center justify-center`}>
          <div className={`${BRAND_PREFIX}-action-button-container`}>
            {actionButton}
          </div>
          <div
            className={`${accordionPrefix}-arrow ${isOpen ? 'open' : ''}`}
            onClick={toggleAccordion}>
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
