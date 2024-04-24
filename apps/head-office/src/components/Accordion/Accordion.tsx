import React, { useState } from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import './Accordion.css';

interface IAccordionProps {
  accordionIcon?: React.ReactNode;
  accordionTitle: string;
  actionButton?: React.ReactNode;
  children: React.ReactNode;
  contentClassName?: string;
  titleClassName?: string;
};

const Accordion = ({ accordionIcon, accordionTitle, actionButton, children, contentClassName = "", titleClassName }: IAccordionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${BRAND_PREFIX}-accordion-container border my-4 rounded-lg`}>
      <div className={`${BRAND_PREFIX}-accordion-header justify-between`} onClick={toggleAccordion}>
        <div className={`${BRAND_PREFIX}-accordion-left-container flex items-center ${titleClassName}`}>
          <div className={`${BRAND_PREFIX}-accordion-title px-2`}>
            {accordionTitle}
          </div>
          <div className={`${BRAND_PREFIX}-icon-container px-2`}>
            {accordionIcon}
          </div>
        </div>
        <div className={`${BRAND_PREFIX}-accordion-right-container flex items-center justify-center`}>
          <div className={`${BRAND_PREFIX}-action-button-container`}>
            {actionButton}
          </div>
          <div className={`${BRAND_PREFIX}-accordion-arrow ${isOpen ? 'open' : ''}`}></div>
        </div>
      </div>
      <div className={`${BRAND_PREFIX}-accordion-content ${isOpen
        ? 'open'
        : 'close'
        } px-4 md:px-8 bg-white rounded-lg ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
