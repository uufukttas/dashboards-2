import React, { useState } from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import { IAccordionProps } from './types';
import './Accordion.css';

const Accordion = ({ accordionIcon, accordionTitle, actionButton, children, contentClassName = "", titleClassName }: IAccordionProps) => {
  const accordionPrefix = 'accordion';
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${BRAND_PREFIX}-${accordionPrefix}-content-container border my-4 rounded-lg`}>
      <div className={`${BRAND_PREFIX}-${accordionPrefix}-header justify-between bg-primary`}>
        <div className={`${BRAND_PREFIX}-${accordionPrefix}-left-container flex items-center ${titleClassName}`}>
          <div className={`${BRAND_PREFIX}-${accordionPrefix}-title px-2`}>
            {accordionTitle}
          </div>
          <div className={`${BRAND_PREFIX}-icon-container px-2`}>
            {accordionIcon}
          </div>
        </div>
        <div className={`${BRAND_PREFIX}-${accordionPrefix}-right-container flex items-center justify-center`}>
          <div className={`${BRAND_PREFIX}-action-button-container`}>
            {actionButton}
          </div>
          <div
            className={`${BRAND_PREFIX}-${accordionPrefix}-arrow ${isOpen ? 'open' : ''}`}
            onClick={toggleAccordion}>
          </div>
        </div>
      </div>
      {
        <div className={
          `${BRAND_PREFIX}-${accordionPrefix}-content ${isOpen
            ? 'open'
            : 'close'
          } px-4 md:px-8 bg-white rounded-lg ${contentClassName}`
        }
        >
          {children}
        </div>
      }
    </div>
  );
};

export default Accordion;
